from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import weather

app = FastAPI(title="AI Weather Prediction System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(weather.router, prefix="/api/weather")

@app.get("/health")
def health():
    return {"status": "ok"}
