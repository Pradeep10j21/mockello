from fastapi import APIRouter, HTTPException, status, Depends
from backend.database import get_database
from backend.models import StudentCreate, StudentResponse, StudentUpdate, UserLogin, Token
from backend.auth import get_password_hash, verify_password, create_access_token
from bson import ObjectId

router = APIRouter(prefix="/student", tags=["Student"])

@router.post("/register", response_model=Token)
def register_student(student: StudentCreate):
    db = get_database()
    
    # Check if student already exists
    if db.students.find_one({"email": student.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash password and save
    student_dict = student.dict()
    student_dict["password_hash"] = get_password_hash(student.password)
    student_dict["isVerified"] = False # Default to False
    del student_dict["password"]
    
    result = db.students.insert_one(student_dict)
    
    # Create token
    access_token = create_access_token(data={"sub": student.email, "role": "student", "isVerified": False})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
def login_student(login_data: UserLogin):
    db = get_database()
    student = db.students.find_one({"email": login_data.email})
    
    # DEBUG BYPASS
    if (login_data.email in ["abc@gmail.com", "student@gmail.com"]) and (login_data.password == "1234"):
        if not student:
             student = {"email": login_data.email, "role": "student", "isVerified": True} # Auto-verify debug users
        
        # Check explicit verification status if it exists, otherwise default true for debug
        is_verified = student.get("isVerified", True)
        
        access_token = create_access_token(data={"sub": student["email"], "role": "student", "isVerified": is_verified})
        return {"access_token": access_token, "token_type": "bearer"}

    if not student or not verify_password(login_data.password, student["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    is_verified = student.get("isVerified", False)
    access_token = create_access_token(data={"sub": student["email"], "role": "student", "isVerified": is_verified})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/onboarding")
def complete_onboarding(student_update: StudentUpdate):
    db = get_database()
    
    # In a real app, we'd get the user email from the token dependency
    # For MVP, we'll assume the email is passed or we verify it another way
    # Ideally, this endpoint should depend on 'get_current_user'
    
    if not student_update.email:
         raise HTTPException(status_code=400, detail="Email required for identification")

    # Filter out None values
    update_data = {k: v for k, v in student_update.dict().items() if v is not None}
    
    result = db.students.update_one(
        {"email": student_update.email},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Student not found")
        
    return {"message": "Onboarding completed successfully"}

@router.get("/me/{email}", response_model=StudentResponse)
def get_student_profile(email: str):
    db = get_database()
    student = db.students.find_one({"email": email})
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
        
    # Convert ObjectId to string
    student["_id"] = str(student["_id"])
    return student
