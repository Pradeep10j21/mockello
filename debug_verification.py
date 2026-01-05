from backend.database import get_database
from backend.auth import get_password_hash

print("--- DEBUGGING VERIFICATION FLOW ---")

db = get_database()

# 1. Check College Details
print("\n[COLLEGES]")
colleges = list(db.colleges.find())
for c in colleges:
    print(f"Email: {c.get('email')}, Name: '{c.get('collegeName')}'")

if not colleges:
    print("No colleges found!")

# 2. Check Student Details
print("\n[STUDENTS]")
students = list(db.students.find())
for s in students:
    print(f"Email: {s.get('email')}, College: '{s.get('collegeName')}', Verified: {s.get('isVerified')}")

if not students:
    print("No students found!")

# 3. Simulate The Query
print("\n[SIMULATION]")
for c in colleges:
    c_name = c.get('collegeName')
    if c_name:
        pending = list(db.students.find({"collegeName": c_name, "isVerified": False}))
        print(f"College '{c_name}' ({c.get('email')}) should see {len(pending)} pending students.")
    else:
        print(f"College {c.get('email')} has NO collegeName set!")
