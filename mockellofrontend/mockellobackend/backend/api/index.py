from pathlib import Path
import sys

# Ensure the backend package is importable when Vercel runs this function.
ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(ROOT / "backend"))

# Import the FastAPI `app` instance from backend/main.py
# backend/main.py should expose a FastAPI instance named `app`.
try:
    from main import app  # type: ignore
except Exception as e:
    # If import fails, raise a clear error so deployment logs are helpful.
    raise RuntimeError(f"Failed to import backend FastAPI app: {e}")

# Vercel's Python runtime will look for a variable named `app` (ASGI/WGSI).