from backend.database import get_database
from backend.auth import get_password_hash
import datetime

def seed_distinct_users():
    log_file = open("seed_distinct_log.txt", "w")
    try:
        db = get_database()
        # Force ping
        db.client.admin.command('ping')
        
        password = "1234"
        password_hash = get_password_hash(password)

        log_file.write(f"[{datetime.datetime.now()}] Starting distinct user seed...\n")

        # 1. Student
        student_email = "student@gmail.com"
        db.students.update_one(
            {"email": student_email}, 
            {"$set": {
                "password_hash": password_hash, 
                "fullName": "Demo Student", 
                "role": "student",
                "mobileNumber": "1234567890"
            }}, 
            upsert=True
        )
        log_file.write(f"Student created: {student_email}\n")

        # 2. College
        college_email = "college@gmail.com"
        db.colleges.update_one(
            {"email": college_email}, 
            {"$set": {
                "password_hash": password_hash, 
                "collegeName": "Demo College", 
                "role": "college",
                "officerPhone": "9876543210"
            }}, 
            upsert=True
        )
        log_file.write(f"College created: {college_email}\n")

        # 3. Company
        company_email = "company@gmail.com"
        db.companies.update_one(
            {"email": company_email}, 
            {"$set": {
                "password_hash": password_hash, 
                "companyName": "Demo Company", 
                "role": "company",
                "industry": "Tech"
            }}, 
            upsert=True
        )
        log_file.write(f"Company created: {company_email}\n")

        # 4. Admin
        admin_email = "admin@gmail.com"
        db.admins.update_one(
            {"email": admin_email}, 
            {"$set": {
                "password_hash": password_hash, 
                "role": "admin"
            }}, 
            upsert=True
        )
        log_file.write(f"Admin created: {admin_email}\n")
        
        log_file.write("SEEDING COMPLETE.\n")
        print("Done")
    except Exception as e:
        log_file.write(f"ERROR: {str(e)}\n")
        print(f"Error: {e}")
    finally:
        log_file.close()

if __name__ == "__main__":
    seed_distinct_users()
