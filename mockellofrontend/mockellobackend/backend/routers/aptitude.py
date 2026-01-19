from fastapi import APIRouter, HTTPException
from backend.database import get_database
from typing import List, Dict, Any

router = APIRouter(prefix="/aptitude", tags=["Aptitude"])

@router.get("/test", response_model=List[Dict[str, Any]])
def get_aptitude_test():
    db = get_database()
    collection = db["aptitude_questions"]
    
    # Get 30 random questions
    pipeline = [{"$sample": {"size": 30}}]
    questions = list(collection.aggregate(pipeline))
    
    if not questions:
        raise HTTPException(status_code=404, detail="No questions found")
        
    for q in questions:
        q["_id"] = str(q["_id"])
        
    return questions
