import requests
import sys

BASE_URL = "http://localhost:8000"

def test_auth_flow():
    print(f"Testing Auth Flow against {BASE_URL}")
    
    # 1. Test Seeded Company Login (abc@gmail.com)
    print("\n[1] Testing '/company/login' with 'abc@gmail.com'...")
    try:
        resp = requests.post(f"{BASE_URL}/company/login", json={
            "email": "abc@gmail.com",
            "password": "1234"
        })
        print(f"Status: {resp.status_code}")
        if resp.status_code == 200:
            print("SUCCESS: Login worked for abc@gmail.com")
            print(f"Token: {resp.json().get('access_token')[:10]}...")
        else:
            print(f"FAIL: {resp.text}")
    except Exception as e:
        print(f"ERROR connecting: {e}")

    # 2. Test Dedicated Company Login (company@gmail.com)
    print("\n[2] Testing '/company/login' with 'company@gmail.com'...")
    try:
        resp = requests.post(f"{BASE_URL}/company/login", json={
            "email": "company@gmail.com",
            "password": "1234"
        })
        print(f"Status: {resp.status_code}")
        if resp.status_code == 200:
            print("SUCCESS: Login worked for company@gmail.com")
        else:
            print(f"FAIL: {resp.text}")
    except Exception as e:
        print(f"ERROR connecting: {e}")

if __name__ == "__main__":
    test_auth_flow()
