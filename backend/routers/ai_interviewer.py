from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import shutil
import urllib.request
import json
import requests

router = APIRouter(
    prefix="/ai-interviewer",
    tags=["ai-interviewer"]
)

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "<REDACTED>")

@router.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    print(f"[Backend] Received audio file: {file.filename}, Content-Type: {file.content_type}")
    
    # 1. Save locally for debug/inspection
    debug_filename = f"debug_last_audio_{file.filename}"
    try:
        with open(debug_filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        file_size = os.path.getsize(debug_filename)
        print(f"[Backend] Saved {debug_filename} ({file_size} bytes)")
        
        if file_size == 0:
            raise HTTPException(status_code=400, detail="Empty audio file received")

    except Exception as e:
        print(f"[Backend] File save error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to save file: {e}")

    # 2. Send to Groq
    url = "https://api.groq.com/openai/v1/audio/transcriptions"
    
    try:
        # Re-open the saved file to send it
        with open(debug_filename, "rb") as f:
            files = {
                'file': (file.filename, f, file.content_type)
            }
            data = {
                'model': 'whisper-large-v3',
                'language': 'en',
                'response_format': 'json'
            }
            headers = {
                'Authorization': f'Bearer {GROQ_API_KEY}'
            }
            
            print("[Backend] Sending request to Groq...")
            response = requests.post(url, headers=headers, files=files, data=data)
            
            if response.status_code != 200:
                print(f"[Backend] Groq Error Status: {response.status_code}")
                print(f"[Backend] Groq Error Body: {response.text}")
                
                # Log detailed error to file
                with open("groq_error.log", "w") as f:
                    f.write(response.text)
                    
                raise HTTPException(status_code=response.status_code, detail=f"Groq API Error: {response.text}")
            
            result = response.json()
            print(f"[Backend] Success! Text: {result.get('text', '')[:50]}...")
            return {"text": result.get('text', '')}

    except HTTPException as he:
        # Re-raise HTTP exceptions (like the 400 from Groq) without wrapping them
        raise he
    except Exception as e:
        import traceback
        error_trace = traceback.format_exc()
        print(f"[Backend] Request Exception: {e}")
        print(f"[Backend] Traceback: {error_trace}")
        
        # Write to file for debugging
        with open("backend_error.log", "w") as f:
            f.write(f"Error: {e}\nTraceback:\n{error_trace}")
            
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")
