import sys
import datetime

def log(msg):
    with open("diagnosis_log.txt", "a") as f:
        f.write(f"[{datetime.datetime.now()}] {msg}\n")

log("Script started.")

try:
    log("Importing pymongo...")
    from pymongo import MongoClient
    log("Importing pymongo... DONE")
    
    # Use a dummy URI to test if it's just the library or the network
    # Real URI should be in database.py, let's try to import it
    log("Importing database module...")
    from backend.database import get_database, URI
    log("Importing database module... DONE")
    
    log(f"URI found (length): {len(URI)}")
    
    log("Attempting client connection (no IO yet)...")
    client = MongoClient(URI, serverSelectionTimeoutMS=5000) # 5 second timeout
    log("Client object created.")
    
    log("Attempting server ping...")
    client.admin.command('ping')
    log("Ping successful!")
    
except Exception as e:
    log(f"ERROR: {e}")

log("Script finished.")
