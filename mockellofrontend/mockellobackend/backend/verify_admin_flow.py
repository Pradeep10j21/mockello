import urllib.request
import urllib.error
import json
import time

BASE_URL = "http://localhost:8000"

def make_request(url, method="GET", data=None, headers=None):
    if headers is None:
        headers = {}
    
    if data:
        data_bytes = json.dumps(data).encode("utf-8")
        headers["Content-Type"] = "application/json"
    else:
        data_bytes = None
        
    req = urllib.request.Request(url, data=data_bytes, headers=headers, method=method)
    
    try:
        with urllib.request.urlopen(req) as res:
             response_body = res.read().decode("utf-8")
             status = res.status
             try:
                 json_body = json.loads(response_body)
             except:
                 json_body = response_body
             return {"status": status, "body": json_body}
    except urllib.error.HTTPError as e:
        response_body = e.read().decode("utf-8")
        try:
             json_body = json.loads(response_body)
        except:
             json_body = response_body
        return {"status": e.code, "body": json_body}
    except Exception as e:
        return {"status": 0, "body": str(e)}

def run_test():
    print("--- Starting Admin Verification Flow Test (urllib) ---")
    
    # 1. Register a new College (Unverified by default)
    college_email = f"test_college_{int(time.time())}@example.com"
    print(f"\n[1] Registering new college: {college_email}")
    res = make_request(f"{BASE_URL}/college/register", method="POST", data={
        "email": college_email,
        "password": "password123",
        "collegeName": "Test College"
    })
    
    if res["status"] == 200:
        print("✅ Registration Successful")
    else:
        print(f"❌ Registration Failed: {res['body']}")
        return

    # 2. Try to Login (Should Fail with 403)
    print(f"\n[2] Attempting College Login (Should be Forbidden)")
    res = make_request(f"{BASE_URL}/college/login", method="POST", data={
        "email": college_email,
        "password": "password123"
    })
    
    if res["status"] == 403:
        print("✅ Login Blocked correctly (403 Forbidden)")
    else:
        print(f"❌ Login Validation Failed. Status: {res['status']}, Response: {res['body']}")
        return

    # 3. Admin: List Pending Colleges
    print(f"\n[3] Admin Listing Pending Colleges")
    # Admin login first (using debug bypass)
    admin_login = make_request(f"{BASE_URL}/admin/login", method="POST", data={
        "email": "abc@gmail.com",
        "password": "1234"
    })
    admin_token = admin_login["body"]["access_token"]
    
    res = make_request(f"{BASE_URL}/admin/pending-colleges") 
    
    pending_list = res["body"]
    found = any(c['email'] == college_email for c in pending_list)
    
    if found:
         print(f"✅ New college found in pending list.")
    else:
         print(f"❌ College NOT found in pending list. List: {pending_list}")
         return

    # 4. Admin: Verify College
    print(f"\n[4] Admin Verifying College")
    res = make_request(f"{BASE_URL}/admin/verify-college/{college_email}", method="POST")
    
    if res["status"] == 200:
        print(f"✅ Verification Endpoint Success")
    else:
        print(f"❌ Verification Failed: {res['body']}")
        return

    # 5. College Login (Should Success now)
    print(f"\n[5] Attempting College Login after Verification (Should Succeed)")
    res = make_request(f"{BASE_URL}/college/login", method="POST", data={
        "email": college_email,
        "password": "password123"
    })
    
    if res["status"] == 200:
        print("✅ Login Successful!")
    else:
        print(f"❌ Login Failed after verification: {res['body']}")
        
    print("\n--- Test Complete ---")

if __name__ == "__main__":
    try:
        run_test()
    except Exception as e:
        print(f"Test Failed with Exception: {e}")
