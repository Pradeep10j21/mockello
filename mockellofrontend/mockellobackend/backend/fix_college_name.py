from backend.database import get_database

db = get_database()

email = "college@gmail.com"
target_name = "Mumbai Institute of Technology"

print(f"Updating college {email} to have name '{target_name}'...")

result = db.colleges.update_one(
    {"email": email},
    {"$set": {"collegeName": target_name, "role": "college"}},
    upsert=True
)

print(f"Matched: {result.matched_count}, Modified: {result.modified_count}")

# Verify
c = db.colleges.find_one({"email": email})
print(f"Current State: {c.get('collegeName')}")
