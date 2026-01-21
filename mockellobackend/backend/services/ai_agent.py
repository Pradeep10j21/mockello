import os
from groq import Groq
from backend.config import settings
from backend.database import db
from backend.gd_schemas import TranscriptEntry, ParticipantRole
import logging
from datetime import datetime
import time
import random

logger = logging.getLogger(__name__)

# Initialize Groq client pool
clients = []
if settings.AI_API_KEYS:
    keys = [k.strip() for k in settings.AI_API_KEYS.split(",") if k.strip()]
    print(f"DEBUG: Found {len(keys)} keys in settings.")
    for key in keys:
        try:
            clients.append(Groq(api_key=key))
        except Exception as e:
            logger.error(f"Failed to init Groq client key: {e}")
else:
    print("DEBUG: settings.AI_API_KEYS is Empty/None!")

print(f"Initialized {len(clients)} Groq clients.")

# Global lock set to prevent concurrent processing/race conditions
processing_locks = set()

def process_ai_turn(roomId: str, is_silence_breaker: bool = False):
    """
    Reads the next line from the pre-generated script and assigns it to a suitable bot.
    NO API CALLS during conversation - just reads pre-generated script.
    """
    if roomId in processing_locks:
        return

    processing_locks.add(roomId)
    
    try:
        database = db.get_db()

        # 1. Get Room Data (Script & Index)
        room = database["rooms"].find_one({"roomId": roomId})
        if not room or "script" not in room or not room["script"]:
            return

        script = room["script"]
        index = room.get("current_script_index", 0)

        if index >= len(script):
            print(f"Script finished for room {roomId}.")
            return

        # Natural pause before Bot speaks (Increased to 7s for better flow)
        time.sleep(7)

        # Re-check updated index & barge-in during sleep
        room_after = database["rooms"].find_one({"roomId": roomId})
        index_after = room_after.get("current_script_index", 0)
        is_user_talking = room_after.get("isUserTalking", False)
        
        if index != index_after or is_user_talking:
            if is_user_talking:
                print(f"DEBUG: AI Turn aborted due to User Barge-in in room {roomId}")
            return

        # 2. Get Next Line
        next_turn = script[index]
        sentiment = next_turn.get("sentiment", "Neutral")
        text = next_turn.get("text", "...")

        # 3. Select a Bot based on Sentiment (optional) or Random
        ai_participants = list(database["participants"].find({
            "roomId": roomId,
            "role": ParticipantRole.AI
        }))
        
        if not ai_participants:
            print("No AI participants found in room.")
            return
             
        # Pick one randomly
        selected_ai = random.choice(ai_participants)
        
        # 4. Speak (Store Transcript)
        ai_entry = TranscriptEntry(
            sessionId=room["sessionId"],
            roomId=roomId,
            speakerId=selected_ai["peerId"], 
            text=text,
            timestamp=datetime.utcnow(),
        )
        
        database["transcripts"].insert_one(ai_entry.model_dump())
        logger.info(f"AI Response in {roomId}: {text}")
        print(f"AI Response Generated: {text}")
        
        # 5. Advance Script Index
        database["rooms"].update_one(
            {"roomId": roomId},
            {"$inc": {"current_script_index": 1}}
        )

    finally:
        processing_locks.discard(roomId)
