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
    # Ensure created_at is set
    if "created_at" not in score_dict:
        score_dict["created_at"] = datetime.datetime.utcnow()
        
    # --- ROUTING LOGIC ---
    round_type = score_dict.get("round_type", "").lower()
    
    collection_name = "student_scores" # Default fallback
    
    if round_type == 'technical_interview':
        collection_name = "technical_interview_results"
    elif round_type == 'mock_placement':
        collection_name = "mock_placement_results"
    elif round_type == 'tech_prep':
        collection_name = "tech_prep_results"
    elif round_type in ['aptitude', 'tech_aptitude']:
         collection_name = "aptitude_results"
    elif round_type == 'ai_interview':
         collection_name = "ai_interview_results"
    elif round_type == 'gd':
         collection_name = "gd_results"
         
    # Insert into specific collection
    result = db[collection_name].insert_one(score_dict)
    
    # Optional: Still save to unified 'student_scores' for aggregate analytics?
    # User requested separate tables. Let's stick to separate to avoid duplication unless requested.
    # But for 'get_student_scores', we might need to aggregate them back. 
    # For now, just saving to specific.
    
    created_score = db[collection_name].find_one({"_id": result.inserted_id})
    created_score["_id"] = str(created_score["_id"])
    
    return created_score

@router.get("/student/{email}")
async def get_student_scores(email: str):
    db = get_database()
    
    collections = [
        "student_scores", 
        "mock_placement_results", 
        "tech_prep_results",
        "aptitude_results", 
        "gd_results", 
        "technical_interview_results", 
        "ai_interview_results"
    ]
    
    all_scores = []
    
    for col_name in collections:
        results = list(db[col_name].find({"student_email": email}))
        for res in results:
            res["_id"] = str(res["_id"])
            # Ensure unified structure if possible, or frontend handles diversity
            if "round_type" not in res:
                # Infer round_type from collection if missing
                if col_name == "gd_results": res["round_type"] = "gd"
                elif col_name == "technical_interview_results": res["round_type"] = "technical_interview"
                elif col_name == "tech_prep_results": res["round_type"] = "tech_prep"
                elif col_name == "aptitude_results": res["round_type"] = "aptitude"
                elif col_name == "mock_placement_results": res["round_type"] = "mock_placement"
                elif col_name == "ai_interview_results": res["round_type"] = "ai_interview"
            
            all_scores.append(res)
            
    # Sort by created_at desc
    all_scores.sort(key=lambda x: x.get("created_at", datetime.datetime.min), reverse=True)
        
    return all_scores
