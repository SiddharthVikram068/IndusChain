import pandas as pd
import numpy as np
import joblib



def predict_for_datetime(dt,FEATURES,model):
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
    prediction = model.predict(df[FEATURES])
    return prediction[0]  # Return the prediction value


FEATURES = ['dayofyear', 'hour', 'dayofweek', 'quarter', 'month', 'year']

# Load the model
model_file = 'model.joblib'
energy_model = joblib.load(model_file)
print("Model loaded successfully.")

# User input for prediction
prediction_datetime = input("Enter the datetime for prediction (YYYY-MM-DD HH:MM:SS): ")

# Make a prediction
prediction = predict_for_datetime(prediction_datetime,FEATURES,energy_model)

print(f"Predicted energy for {prediction_datetime}: {prediction:.2f}")
