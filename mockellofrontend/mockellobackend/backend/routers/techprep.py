from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, List
import json
import os

router = APIRouter(prefix="/techprep", tags=["TechPrep Assessment"])

# Load questions from JSON file
QUESTIONS_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "techprep_questions.json")

def load_questions():
    with open(QUESTIONS_PATH, "r") as f:
        return json.load(f)

class SubmitTest(BaseModel):
    answers: Dict[str, int]
    timedOut: bool = False

@router.get("/questions")
def get_questions():
    """Get all questions without revealing correct answers."""
    questions = load_questions()
    # Remove correctAnswer from response
    return [
        {"id": q["id"], "section": q["section"], "question": q["question"], "options": q["options"]}
        for q in questions
    ]

@router.post("/submit")
def submit_test(data: SubmitTest):
    """Submit test answers and get results."""
    questions = load_questions()
    user_answers = data.answers

    score = 0
    results = []

    for q in questions:
        qid = str(q["id"])
        correct = q["correctAnswer"]
        selected = user_answers.get(qid)

        is_correct = selected == correct if selected is not None else False
        if is_correct:
            score += 1

        results.append({
            "id": q["id"],
            "question": q["question"],
            "section": q["section"],
            "selectedAnswer": selected,
            "correctAnswer": correct,
            "isCorrect": is_correct
        })

    return {
        "totalQuestions": len(questions),
        "attempted": len(user_answers),
        "score": score,
        "results": results
    }
