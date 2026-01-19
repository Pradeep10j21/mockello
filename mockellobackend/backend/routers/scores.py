from fastapi import APIRouter, HTTPException, Body
from backend.database import get_database
from backend.models import ScoreCreate, ScoreResponse
import datetime

router = APIRouter(
    prefix="/scores",
    tags=["Scores"]
)

@router.post("/save", response_model=ScoreResponse)
async def save_score(score: ScoreCreate):
    db = get_database()
    
    score_dict = score.dict()
    # Ensure created_at is set if not provided (though default_factory handles it in Pydantic)
    if "created_at" not in score_dict:
        score_dict["created_at"] = datetime.datetime.utcnow()
        
    result = db.student_scores.insert_one(score_dict)
    
    created_score = db.student_scores.find_one({"_id": result.inserted_id})
    created_score["_id"] = str(created_score["_id"])
    
    return created_score

@router.get("/student/{email}")
async def get_student_scores(email: str):
    db = get_database()
    scores = list(db.student_scores.find({"student_email": email}).sort("created_at", -1))
    
    for score in scores:
        score["_id"] = str(score["_id"])
        
    return scores
