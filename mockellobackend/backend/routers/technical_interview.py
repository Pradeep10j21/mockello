from fastapi import APIRouter, HTTPException
import os
import difflib
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(
    prefix="/technical-interview",
    tags=["technical-interview"]
)

# --- Predefined Question Bank with Expected Concepts ---
DOMAIN_QUESTION_BANK = {
  'CSE': {
    'Frontend (React)': [
      { 
        "question": 'Explain the Virtual DOM and how it improves performance.', 
        "expected": "Virtual DOM is a lightweight copy of the real DOM. React updates VDOM first, diffs it with previous VDOM (reconciliation), and strictly updates only changed elements in real DOM, minimizing expensive reflows/repaints." 
      },
      { 
        "question": 'What are React Hooks? Explain useState and useEffect.', 
        "expected": "Hooks allow function components to use state and lifecycle features. useState allows managing local state. useEffect handles side effects like data fetching, subscriptions, duplicating componentDidMount/Update/Unmount." 
      },
      { 
        "question": 'How do you handle state management in a large application?', 
        "expected": "Context API for low-frequency updates, Redux/Zustand for complex global state, React Query for server state. Importance of lifting state up and avoiding prop drilling." 
      },
      { 
        "question": 'Explain the difference between props and state.', 
        "expected": "Props are read-only inputs passed from parent to child. State is mutable data managed within the component itself. Props allow configuration, State allows interactivity." 
      },
      { 
        "question": 'How would you optimize a React app that is rendering slowly?', 
        "expected": "Use React.memo to prevent unnecessary re-renders, useMemo/useCallback to cache expensive calculations/functions, code splitting with React.lazy, windowing for long lists, analyze with Profiler." 
      }
    ],
    'Backend (Node.js)': [
      { "question": 'Explain the Event Loop in Node.js.', "expected": "Single-threaded loop that offloads blocking I/O to system kernel. Phases: Timers, Pending Callbacks, Poll, Check, Close Callbacks. Uses libuv." },
      { "question": 'How would you handle asynchronous operations in Node.js?', "expected": "Callbacks (legacy), Promises (chaining), and Async/Await (modern, cleaner syntax). Handling errors with try/catch." },
      { "question": 'Design a RESTful API for a user management system.', "expected": "Resources: /users. GET /users (list), GET /users/:id (read), POST /users (create), PUT/PATCH /users/:id (update), DELETE /users/:id. Status codes: 200, 201, 400, 404, 500." },
      { "question": 'What is middleware in Express.js?', "expected": "Functions that access request/response objects. Can modify req/res, end cycle, or call next(). Used for logging, auth, parsing." },
      { "question": 'How do you handle database connections in a serverless environment?', "expected": "Reuse connections (connection pooling) outside function handler to avoid cold start latency and exceeding connection limits (e.g., AWS RDS Proxy)." }
    ],
    'Full Stack': [
      { "question": 'Explain how you would architect a full-stack application from scratch.', "expected": "Frontend (React/Next.js), Backend (Node/Python), DB (SQL/NoSQL). API layer (REST/GraphQL). Auth (JWT/OAuth). CI/CD. Hosting." },
      { "question": 'How do you handle CORS issues?', "expected": "Configure backend to send Access-Control-Allow-Origin header. Use proxy in dev. Understanding Preflight OPTIONS requests." },
      { "question": 'Compare SQL vs NoSQL. When would you use which?', "expected": "SQL (Relational, structured, ACID) for complex queries/transactions. NoSQL (Document/Key-Value, flexible, scalable) for unstructured data/high write throughput." },
      { "question": 'How does authentication work between a frontend and backend?', "expected": "Client sends credentials -> Server verifies & issues Token (JWT) -> Client stores token (HttpOnly Cookie/Storage) -> Client sends token in Header for subsequent requests." },
      { "question": 'Explain the concept of microservices.', "expected": "Architectural style structuring an app as collection of loosely coupled services. Each independently deployable, scalable, owning its own DB. Communicate via API/Events." }
    ]
  },
  'IT': {
    'Network Administration': [
      { "question": 'Explain the OSI model layers.', "expected": "Physical, Data Link, Network, Transport, Session, Presentation, Application. mnemonic: Please Do Not Throw Sausage Pizza Away." },
      { "question": 'What is the difference between TCP and UDP?', "expected": "TCP: Connection-oriented, reliable, ordered, slower (e.g., Web, Email). UDP: Connectionless, unreliable, unordered, faster (e.g., VoIP, Gaming)." },
      { "question": 'How do you troubleshoot a network connectivity issue?', "expected": "Check physical layer (cables), check IP config (ipconfig/ifconfig), ping loopback, ping gateway, ping DNS (8.8.8.8), ping name (google.com) to isolate failure point." }
    ]
  }
}

DEFAULT_QUESTIONS = [
  { "question": 'Tell me about yourself and your technical background.', "expected": "Summary of education, relevant experience, key skills, and passion for the field." },
  { "question": 'Describe a challenging technical problem you solved.', "expected": "STAR method: Situation, Task, Action, Result. Focus on problem-solving process and outcome." },
  { "question": 'Where do you see yourself in 5 years?', "expected": "Growth mindset, leadership aspirations, staying technical, contributing to company goals." }
]

class AnswerItem(BaseModel):
    question: str
    answer: str

