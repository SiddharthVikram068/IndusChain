import pandas as pd
import numpy as np
import joblib

class EnergyPredictionModel:
    def __init__(self, model_file):
        self.model = joblib.load(model_file)
        self.FEATURES = ['dayofyear', 'hour', 'dayofweek', 'quarter', 'month', 'year']
        print("Model loaded successfully.")

    def predict_for_datetime(self, dt):
        """Predict energy for a specific datetime."""
        # Create a DataFrame for the specific datetime
        df = pd.DataFrame(index=[pd.to_datetime(dt)])

        # Create time-based features for the DataFrame
        df['hour'] = df.index.hour
        df['dayofweek'] = df.index.dayofweek
        df['quarter'] = df.index.quarter
        df['month'] = df.index.month
        df['year'] = df.index.year
        df['dayofyear'] = df.index.dayofyear

        # Predict using the trained model
        prediction = self.model.predict(df[self.FEATURES])
        return prediction[0]  # Return the prediction value

if __name__ == "__main__":
    # Load the model
    model_filename = 'energy_prediction_model.joblib'
    energy_model = EnergyPredictionModel(model_filename)

    # User input for prediction
    prediction_datetime = input("Enter the datetime for prediction (YYYY-MM-DD HH:MM:SS): ")

    # Make a prediction
    prediction = energy_model.predict_for_datetime(prediction_datetime)

    print(f"Predicted energy for {prediction_datetime}: {prediction:.2f}")
