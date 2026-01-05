from backend.database import get_database
from backend.auth import get_password_hash
from backend.models import StudentCreate, CollegeCreate, CompanyCreate, AdminCreate

def seed_users():
    db = get_database()
    password = "1234"
    password_hash = get_password_hash(password)
    email = "abc@gmail.com"

    print(f"Seeding users with email: {email} and password: {password}")

    # Seed Student
    student = {
        "email": email,
        "password_hash": password_hash,
        "fullName": "Test Student",
        "collegeName": "Test College",
        "mobileNumber": "1234567890"
    }
    db.students.update_one({"email": email}, {"$set": student}, upsert=True)
    print("Student seeded/updated.")

    # Seed College
    college = {
        "email": email,
        "password_hash": password_hash,
        "collegeName": "Test College",
        "officerName": "Test Officer",
        "officerPhone": "0987654321"
    }
    db.colleges.update_one({"email": email}, {"$set": college}, upsert=True)
    print("College seeded/updated.")

    # Seed Company
    company = {
        "email": email,
        "password_hash": password_hash,
        "companyName": "Test Company",
        "industry": "Tech",
        "companyType": "Startup"
    }
    db.companies.update_one({"email": email}, {"$set": company}, upsert=True)
    print("Company seeded/updated.")

    # Seed Admin
    admin = {
        "email": email,
        "password_hash": password_hash
    }
    db.admins.update_one({"email": email}, {"$set": admin}, upsert=True)
    print("Admin seeded/updated.")

if __name__ == "__main__":
    seed_users()
