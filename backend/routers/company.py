from fastapi import APIRouter, HTTPException, status
from backend.database import get_database
from backend.models import CompanyCreate, CompanyResponse, UserLogin, Token
from backend.auth import get_password_hash, verify_password, create_access_token

router = APIRouter(prefix="/company", tags=["Company"])

@router.post("/register", response_model=Token)
def register_company(company: CompanyCreate):
    db = get_database()
    
    if db.companies.find_one({"email": company.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    company_dict = company.dict()
    company_dict["password_hash"] = get_password_hash(company.password)
    company_dict["isVerified"] = False  # Require admin verification
    del company_dict["password"]
    
    result = db.companies.insert_one(company_dict)
    
    access_token = create_access_token(data={"sub": company.email, "role": "company", "isVerified": False})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
def login_company(login_data: UserLogin):
    db = get_database()
    company = db.companies.find_one({"email": login_data.email})
    
    # DEBUG BYPASS: Allow specific emails with password "1234"
    if (login_data.email in ["abc@gmail.com", "company@gmail.com"]) and (login_data.password == "1234"):
        # Ensure we have a company object to generate token data from, even if DB find failed
        if not company:
             company = {"email": login_data.email, "role": "company", "isVerified": False}
        
        is_verified = company.get("isVerified", False)
        
        access_token = create_access_token(data={"sub": company["email"], "role": "company", "isVerified": is_verified})
        return {"access_token": access_token, "token_type": "bearer"}

    if not company or not verify_password(login_data.password, company["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Check verification status
    if not company.get("isVerified", False):
         raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account pending approval. Please wait for Super Admin verification.",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    access_token = create_access_token(data={"sub": company["email"], "role": "company", "isVerified": True})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/onboarding")
def complete_company_onboarding(company_data: dict):
    db = get_database()
    
    email = company_data.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")
        
    # Ensure isVerified stays False for all onboarding
    update_data = {**company_data, "isVerified": False}
    
    # Remove potentially sensitive fields if they exist
    update_data.pop("password", None)
    update_data.pop("password_hash", None)
    
    result = db.companies.update_one(
        {"email": email},
        {"$set": update_data},
        upsert=True
    )
        
    return {"message": "Onboarding completed successfully. Please wait for admin approval."}

@router.get("/me/{email}", response_model=CompanyResponse)
def get_company_profile(email: str):
    db = get_database()
    company = db.companies.find_one({"email": email})
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
        
    company["_id"] = str(company["_id"])
    return company

# --- Interview Result Endpoints ---
from backend.models import InterviewResultCreate, InterviewResultResponse

@router.post("/interview-result", response_model=dict)
def save_interview_result(result: InterviewResultCreate):
    db = get_database()
    result_dict = result.dict()
    
    # Insert into database
    db_result = db.interview_results.insert_one(result_dict)
    
    return {"message": "Interview result saved successfully", "id": str(db_result.inserted_id)}

@router.get("/interview-results/{email}", response_model=list[InterviewResultResponse])
def get_company_interview_results(email: str):
    db = get_database()
    results = list(db.interview_results.find({"company_email": email}).sort("timestamp", -1))
    
    for r in results:
        r["_id"] = str(r["_id"])
        
    return results
