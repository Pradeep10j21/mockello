from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Any, Dict
from datetime import datetime

# --- Shared Models ---
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None

# --- Student Models ---
class StudentBase(BaseModel):
    fullName: Optional[str] = None
    email: EmailStr
    mobileNumber: Optional[str] = None
    
    # Academic
    registerNumber: Optional[str] = None
    collegeName: Optional[str] = None
    degree: Optional[str] = None
    branch: Optional[str] = None
    yearOfPassing: Optional[str] = None
    cgpa: Optional[float] = None
    semWiseCGPA: Optional[str] = None
    
    # Profile
    skills: Optional[str] = None
    internshipExperience: Optional[str] = None
    
    # Contact
    alternateNumber: Optional[str] = None
    alternateEmail: Optional[EmailStr] = None
    
    # Files (storing filenames/metadata)
    resumeFile_name: Optional[str] = None
    internshipFile_name: Optional[str] = None
    
    # Verification
    isVerified: bool = False

class StudentCreate(StudentBase):
    password: str

class StudentUpdate(StudentBase):
    password: Optional[str] = None

class StudentResponse(StudentBase):
    id: str = Field(..., alias="_id")
    
    class Config:
        populate_by_name = True

# --- College Models ---
class CollegeBase(BaseModel):
    collegeName: str
    email: EmailStr
    university: Optional[str] = None
    location: Optional[str] = None
    address: Optional[str] = None
    
    # Officer
    officerName: Optional[str] = None
    officerPhone: Optional[str] = None
    officerEmail: Optional[str] = None # Contact email might specific to officer
    
    # Stats
    courses: Optional[str] = None
    totalStudents: Optional[int] = None
    placementHistory: Optional[str] = None
    
    # Verification
    isVerified: bool = False

class CollegeCreate(CollegeBase):
    password: str

class CollegeResponse(CollegeBase):
    id: str = Field(..., alias="_id")

    class Config:
        populate_by_name = True

# --- Company Models ---
class CompanyBase(BaseModel):
    companyName: str
    email: EmailStr
    
    # Company Info
    industry: Optional[str] = None
    companyType: Optional[str] = None
    gstNumber: Optional[str] = None
    registrationNumber: Optional[str] = None
    yearEstablished: Optional[str] = None
    headquarters: Optional[str] = None
    branchLocations: Optional[str] = None
    website: Optional[str] = None
    linkedIn: Optional[str] = None
    
    # HR Contact
    hrName: Optional[str] = None
    hrDesignation: Optional[str] = None
    hrEmail: Optional[str] = None # Specific HR email
    hrPhone: Optional[str] = None
    
    # Alternate Contact
    altContactName: Optional[str] = None
    altContactEmail: Optional[str] = None
    altContactPhone: Optional[str] = None
    companyAddress: Optional[str] = None
    pincode: Optional[str] = None
    
    # Recruitment
    hiringFrequency: Optional[str] = None
    recruitmentMode: Optional[List[str]] = []
    typicalRoles: Optional[str] = None
    preferredBranches: Optional[List[str]] = []
    minCgpa: Optional[str] = None
    packageRange: Optional[str] = None
    
    # Internship
    internshipOffered: Optional[bool] = False
    internshipStipend: Optional[str] = None
    internshipDuration: Optional[str] = None
    internshipType: Optional[str] = None
    internshipConversion: Optional[str] = None
    internshipRoles: Optional[str] = None
    
    # About
    description: Optional[str] = None
    employeeCount: Optional[str] = None
    workCulture: Optional[str] = None
    benefits: Optional[str] = None
    certificateFileNames: Optional[List[str]] = []
    
    # Verification
    isVerified: bool = False

class CompanyCreate(CompanyBase):
    password: str

class CompanyResponse(CompanyBase):
    id: str = Field(..., alias="_id")

    class Config:
        populate_by_name = True

# --- Admin Models ---
class AdminBase(BaseModel):
    email: EmailStr

class AdminCreate(AdminBase):
    password: str

class AdminResponse(AdminBase):
    id: str = Field(..., alias="_id")
    
    class Config:
        populate_by_name = True

# --- [NEW] Specialized Result Models ---

# 1. Mock Placement Result
class MockPlacementResult(BaseModel):
    student_email: str
    student_name: str
    overall_score: float # e.g. Average of all rounds
    created_at: datetime = Field(default_factory=datetime.utcnow)
    details: Dict[str, Any] = {} # Flexible for overall report

# 2. Aptitude Result
class AptitudeResult(BaseModel):
    student_email: str
    score: float # 0-100 or actual score
    total_questions: int
    correct_answers: int
    category_breakdown: Dict[str, Any] = {} # e.g. {"Logical": 80, "Verbal": 90}
    created_at: datetime = Field(default_factory=datetime.utcnow)

# 3. GD Result
class GDResult(BaseModel):
    student_email: str # Or peerId if anon, but email strictly preferred for history
    session_id: str
    scores: Dict[str, float] # Participation, Creativity, etc.
    feedback: str
    strengths: List[str]
    improvements: List[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)

# 4. Technical Interview Result
class TechnicalInterviewResult(BaseModel):
    student_email: str
    company_name: str
    role: str
    scores: Dict[str, float] # Technical, Problem Solving, etc.
    feedback: str
    transcript_summary: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

# 5. AI Interview Result (General/Behavioral)
class AIInterviewResult(BaseModel):
    student_email: str
    interview_type: str # 'behavioral', 'hr', etc.
    scores: Dict[str, float]
    feedback: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

# --- Interview Result Models (Legacy/Company Side) ---
class InterviewResultBase(BaseModel):
    company_email: EmailStr
    candidate_id: str  # Can be email or name for MVP
    notes: Optional[str] = None
    decision: str  # Strong Hire, Hire, Hold, Reject
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class InterviewResultCreate(InterviewResultBase):
    pass

class InterviewResultResponse(InterviewResultBase):
    id: str = Field(..., alias="_id")

    class Config:
        populate_by_name = True

# --- Unified Score Models (Legacy/Optional - keep for backward compat if needed) ---
class ScoreBase(BaseModel):
    student_name: str
    student_email: str
    round_type: str # 'mock_placement', 'tech_prep', 'technical_interview', 'gd_round', 'ai_interview'
    overall_score: float # Normalized 0-100
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Optional metadata
    department: Optional[str] = None
    domain: Optional[str] = None
    
    # Detailed Data (Flexible Dict for specific round details)
    details: dict = {} 

class ScoreCreate(ScoreBase):
    pass

class ScoreResponse(ScoreBase):
    id: str = Field(..., alias="_id")
    
    class Config:
        populate_by_name = True
