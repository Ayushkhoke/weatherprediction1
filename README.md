# AI Weather Prediction System

Modern full-stack weather prediction platform.

Tech stack:
- Frontend: React + Vite + Tailwind CSS
- Backend: FastAPI (Python)
- ML: Scikit-Learn (RandomForest)
- External data: Open-Meteo API

Quick start (development):

1. Backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

2. Frontend

```bash
cd frontend
npm install
npm run dev
```

See `/backend` and `/frontend` folders for details.