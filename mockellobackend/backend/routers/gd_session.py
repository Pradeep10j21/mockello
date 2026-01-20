from fastapi import APIRouter, HTTPException, BackgroundTasks, Query
from backend.gd_schemas import CreateSessionRequest, SessionModel, JoinSessionRequest, ParticipantModel, ParticipantRole, JoinLobbyRequest
from backend.database import db
from backend.services.allocation import allocate_rooms
from backend.constants import GD_TOPICS
import uuid
import random
from datetime import datetime, timedelta, timezone

router = APIRouter(prefix="/gd-session", tags=["GDSession"])

@router.post("/join-lobby")
def join_lobby(request: JoinLobbyRequest):
    """
    Automatically joins a 'waiting' session that has space (< 5 participants),
    or creates a new one with a 5-minute timer.
    """
    database = db.get_db()
    
    # 1. Find all waiting sessions
    waiting_sessions = list(database["sessions"].find({"status": "waiting"}))
    
    target_session_id = None
    start_time = None
    topic = None
    
    # Iterate to find one with space
    for session in waiting_sessions:
        sid = session["sessionId"]
        count = database["participants"].count_documents({"sessionId": sid})
        if count < 5:
            target_session_id = sid
            start_time = session["startTime"]
            topic = session.get("topic", "Topic will be assigned per room")
            break
    
    if target_session_id:
        # Join existing
        session_id = target_session_id
    else:
        # Create new session
        session_id = str(uuid.uuid4())[:8]
        # Use timezone aware UTC - 5 MINUTES TIMER
        start_time = datetime.now(timezone.utc) + timedelta(minutes=5) 
        topic = random.choice(GD_TOPICS)
        
        new_session = SessionModel(
            sessionId=session_id,
            status="waiting",
            startTime=start_time
        )
        database["sessions"].insert_one(new_session.model_dump())
    
    # 2. Add Participant if not already present
    existing_participant = database["participants"].find_one({
        "sessionId": session_id,
        "participantId": request.participantId
    })
    
    if not existing_participant:
        new_participant = ParticipantModel(
            participantId=request.participantId,
            sessionId=session_id,
            peerId=request.peerId,
            name=request.name,
            role=ParticipantRole.HUMAN
        )
        database["participants"].insert_one(new_participant.model_dump())
        
    return {
        "sessionId": session_id,
        "startTime": start_time,
        "topic": "Topic will be assigned per room",
        "message": "Joined lobby"
    }

@router.get("/status")
def get_session_status(sessionId: str, background_tasks: BackgroundTasks):
    """
    Returns status. Also triggers auto-start if timer expired.
    """
    database = db.get_db()
    session = database["sessions"].find_one({"sessionId": sessionId})
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    now = datetime.now(timezone.utc)
    
    # Handle DB stored time (could be string or datetime, optimistic handling)
    sched_start = session["startTime"]
    if isinstance(sched_start, str):
        try:
            sched_start = datetime.fromisoformat(sched_start.replace('Z', '+00:00'))
        except:
            pass 
    # Ensure sched_start is aware if it was naive (assume UTC)
    if isinstance(sched_start, datetime) and sched_start.tzinfo is None:
        sched_start = sched_start.replace(tzinfo=timezone.utc)

    seconds_remaining = 0
    if session["status"] == "waiting" and sched_start:
        delta = sched_start - now
        seconds_remaining = max(0, int(delta.total_seconds()))
        
        if now >= sched_start:
            # Time to start!
            update_result = database["sessions"].update_one(
                {"sessionId": sessionId, "status": "waiting"},
                {"$set": {"status": "active"}}
            )
            
            if update_result.modified_count > 0:
                background_tasks.add_task(allocate_rooms, sessionId)
                session["status"] = "active"

    return {
        "sessionId": session["sessionId"],
        "status": session["status"],
        "startTime": session["startTime"],
        "secondsRemaining": seconds_remaining,
        "topic": "Topic will be assigned per room"
    }

@router.get("/my-room")
def get_my_room(sessionId: str, participantId: str):
    database = db.get_db()
    participant = database["participants"].find_one({
        "sessionId": sessionId,
        "participantId": participantId
    })
    
    if not participant:
        raise HTTPException(status_code=404, detail="Participant not found")
        
    if not participant.get("roomId"):
        return {"status": "waiting", "message": "Room not allocated yet"}
        
    room = database["rooms"].find_one({"roomId": participant["roomId"]})
    
    return {
        "status": "allocated",
        "roomId": room["roomId"],
        "participants": room["participants"],
        "aiCount": room["aiCount"]
    }
