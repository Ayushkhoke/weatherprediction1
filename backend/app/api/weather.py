from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.utils.open_meteo import fetch_live_weather
from app.ml.predict import predict_forecast, load_model
from typing import Optional

router = APIRouter()


class SearchRequest(BaseModel):
    city: str
    lat: Optional[float]
    lon: Optional[float]


@router.post("/search")
def search_weather(req: SearchRequest):
    if req.lat is None or req.lon is None:
        # In a full app, we'd geocode the city. For now require lat/lon.
        raise HTTPException(status_code=400, detail="Provide lat and lon or implement geocoding.")

    live = fetch_live_weather(req.lat, req.lon)

    model = load_model()
    preds = predict_forecast(model, live)

    return {"live": live, "predictions": preds}
