from fastapi import APIRouter, HTTPException, status
from backend.database import get_database
from backend.models import CollegeCreate, CollegeResponse, UserLogin, Token
from backend.auth import get_password_hash, verify_password, create_access_token

router = APIRouter(prefix="/college", tags=["College"])

@router.post("/register", response_model=Token)
def register_college(college: CollegeCreate):
    db = get_database()
    
    if db.colleges.find_one({"email": college.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    college_dict = college.dict()
    college_dict["password_hash"] = get_password_hash(college.password)
    college_dict["isVerified"] = False  # Require admin verification
    del college_dict["password"]
    
    result = db.colleges.insert_one(college_dict)
    
    # Return token with isVerified flag
    access_token = create_access_token(data={"sub": college.email, "role": "college", "isVerified": False})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
def login_college(login_data: UserLogin):
    db = get_database()
    college = db.colleges.find_one({"email": login_data.email})
    
    # DEBUG BYPASS
    if (login_data.email in ["abc@gmail.com", "college@gmail.com"]) and (login_data.password == "1234"):
        if not college:
             college = {"email": login_data.email, "role": "college", "isVerified": False}
        
        # Check explicit verification status if it exists
        is_verified = college.get("isVerified", False)
        
        access_token = create_access_token(data={"sub": college["email"], "role": "college", "isVerified": is_verified})
        return {"access_token": access_token, "token_type": "bearer"}

    if not college or not verify_password(login_data.password, college["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Check verification status
    if not college.get("isVerified", False):
         raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account pending approval. Please wait for Super Admin verification.",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    access_token = create_access_token(data={"sub": college["email"], "role": "college", "isVerified": True})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/onboarding")
def complete_college_onboarding(college_data: dict):
    # Accept any college data fields for onboarding (no password required)
    db = get_database()
    
    email = college_data.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email is required in onboarding payload")
    
    # Remove password if accidentally sent
    college_data.pop("password", None)
    college_data.pop("password_hash", None)
    
    # Update college with onboarding data - keep isVerified=False
    update_data = {**college_data, "isVerified": False}
    
    result = db.colleges.update_one(
        {"email": email},
        {"$set": update_data},
        upsert=True
    )
    
    return {"message": "Onboarding completed successfully. Please wait for admin approval."}

@router.get("/me/{email}")
def get_college_profile(email: str):
    db = get_database()
    college = db.colleges.find_one({"email": email})
    if not college:
        # Return a dummy profile instead of 404 for debug/MVP
        return {
            "collegeName": "College Not Found",
            "email": email,
            "isVerified": True
        }
        
    college["_id"] = str(college["_id"])
    return college

@router.get("/debug-pending")
def debug_pending_students():
    db = get_database()
    students = list(db.students.find({"isVerified": False}))
    for s in students:
        s["_id"] = str(s["_id"])
    return {
        "count": len(students),
        "students": students,
        "all_students_count": db.students.count_documents({})
    }

@router.get("/pending-students/{college_email}", response_model=list[dict])
def get_pending_students(college_email: str):
    db = get_database()
    
    # 1. Get the college profile (Optional verification that caller is a college)
    # 1. Get the college profile (Optional verification that caller is a college)
    # For MVP/Debug, we allow even if not explicitly in DB (e.g. abc@gmail.com)
    college = db.colleges.find_one({"email": college_email})
    # if not college:
    #     raise HTTPException(status_code=404, detail="College not found")
    
    # 2. Find ALL students with isVerified=False, ignoring college name for MVP
    students_cursor = db.students.find({
        "isVerified": False
    })
    
    students = []
    for s in students_cursor:
        s["_id"] = str(s["_id"])
        # Return relevant fields for verification
        students.append({
            "id": s["_id"],
            "fullName": s.get("fullName"),
            "email": s.get("email"),
            "registerNumber": s.get("registerNumber"),
            "degree": s.get("degree"),
            "branch": s.get("branch"),
            "cgpa": s.get("cgpa"),
            "skills": s.get("skills"),
            "mobileNumber": s.get("mobileNumber"),
            "internshipExperience": s.get("internshipExperience"),
            "isVerified": s.get("isVerified")
        })
        
    return students

@router.post("/verify-student/{student_email}")
def verify_student(student_email: str):
    db = get_database()
    result = db.students.update_one(
        {"email": student_email},
        {"$set": {"isVerified": True}}
    )
    
    if result.matched_count == 0:
         raise HTTPException(status_code=404, detail="Student not found")
         
    return {"message": f"Student {student_email} has been verified."}
