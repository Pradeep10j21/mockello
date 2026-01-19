import random
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from backend.database import get_database

# Categories and their weights
CATEGORIES = ["quantitative", "logical", "verbal"]

# Sample data for generation
TOPICS = {
    "quantitative": [
        "Time and Work", "Time Speed Distance", "Profit and Loss", 
        "Simple and Compound Interest", "Ratio and Proportion", 
        "Average", "Percentage", "Number System"
    ],
    "logical": [
        "Blood Relations", "Coding Decoding", "Direction Sense", 
        "Series Completion", "Seating Arrangement", "Syllogism"
    ],
    "verbal": [
        "Synonyms", "Antonyms", "Sentence Correction", 
        "Fill in the blanks", "Idioms and Phrases"
    ]
}

def generate_quantitative_question(index):
    topic = random.choice(TOPICS["quantitative"])
    
    if "Time" in topic:
        val1 = random.randint(10, 100)
        val2 = random.randint(2, 10)
        ans = val1 / val2
        options = [ans, ans + 2, ans - 1, ans * 2]
        random.shuffle(options)
        correct_idx = options.index(ans)
        
        return {
            "id": f"q{index}",
            "category": "quantitative",
            "question": f"A train covers {val1} km in {val2} hours. What is its speed?",
            "options": [f"{o:.2f} km/h" for o in options],
            "correctAnswer": correct_idx,
            "explanation": f"Speed = Distance/Time = {val1}/{val2} = {ans:.2f} km/h",
            "concept": topic,
            "difficulty": random.choice(["easy", "medium"]),
        }
    
    # Generic filler for other quant topics to ensure unique questions
    val1 = random.randint(100, 999)
    val2 = random.randint(10, 99)
    ans = val1 + val2
    options = [ans, ans+10, ans-10, ans+20]
    random.shuffle(options)
    correct_idx = options.index(ans)
    
    return {
        "id": f"q{index}",
        "category": "quantitative",
        "question": f"What is the sum of {val1} and {val2}?",
        "options": [str(o) for o in options],
        "correctAnswer": correct_idx,
        "explanation": f"{val1} + {val2} = {ans}",
        "concept": "Basic Math",
        "difficulty": "easy",
    }

def generate_logical_question(index):
    topic = random.choice(TOPICS["logical"])
    
    # Simple series generator
    start = random.randint(1, 20)
    diff = random.randint(2, 5)
    series = [start + i*diff for i in range(5)]
    ans = series[-1]
    series_str = ", ".join(map(str, series[:-1]))
    
    options = [ans, ans+diff, ans-diff, ans+2*diff]
    random.shuffle(options)
    correct_idx = options.index(ans)
    
    return {
        "id": f"q{index}",
        "category": "logical",
        "question": f"Find the next number in the series: {series_str}, ?",
        "options": [str(o) for o in options],
        "correctAnswer": correct_idx,
        "explanation": f"The series increases by {diff} each time. Next number is {series[-2]} + {diff} = {ans}",
        "concept": "Series",
        "difficulty": "medium",
    }

def generate_verbal_question(index):
    words = [
        ("Happy", "Joyful", "Sad"), ("Big", "Huge", "Small"), 
        ("Fast", "Quick", "Slow"), ("Smart", "Intelligent", "Dumb"),
        ("Benevolent", "Kind", "Cruel"), ("Diligent", "Hardworking", "Lazy")
    ]
    word, syn, ant = random.choice(words)
    
    is_syn = random.choice([True, False])
    q_type = "synonym" if is_syn else "antonym"
    ans = syn if is_syn else ant
    distractors = [ant, "Neutral", "None"] if is_syn else [syn, "Neutral", "None"]
    
    options = [ans] + distractors
    random.shuffle(options)
    correct_idx = options.index(ans)
    
    return {
        "id": f"q{index}",
        "category": "verbal",
        "question": f"Choose the {q_type} for the word: {word}",
        "options": options,
        "correctAnswer": correct_idx,
        "explanation": f"The {q_type} of {word} is {ans}.",
        "concept": "Vocabulary",
        "difficulty": "medium",
    }

def seed_data():
    db = get_database()
    collection = db["aptitude_questions"]
    
    # diverse hardcoded questions could be added here, but for 500 we generated
    questions = []
    
    print("Generating 500 questions...")
    for i in range(1, 501):
        cat = random.choice(CATEGORIES)
        if cat == "quantitative":
            q = generate_quantitative_question(i)
        elif cat == "logical":
            q = generate_logical_question(i)
        else:
            q = generate_verbal_question(i)
        questions.append(q)
        
    print("Clearing existing questions...")
    collection.delete_many({})
    
    print(f"Inserting {len(questions)} questions...")
    collection.insert_many(questions)
    print("Done!")

if __name__ == "__main__":
    seed_data()
