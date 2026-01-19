from backend.database import get_database
from backend.auth import verify_password
import sys

def debug_user_auth(email="abc@gmail.com", password="1234"):
    db = get_database()
    
    print(f"--- Debugging Auth for {email} ---")
    
    # Check Student
    student = db.students.find_one({"email": email})
    if student:
        print(f"[Student] User found.")
        stored_hash = student.get("password_hash")
        print(f"[Student] Hash: {stored_hash}")
        if stored_hash:
            is_valid = verify_password(password, stored_hash)
            print(f"[Student] Password '1234' Valid? {is_valid}")
        else:
            print("[Student] No password_hash found!")
    else:
        print("[Student] User NOT found.")

    # Check College
    college = db.colleges.find_one({"email": email})
    if college:
        print(f"[College] User found.")
        stored_hash = college.get("password_hash")
        if stored_hash:
            is_valid = verify_password(password, stored_hash)
            print(f"[College] Password '1234' Valid? {is_valid}")
    else:
        print("[College] User NOT found.")

    # Check Company
    company = db.companies.find_one({"email": email})
    if company:
        print(f"[Company] User found.")
        stored_hash = company.get("password_hash")
        if stored_hash:
            is_valid = verify_password(password, stored_hash)
            print(f"[Company] Password '1234' Valid? {is_valid}")
    else:
        print("[Company] User NOT found.")
        
    # Check Admin
    admin = db.admins.find_one({"email": email})
    if admin:
        print(f"[Admin] User found.")
        stored_hash = admin.get("password_hash")
        if stored_hash:
            is_valid = verify_password(password, stored_hash)
            print(f"[Admin] Password '1234' Valid? {is_valid}")
    else:
        print("[Admin] User NOT found.")

if __name__ == "__main__":
    debug_user_auth()
