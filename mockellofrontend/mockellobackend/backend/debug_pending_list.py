from backend.database import get_database

db = get_database()

print("--- DEBUGGING PENDING STUDENTS ---")

# 1. Count ALL students
total_students = db.students.count_documents({})
print(f"Total Students in DB: {total_students}")

# 2. Count Unverified
unverified_count = db.students.count_documents({"isVerified": False})
print(f"Total Unverified Students: {unverified_count}")

# 3. List Unverified
cursor = db.students.find({"isVerified": False})
print("\n[Unverified List]")
for s in cursor:
    print(f" - Email: {s.get('email')}, Name: {s.get('fullName')}, Verified: {s.get('isVerified')}")

print("\n----------------------------------")
