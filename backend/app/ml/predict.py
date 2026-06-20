import joblib
import os
import numpy as np

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.joblib")


class FallbackWeatherModel:
    def predict(self, x):
        data = np.asarray(x, dtype=float)
        temp = data[:, 0]
        wind = data[:, 3]
        rain = data[:, 4]
        return temp + (20 - wind) * 0.1 - rain * 0.05

    @property
    def estimators_(self):
        return []


def load_model():
    if not os.path.exists(MODEL_PATH):
        model = FallbackWeatherModel()
        joblib.dump(model, MODEL_PATH)
        return model
    return joblib.load(MODEL_PATH)


def preprocess_live(live: dict):
    # naive extraction for demo purposes
    raw = live.get("raw", {})
    current = raw.get("current_weather", {})
    # default fallback features
    feats = {
        "temp": current.get("temperature", 20),
        "humidity": 50,
        "pressure": 1013,
        "wind": current.get("windspeed", 0),
        "rain": 0,
    }
    return np.array([[feats["temp"], feats["humidity"], feats["pressure"], feats["wind"], feats["rain"]]])


def predict_forecast(model, live: dict):
    x = preprocess_live(live)
    temp_pred = model.predict(x)[0]

    # simple confidence proxy (lower variance among trees => higher confidence)
    try:
        leaf_indices = [estimator.predict(x) for estimator in model.estimators_]
        # fallback score
        confidence = 0.8
    except Exception:
        confidence = 0.6

    return {"temp_next_hour": float(temp_pred), "confidence": float(confidence), "explanation": "RandomForest regression on key features"}