class EvaluateRequest(BaseModel):
    department: str
    domain: str
    answers: List[AnswerItem]

class EvaluationResult(BaseModel):
    overall_score: int
    skill_breakdown: dict
    strengths: List[str]
    improvements: List[str]
    detailed_feedback: List[dict]

@router.get("/questions")
def get_questions(department: str, domain: str):
    qs = DOMAIN_QUESTION_BANK.get(department, {}).get(domain, DEFAULT_QUESTIONS)
    return [q["question"] for q in qs]

def calculate_similarity(a: str, b: str) -> float:
    return difflib.SequenceMatcher(None, a.lower(), b.lower()).ratio()

def calculate_keyword_match(response: str, expected: str) -> float:
    # Basic keyword extraction: split by space, filter small words
    stop_words = {'the', 'a', 'an', 'and', 'or', 'if', 'is', 'are', 'was', 'were', 'to', 'in', 'on', 'of', 'for', 'with', 'by'}
    
    exp_tokens = set([w.lower() for w in expected.split() if w.lower().isalnum() and w.lower() not in stop_words])
    resp_tokens = set([w.lower() for w in response.split() if w.lower().isalnum() and w.lower() not in stop_words])
    
    if not exp_tokens:
        return 1.0 # No key terms expected
    
    matches = exp_tokens.intersection(resp_tokens)
    return len(matches) / len(exp_tokens)

@router.post("/evaluate", response_model=EvaluationResult)
async def evaluate_technical_interview(request: EvaluateRequest):
    qs_map = {q["question"]: q["expected"] for q in DOMAIN_QUESTION_BANK.get(request.department, {}).get(request.domain, DEFAULT_QUESTIONS)}
    
    total_score = 0
    total_communication = 0
    total_confidence = 0
    total_technical = 0
    
    detailed_feedback = []
    
    # Linear Regression Weights (Predefined/Trained)
    # Target: Overall Quality (0-100)
    # Features:
    # X1: Similarity (0-1) - Weights how much the structure matches expected
    # X2: Keyword Match (0-1) - Weights content coverage
    # X3: Length Ratio (0-1) - Penalizes too short answers
    
    W_SIMILARITY = 30
    W_KEYWORD = 50
    W_LENGTH = 20
    BIAS = 5 
    
    for item in request.answers:
        expected = qs_map.get(item.question, "")
        if not expected:
             # Basic fallback if unknown question
             score = min(100, len(item.answer.split()) * 2)
             detailed_feedback.append({
                 "question": item.question,
                 "score": score,
                 "feedback": "Answer recorded."
             })
             total_score += score
             total_communication += 70 # Default average
             total_confidence += 70
             total_technical += score
             continue

        # Feature Extraction
        similarity = calculate_similarity(item.answer, expected)
        keyword_match = calculate_keyword_match(item.answer, expected)
        
        # Length Ratio (capped at 1.0)
        exp_len = len(expected)
        resp_len = len(item.answer)
        length_ratio = min(1.0, resp_len / max(1, exp_len))
        
        # Linear Equation
        raw_score = (similarity * W_SIMILARITY) + (keyword_match * W_KEYWORD) + (length_ratio * W_LENGTH) + BIAS
        final_score = min(100, max(0, int(raw_score)))
        
        # Derived Metric Estimates (Heuristics based on the same features)
        # Communication: Correlates mostly with Similarity (Flow) and Length
        comm_score = min(100, int((similarity * 60) + (length_ratio * 30) + 10))
        
        # Technical: Correlates highly with Keyword Match
        tech_score = min(100, int((keyword_match * 80) + (similarity * 20)))
        
        # Confidence: Hard to detect textually without AI, use Length as proxy (Volume = Confidence usually)
        conf_score = min(100, int((length_ratio * 70) + 30))

        feedback_text = "Good answer."
        if final_score < 50:
            feedback_text = "Answer lacks key details expected for this topic."
        elif final_score < 80:
            feedback_text = "Good answer, but missed some specific technical terms."
        else:
            feedback_text = "Excellent answer, covers all key points."

        detailed_feedback.append({
            "question": item.question,
            "score": final_score,
            "feedback": feedback_text
        })
        
        total_score += final_score
        total_communication += comm_score
        total_confidence += conf_score
        total_technical += tech_score

    count = len(request.answers)
    if count == 0:
        return EvaluationResult(
            overall_score=0, 
            skill_breakdown={"communication":0, "confidence":0, "technicalClarity":0},
            strengths=[], improvements=[], detailed_feedback=[]
        )

    avg_overall = int(total_score / count)
    avg_comm = int(total_communication / count)
    avg_conf = int(total_confidence / count)
    avg_tech = int(total_technical / count)

    strengths = []
    improvements = []
    
    if avg_tech > 75: strengths.append("Strong Technical Knowledge")
    else: improvements.append("Review core technical concepts deeply")
    
    if avg_comm > 75: strengths.append("Clear Communication Style")
    else: improvements.append("Practice structuring your answers more clearly")
    
    if avg_overall > 80: strengths.append("Excellent Interview Performance")
    
    return EvaluationResult(
        overall_score=avg_overall,
        skill_breakdown={
            "communication": avg_comm,
            "confidence": avg_conf,
            "technicalClarity": avg_tech
        },
        strengths=strengths,
        improvements=improvements,
        detailed_feedback=detailed_feedback
    )
