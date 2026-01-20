from backend.services.script_generator import generate_topic_script
import random
import uuid
import time
from datetime import datetime
from backend.constants import GD_TOPICS
from backend.database import db
from backend.gd_schemas import ParticipantRole, ParticipantModel, RoomModel, TranscriptEntry
from .ai_agent import process_ai_turn

def allocate_rooms(sessionId: str):
    """
    Allocates waiting participants into rooms of 5.
    Injects AI participants if needed.
    Generates a unique script for each room.
    """
    database = db.get_db()
    
    try:
        # 1. Fetch all human participants in this session who are NOT yet in a room
        waiting_humans = list(database["participants"].find({
            "sessionId": sessionId,
            "roomId": None,
            "role": ParticipantRole.HUMAN.value
        }))
        
        if not waiting_humans:
            print(f"DEBUG: No waiting participants found for session {sessionId}")
            return {"message": "No waiting participants to allocate"}
        
        print(f"DEBUG: Allocating {len(waiting_humans)} humans in session {sessionId}")

        groups = []
        # Chunk into groups of up to 5
        for i in range(0, len(waiting_humans), 5):
            groups.append(waiting_humans[i:i+5])

        allocated_rooms = []

        for group in groups:
            human_count = len(group)
            ai_needed = 5 - human_count
            
            room_id = str(uuid.uuid4())
            room_participants = []
            
            # Add Humans
            for human in group:
                room_participants.append(human["peerId"])
                # Update human with roomId
                database["participants"].update_one(
                    {"_id": human["_id"]},
                    {"$set": {"roomId": room_id}}
                )
                
            # Add AI
            for _ in range(ai_needed):
                ai_peer_id = f"ai-{uuid.uuid4()}"
                ai_participant = ParticipantModel(
                    participantId=str(uuid.uuid4()),
                    sessionId=sessionId,
                    peerId=ai_peer_id,
                    role=ParticipantRole.AI,
                    name=f"AI Student", 
                    roomId=room_id
                )
                # Insert AI into participants collection
                database["participants"].insert_one(ai_participant.model_dump())
                room_participants.append(ai_peer_id)
                
            # Select Random Topic & Generate Script (sync call)
            topic = random.choice(GD_TOPICS)
            print(f"Generating script for Room {room_id} on topic: {topic}")
            script = generate_topic_script(topic)
            
            # Create Room
            room = RoomModel(
                roomId=room_id,
                sessionId=sessionId,
                participants=room_participants,
                aiCount=ai_needed,
                topic=topic,
                script=script,
                current_script_index=0
            )
            
            database["rooms"].insert_one(room.model_dump())
            allocated_rooms.append(room)
            
            # Trigger Initial Greeting from First AI (if any AI exists)
            if ai_needed > 0:
                first_ai = room_participants[len(group)] # The first AI appended
                
                greeting_text = f"Hello everyone! The topic is {topic}. "
                
                # Insert transcript immediately to show up in chat
                database["transcripts"].insert_one(TranscriptEntry(
                    sessionId=sessionId,
                    roomId=room_id,
                    speakerId=first_ai,
                    text=greeting_text,
                    timestamp=datetime.utcnow()
                ).model_dump())
                
                # Trigger the first script line (sync call in background is tricky)
                # For now, call it directly (blocking briefly is acceptable for this flow)
                process_ai_turn(room_id)

                print(f"Allocated Room {room_id} with {human_count} humans. Topic: {topic}. Script len: {len(script)}")

        return {"message": "Allocation complete", "rooms_created": len(allocated_rooms)}

    except Exception as e:
        print(f"CRITICAL ERROR in allocate_rooms: {e}")
        import traceback
        traceback.print_exc()
        return {"error": str(e)}
