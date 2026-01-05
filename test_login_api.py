import requests
import sys

def test_login():
    url = "http://localhost:8000/student/login"
    payload = {
        "email": "abc@gmail.com",
        "password": "1234"
    }
    
    print(f"Testing Login to {url}...")
    try:
        response = requests.post(url, json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("LOGIN SUCCESS!")
        else:
            print("LOGIN FAILED!")
            
    except Exception as e:
        print(f"Error connecting to backend: {e}")

if __name__ == "__main__":
    test_login()
