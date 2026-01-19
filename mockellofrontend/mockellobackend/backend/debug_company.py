from backend.database import get_database
from backend.auth import get_password_hash, verify_password
import sys

def debug_company_login():
    db = get_database()
    email = "abc@gmail.com"
    target_password = "1234"
    
    print(f"--- DIAGNOSING COMPANY LOGIN FOR {email} ---")
    
    # 1. Check existence
    company = db.companies.find_one({"email": email})
    
    if not company:
        print("RESULT: User NOT FOUND in 'companies' collection.")
        print("Action: Creating user now...")
        hashed = get_password_hash(target_password)
        db.companies.insert_one({
            "email": email,
            "password_hash": hashed,
            "companyName": "Debug Company",
            "role": "company"
        })
        print("User created.")
    else:
        print("RESULT: User FOUND in 'companies' collection.")
        current_hash = company.get("password_hash", "NO_HASH")
        print(f"Stored Hash prefix: {current_hash[:10]}...")
        
        # 2. Verify Password
        if verify_password(target_password, current_hash):
            print("RESULT: Password '1234' matches the stored hash.")
        else:
            print("RESULT: Password '1234' DOES NOT match stored hash.")
            print("Action: Updating password to '1234'...")
            new_hash = get_password_hash(target_password)
            db.companies.update_one(
                {"email": email},
                {"$set": {"password_hash": new_hash}}
            )
            print("Password updated.")

    # 3. Verify 'company@gmail.com' as well just in case
    print(f"\n--- CHECKING DEDICATED USER 'company@gmail.com' ---")
    ded_company = db.companies.find_one({"email": "company@gmail.com"})
    if ded_company:
        if verify_password(target_password, ded_company.get("password_hash", "")):
             print("RESULT: company@gmail.com is VALID with password '1234'")
        else:
             print("RESULT: company@gmail.com exists but password fails.")
    else:
        print("RESULT: company@gmail.com NOT FOUND.")

if __name__ == "__main__":
    debug_company_login()
