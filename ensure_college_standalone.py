from pymongo import MongoClient
from pymongo.server_api import ServerApi
import bcrypt

URI = "mongodb+srv://pradeepsathish822_db_user:dwLrFrHiyU2IhlCL@cluster0.ftarsv1.mongodb.net/?appName=Cluster0"

print("Connecting to MongoDB...")
client = MongoClient(URI, server_api=ServerApi('1'))
db = client["mockello_mvp_db"]
print("Connected!")

email = "college@gmail.com"
# Need to match the user's password which is "1234"
# We need to hash it.
hashed = bcrypt.hashpw("1234".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

print(f"Upserting college {email}...")

result = db.colleges.update_one(
    {"email": email},
    {"$set": {
        "collegeName": "Mumbai Institute of Technology", 
        "password_hash": hashed,
        "role": "college",
        "university": "Mumbai University", # Default
        "location": "Mumbai, Maharashtra" # Default
    }},
    upsert=True
)

print(f"Matched: {result.matched_count}, Modified: {result.modified_count}, Upserted: {result.upserted_id}")
print("DONE.")
