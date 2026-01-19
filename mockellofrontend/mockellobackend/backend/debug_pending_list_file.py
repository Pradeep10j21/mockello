from backend.database import get_database
import sys

# Redirect stdout to a file
sys.stdout = open("debug_output.txt", "w")

try:
    db = get_database()

    print("--- DEBUGGING PENDING STUDENTS (FILE OUTPUT) ---")

    # 1. Count ALL students
    total_students = db.students.count_documents({})
    print(f"Total Students in DB: {total_students}")

    # 2. Count Unverified
    unverified_count = db.students.count_documents({"isVerified": False})
    print(f"Total Unverified Students: {unverified_count}")

    # 3. List Unverified
    cursor = db.students.find({"isVerified": False})
    print("\n[Unverified List]")
    found = False
    for s in cursor:
        found = True
        print(f" - Email: {s.get('email')}, Name: {s.get('fullName')}, Verified: {s.get('isVerified')}")
    
    if not found:
        print("No unverified students found in the loop.")

    # 4. List ALL students just in case
    print("\n[ALL Students Dump]")
    cursor_all = db.students.find({})
    for s in cursor_all:
        print(f" - Email: {s.get('email')}, Verified: {s.get('isVerified')}, College: {s.get('collegeName')}")

except Exception as e:
    print(f"ERROR: {e}")

finally:
    sys.stdout.close()
