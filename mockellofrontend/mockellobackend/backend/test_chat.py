import requests
import json

url = "http://127.0.0.1:8000/ai-interviewer/chat"
payload = {
    "messages": [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello, how are you?"}
    ],
    "model": "llama-3.3-70b-versatile"
}

print(f"Testing {url}...")
try:
    response = requests.post(url, json=payload)
    if response.status_code == 200:
        print("Success!")
        data = response.json()
        content = data.get("choices", [{}])[0].get("message", {}).get("content", "No content")
        print(f"Reply: {content}")
    else:
        print(f"Failed with status {response.status_code}")
        print(response.text)
except Exception as e:
    print(f"Error: {e}")
