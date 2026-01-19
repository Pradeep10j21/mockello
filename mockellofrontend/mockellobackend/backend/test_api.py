import urllib.request
import json

try:
    url = "http://localhost:8000/aptitude/test"
    with urllib.request.urlopen(url) as response:
        if response.status == 200:
            data = json.loads(response.read().decode())
            print(f"Success! Received {len(data)} questions.")
            
            if len(data) > 0:
                print("First question sample:")
                print(json.dumps(data[0], indent=2))
            
            if len(data) == 30:
                print("Verified: Returns exactly 30 questions.")
            else:
                print(f"Warning: Expected 30 questions, got {len(data)}")
        else:
            print(f"Failed with status code: {response.status}")
except Exception as e:
    print(f"Error: {e}")
