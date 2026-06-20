import requests
from datetime import datetime

BASE = "https://api.open-meteo.com/v1/forecast"


def fetch_live_weather(lat: float, lon: float) -> dict:
    params = {
        "latitude": lat,
        "longitude": lon,
        "hourly": "temperature_2m,relativehumidity_2m,pressure_msl,cloudcover,precipitation,wind_speed_10m",
        "current_weather": True,
        "timezone": "UTC",
    }
    r = requests.get(BASE, params=params, timeout=10)
    r.raise_for_status()
    data = r.json()

    # return a compact live dict used by the ML model
    return {"raw": data, "fetched_at": datetime.utcnow().isoformat()}
