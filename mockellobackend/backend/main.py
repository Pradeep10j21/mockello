from fastapi import FastAPI
# Load environment variables from backend/.env when present
from dotenv import load_dotenv
import os

# Prefer loading a local backend/.env for development (do NOT commit real keys)
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))
from fastapi.middleware.cors import CORSMiddleware

from contextlib import asynccontextmanager
from backend.routers import student, college, company, admin

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("[Backend] Starting up...")
    try:
        from backend.database import get_database
        db = get_database()
        db.client.admin.command('ping')
        print("[Backend] MongoDB connection successful!")
    except Exception as e:
        print(f"[Backend] MongoDB connection failed: {e}")
    yield
    # Shutdown
    print("[Backend] Shutting down...")

app = FastAPI(title="Mockello MVP Backend", lifespan=lifespan)

# CORS Middleware
origins = [
    "http://localhost:5173", # Vite default
    "http://localhost:3000", # React default
    "http://localhost:8080",
    "http://localhost:8081",
    "http://localhost:8082",
    "https://mock-brown-one.vercel.app",
    "*" # Allow all for MVP
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(student.router)
app.include_router(college.router)
app.include_router(company.router)
app.include_router(admin.router)
from backend.routers import aptitude
app.include_router(aptitude.router)

from backend.routers import ai_interviewer
app.include_router(ai_interviewer.router)

from backend.routers import techprep
app.include_router(techprep.router)

from backend.routers import interview_room
app.include_router(interview_room.router)

from backend.routers import scores
app.include_router(scores.router)

from backend.routers import technical_interview
app.include_router(technical_interview.router)

from backend.routers import gd_session
app.include_router(gd_session.router)

from backend.routers import gd_transcript
app.include_router(gd_transcript.router)

from backend.routers import gd_evaluation
app.include_router(gd_evaluation.router)

@app.get("/")
def root():
    return {
        "status": "Backend running",
        "service": "mockello-api"
    }

@app.get("/healthz")
def health_check():
    return {"status": "ok"}

@app.get("/fix-login")
def fix_login():
    from backend.database import get_database
    from backend.auth import get_password_hash
    try:
        db = get_database()
        # Force ping
        db.client.admin.command('ping')
        
        email = "abc@gmail.com"
        pwd = "1234"
        hashed = get_password_hash(pwd)
        
        # Reset Student
        db.students.update_one(
            {"email": email}, 
            {"$set": {"password_hash": hashed, "fullName": "Test Student", "role": "student"}}, 
            upsert=True
        )
        
        # Reset College
        db.colleges.update_one(
            {"email": email}, 
            {"$set": {"password_hash": hashed, "collegeName": "Test College", "role": "college"}}, 
            upsert=True
        )
        
        # Reset Company
        db.companies.update_one(
            {"email": email}, 
            {"$set": {"password_hash": hashed, "companyName": "Test Company", "role": "company"}}, 
            upsert=True
        )
        
        # Reset Admin
        db.admins.update_one(
            {"email": email}, 
            {"$set": {"password_hash": hashed, "role": "admin"}}, 
            upsert=True
        )
        
        return {
            "status": "success", 
            "message": "User abc@gmail.com reset to password '1234' for ALL roles.",
            "db_connection": "OK"
        }
    except Exception as e:
        return {"status": "error", "detail": str(e)}

@app.get("/fix-company")
def fix_company():
    from backend.database import get_database
    from backend.auth import get_password_hash
    try:
        db = get_database()
        hashed = get_password_hash("1234")
        
        # Explicitly fix Company
        result = db.companies.update_one(
            {"email": "abc@gmail.com"}, 
            {"$set": {"password_hash": hashed, "companyName": "Debug Company", "role": "company"}}, 
            upsert=True
        )
        
        return {
            "status": "success", 
            "message": "Company abc@gmail.com reset to password '1234'",
            "matched": result.matched_count,
            "modified": result.modified_count,
            "upserted": result.upserted_id is not None
        }
    except Exception as e:
        return {"status": "error", "detail": str(e)}
