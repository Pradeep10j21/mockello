import os
from dotenv import load_dotenv
import requests
import json

# Path to the backend .env file
dotenv_path = os.path.join("backend", ".env")

if os.path.exists(dotenv_path):
    print(f"Loading environment from {dotenv_path}...")
    load_dotenv(dotenv_path=dotenv_path)
else:
    print(f"Warning: {dotenv_path} not found. Trying local .env...")
    load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    print("Error: GROQ_API_KEY not found in environment variables.")
else:
    print(f"Found GROQ_API_KEY (starts with: {GROQ_API_KEY[:6]}...)")
    
    # Test call: List models
    url = "https://api.groq.com/openai/v1/models"
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}"
    }
    
    print("Testing connection to Groq API...")
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            print("Groq Status: SUCCESS!")
            models = response.json()
            if "data" in models:
                print(f"Successfully retrieved {len(models['data'])} models.")
            else:
                print("Unexpected response format, but status was 200.")
        else:
            print(f"Groq Status: FAILED (Code {response.status_code})")
            print("Response body:")
            print(response.text)
    except Exception as e:
        print(f"An error occurred with Groq: {e}")

# Test MongoDB
from pymongo import MongoClient
from pymongo.server_api import ServerApi

MONGO_URI = os.getenv("MONGODB_URI")
if not MONGO_URI:
    print("Error: MONGODB_URI not found in environment.")
    MONGO_URI = "dummy" # Prevent crash, but connection will fail

print("\nTesting connection to MongoDB Atlas...")
try:
    client = MongoClient(MONGO_URI, server_api=ServerApi('1'), serverSelectionTimeoutMS=5000)
    client.admin.command('ping')
    print("MongoDB Status: SUCCESS!")
except Exception as e:
    print(f"MongoDB Status: FAILED")
    print(f"Error: {e}")
finally:
    client.close()
