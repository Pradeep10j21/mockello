@echo off
cd /d "%~dp0"

echo Checking for venv...
if exist backend\venv (
    echo Activating backend\venv...
    call backend\venv\Scripts\activate
) else if exist venv (
    echo Activating venv...
    call venv\Scripts\activate
) else (
    echo No venv found, using system python...
)

echo.
echo Installing/Verifying dependencies...
python -m pip install pymongo fastapi uvicorn email-validator passlib[bcrypt] python-jose[cryptography] python-multipart
if %ERRORLEVEL% NEQ 0 (
    echo Failed to install dependencies.
    pause
    exit /b
)

echo.
echo Starting Backend Server...
echo Directory: %CD%
echo Command: python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
echo.
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
pause
