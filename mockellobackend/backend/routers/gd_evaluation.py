from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Optional, List, Dict
import os
from backend.database import get_database
from datetime import datetime
from groq import Groq
import json
from backend.models import GDResult

# Provided API Key for Evaluation
EVAL_API_KEY = os.getenv("GROQ_API_KEY")

router = APIRouter(prefix="/gd-evaluation", tags=["GDEvaluation"])

class EvaluationRequest(BaseModel):
    sessionId: str
    roomId: str
    peerId: str

class EvaluationResponse(BaseModel):
    scores: Dict[str, float] # Participation, Uniqueness, Creativity, etc.
    feedback: str
    strengths: List[str]
    improvements: List[str]

@router.post("/evaluate", response_model=EvaluationResponse)
async def evaluate_participant(req: EvaluationRequest):
    database = get_database()
    
    # 1. Fetch Transcripts
    transcripts = list(database["transcripts"].find({
        "sessionId": req.sessionId,
        "roomId": req.roomId
    }).sort("timestamp", 1))
    
    if not transcripts:
        raise HTTPException(status_code=404, detail="No transcripts found for this session.")

    # 2. Format Conversation
    conversation_text = ""
    participant_speech = []
    
    for t in transcripts:
        speaker = t["speakerId"]
        text = t["text"]
        
        prefix = "Student"
        if speaker == req.peerId:
            prefix = "TARGET_STUDENT"
            participant_speech.append(text)
        elif speaker.startswith("ai-"):
            prefix = "AI_Participant"
        
        conversation_text += f"{prefix}: {text}\n"

    if not participant_speech:
         # Fallback if student didn't speak
         return EvaluationResponse(
             scores={"Participation": 0, "Creativity": 0, "Communication": 0, "Leadership": 0},
             feedback="You did not speak during the session. Try to jump in next time!",
             strengths=[],
             improvements=["Speak up to be heard!", "Don't be shy."]
         )

    # 3. Call Groq for Evaluation
    client = Groq(api_key=EVAL_API_KEY)
    
    prompt = f"""
    You are an expert GD Evaluator. Evaluate the performance of 'TARGET_STUDENT' in the following Group Discussion.
    
    Categories to Score (0-10):
    1. Participation (Quantity & Relevance)
    2. Uniqueness (Originality of points)
    3. Creativity (New perspectives)
    4. Choice of Words (Vocabulary & articulation)
    5. Leadership (Guiding the flow)
    6. Listening (Acknowledging others - inferred)

    Conversation:
    {conversation_text}
    
    Return pure JSON format:
    {{
        "scores": {{ "Participation": <float>, "Uniqueness": <float>, "Creativity": <float>, "Choice of Words": <float>, "Leadership": <float>, "Listening": <float> }},
        "feedback": "<2-3 sentences summary>",
        "strengths": ["<point 1>", "<point 2>"],
        "improvements": ["<point 1>", "<point 2>"]
    }}
    """
    
    try:
        completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a strict but fair judge. Return only JSON."},
                {"role": "user", "content": prompt}
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.3,
            response_format={"type": "json_object"}
        )
        
        response_content = completion.choices[0].message.content
        result_json = json.loads(response_content)
        
        # 4. Save to Database
        # Try to find student email (assuming peerId match or generic)
        # For now, we store peerId if email not available, but ideally we should pass email to evaluate endpoint
        student_email = "unknown@student.com" 
        # Ideally, frontend should pass email or we lookup participant by peerId
        
        # 4. Save to Database
        db = get_database()

        # Try to find student email (assuming peerId match or generic)
        student_email = "unknown@student.com" 
        
        participant = db["participants"].find_one({"peerId": req.peerId, "sessionId": req.sessionId})
        if participant and "email" in participant:
            student_email = participant["email"]
        
        gd_result_entry = GDResult(
            student_email=student_email,
            session_id=req.sessionId,
            scores=result_json.get("scores", {}),
            feedback=result_json.get("feedback", "Analysis complete."),
            strengths=result_json.get("strengths", []),
            improvements=result_json.get("improvements", [])
        )
        
        db["gd_results"].insert_one(gd_result_entry.model_dump())

        return EvaluationResponse(
            scores=result_json.get("scores", {}),
            feedback=result_json.get("feedback", "Analysis complete."),
            strengths=result_json.get("strengths", []),
            improvements=result_json.get("improvements", [])
        )

    except Exception as e:
        print(f"Evaluation Error: {e}")
        raise HTTPException(status_code=500, detail="AI Evaluation Failed")
