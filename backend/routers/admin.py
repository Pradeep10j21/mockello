from fastapi import APIRouter, HTTPException, status
from backend.database import get_database
from backend.models import AdminCreate, UserLogin, Token
from backend.auth import get_password_hash, verify_password, create_access_token

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.post("/register")
def register_admin(admin: AdminCreate):
    # This should probably be protected or removed in prod
    db = get_database()
    
    if db.admins.find_one({"email": admin.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    admin_dict = admin.dict()
    admin_dict["password_hash"] = get_password_hash(admin.password)
    del admin_dict["password"]
    
    result = db.admins.insert_one(admin_dict)
    return {"message": "Admin created successfully"}

@router.post("/login", response_model=Token)
def login_admin(login_data: UserLogin):
    db = get_database()
    admin = db.admins.find_one({"email": login_data.email})
    
    # DEBUG BYPASS
    if (login_data.email in ["abc@gmail.com", "admin@gmail.com"]) and (login_data.password == "1234"):
        if not admin:
             admin = {"email": login_data.email, "role": "admin"}
        access_token = create_access_token(data={"sub": admin["email"], "role": "admin"})
        return {"access_token": access_token, "token_type": "bearer"}

    if not admin or not verify_password(login_data.password, admin["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    access_token = create_access_token(data={"sub": admin.email, "role": "admin"})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/stats")
def get_stats():
    # Only verify token presence here or just public for now as per MVP
    db = get_database()
    student_count = db.students.count_documents({})
    college_count = db.colleges.count_documents({})
    company_count = db.companies.count_documents({})
    
    return {
        "students": student_count,
        "colleges": college_count,
        "companies": company_count
    }

# --- Verification Management ---

@router.get("/pending-colleges", response_model=list[dict])
def get_pending_colleges():
    db = get_database()
    colleges = list(db.colleges.find({"isVerified": False}))
    results = []
    for c in colleges:
        c["_id"] = str(c["_id"])
        results.append(c)
    return results

@router.get("/pending-companies", response_model=list[dict])
def get_pending_companies():
    db = get_database()
    companies = list(db.companies.find({"isVerified": False}))
    results = []
    for c in companies:
        c["_id"] = str(c["_id"])
        results.append(c)
    return results

@router.post("/verify-college/{email}")
def verify_college(email: str):
    db = get_database()
    result = db.colleges.update_one(
        {"email": email},
        {"$set": {"isVerified": True}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="College not found")
    return {"message": f"College {email} verified successfully"}

@router.post("/verify-company/{email}")
def verify_company(email: str):
    db = get_database()
    result = db.companies.update_one(
        {"email": email},
        {"$set": {"isVerified": True}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Company not found")
    return {"message": f"Company {email} verified successfully"}
