# Mockello MVP - Placement Management System

Mockello is a comprehensive placement management platform designed to streamline the interaction between **Students**, **Colleges**, **Companies**, and **Super Admins**.

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.9 or higher)
- **MongoDB Atlas** (The project is currently configured with a demo URI)

---

## 🛠️ Backend Setup (FastAPI)

The backend handles authentication, database interactions, and business logic.

1. **Navigate to the root directory.**
2. **(Optional) Create a virtual environment:**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # On Windows
   source venv/bin/activate  # On macOS/Linux
   ```
3. **Install dependencies:**
   ```bash
   pip install -r backend/requirements.txt
   ```
   *Alternatively, run `start_backend.bat` on Windows to auto-install and start.*
4. **Run the server:**
   ```bash
   python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
   ```
   The backend will be available at `http://localhost:8000`.

---

## 💻 Frontend Setup (React + Vite)

The frontend provides the user interface for all four roles.

1. **Navigate to the root directory.**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your OpenAI API key:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```
   > **Note:** The HR Interview transcription feature uses OpenAI's Whisper API. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys).
4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:8081`.

---

## 🔐 Default Debug Credentials

For testing purposes, we have enabled a debug bypass. You can use the following credentials for any role (**Student**, **College**, **Company**, **Admin**):

- **Email:** `abc@gmail.com`
- **Password:** `1234`

---

## 📁 Project Structure

- `src/`: Frontend React components and pages.
- `backend/`: FastAPI application, routers, and models.
- `backend/routers/`: Specific API routes for different modules.
- `public/`: Static assets and logos.

## ✅ Verification Flow

1. **Colleges/Companies** register and complete onboarding.
2. They are redirected to a **Pending Approval** page.
3. **Super Admin** logs in to `http://localhost:8081/admin/login`.
4. The Admin approves the request in the dashboard.
5. Once approved, the College/Company can access their dashboard!
