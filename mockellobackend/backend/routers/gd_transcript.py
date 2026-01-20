from fastapi import APIRouter, BackgroundTasks, Query
from backend.gd_schemas import TranscriptEntry
from backend.database import db
from backend.services.ai_agent import process_ai_turn
from datetime import datetime, timezone

router = APIRouter(prefix="/gd-transcript", tags=["GDTranscript"])

@router.post("/add")
def add_transcript(entry: TranscriptEntry, background_tasks: BackgroundTasks):
    database = db.get_db()
    # Store transcript
    database["transcripts"].insert_one(entry.model_dump())
    
    # Trigger AI analysis
    if entry.roomId:
        background_tasks.add_task(process_ai_turn, entry.roomId)
    
    return {"message": "Transcript saved"}

@router.get("/{sessionId}")
def get_transcripts(sessionId: str, roomId: str = Query(None), background_tasks: BackgroundTasks = None):
    database = db.get_db()
    
    query = {"sessionId": sessionId}
    if roomId:
        query["roomId"] = roomId
        
    # Sync pymongo: find() returns a cursor, use list() to iterate
    transcripts = list(database["transcripts"].find(query).sort("timestamp", 1).limit(10000))
    
    result = []
    last_timestamp = None
    
    for t in transcripts:
        t["_id"] = str(t["_id"])
        result.append(t)
        ts = t.get("timestamp")
        if isinstance(ts, str):
            try:
                ts = datetime.fromisoformat(ts.replace('Z', '+00:00'))
            except:
                pass
        
        if isinstance(ts, datetime):
            if ts.tzinfo is None:
                ts = ts.replace(tzinfo=timezone.utc)
            last_timestamp = ts

    # Silence Breaker Logic
    if roomId and last_timestamp:
        now = datetime.now(timezone.utc)
        delta = (now - last_timestamp).total_seconds()
        
        if delta > 5:
            if background_tasks:
                background_tasks.add_task(process_ai_turn, roomId, True)

    return result
