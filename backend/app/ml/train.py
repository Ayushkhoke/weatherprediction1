import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import joblib
import os
import numpy as np

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "data", "historical.csv")
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.joblib")


def load_data(path=DATA_PATH):
    if not os.path.exists(path):
        # generate tiny synthetic dataset as placeholder
        temp = np.random.uniform(-5, 35, 1000)
        return pd.DataFrame({
            "temp": temp,
            "humidity": np.random.uniform(10, 100, 1000),
            "pressure": np.random.uniform(980, 1030, 1000),
            "wind": np.random.uniform(0, 20, 1000),
            "rain": np.random.uniform(0, 20, 1000),
            "target_temp_next_hour": temp + np.random.normal(0, 1, 1000),
        })
    return pd.read_csv(path)


def train():
    df = load_data()
    X = df[["temp", "humidity", "pressure", "wind", "rain"]]
    y = df["target_temp_next_hour"] if "target_temp_next_hour" in df.columns else df["temp"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    preds = model.predict(X_test)
    print("RMSE:", mean_squared_error(y_test, preds, squared=False))

    joblib.dump(model, MODEL_PATH)
    print("Saved model to", MODEL_PATH)

if __name__ == "__main__":
    train()
