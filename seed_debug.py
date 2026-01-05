from backend.database import get_database
from backend.auth import get_password_hash
import datetime

def seed_users():
    log_file = open("seed_log.txt", "w")
    try:
        db = get_database()
        password = "1234"
        password_hash = get_password_hash(password)
        email = "abc@gmail.com"

        log_file.write(f"[{datetime.datetime.now()}] Seeding users with email: {email}\n")

        # Seed Student
        result = db.students.update_one(
            {"email": email}, 
            {"$set": {"password_hash": password_hash, "fullName": "Test Student"}}, 
            upsert=True
        )
        log_file.write(f"Student update acknowledged: {result.acknowledged}\n")

        # Seed College
        result = db.colleges.update_one(
            {"email": email}, 
            {"$set": {"password_hash": password_hash, "collegeName": "Test College"}}, 
            upsert=True
        )
        log_file.write(f"College update acknowledged: {result.acknowledged}\n")

        # Seed Company
        result = db.companies.update_one(
            {"email": email}, 
            {"$set": {"password_hash": password_hash, "companyName": "Test Company"}}, 
            upsert=True
        )
        log_file.write(f"Company update acknowledged: {result.acknowledged}\n")

        # Seed Admin
        result = db.admins.update_one(
            {"email": email}, 
            {"$set": {"password_hash": password_hash}}, 
            upsert=True
        )
        log_file.write(f"Admin update acknowledged: {result.acknowledged}\n")
        
        log_file.write("SEEDING COMPLETE.\n")
    except Exception as e:
        log_file.write(f"ERROR: {str(e)}\n")
    finally:
        log_file.close()

if __name__ == "__main__":
    seed_users()
