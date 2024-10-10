from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
from datetime import datetime

# Create Flask app
app = Flask(__name__)

# Load the saved model
model_filename = 'energy_prediction_model.pkl'
model = joblib.load(model_filename)

# Example feature columns (these should match the model's expected features)
FEATURES = ['dayofyear', 'hour', 'dayofweek', 'quarter', 'month', 'year', 'lag_1', 'lag_24', 'rolling_mean', 'rolling_std']

# Example data for lag and rolling stats (replace with actual data loading logic)
train_data = pd.read_csv('./processed_train_data.csv')
train_data['datetime'] = pd.to_datetime(train_data['datetime'])
train_data = train_data.set_index('datetime')

# Helper function to create features for a given datetime
def create_features_for_datetime(dt):
    df = pd.DataFrame(index=[pd.to_datetime(dt)])
    df['hour'] = df.index.hour
    df['dayofweek'] = df.index.dayofweek
    df['quarter'] = df.index.quarter
    df['month'] = df.index.month
    df['year'] = df.index.year
    df['dayofyear'] = df.index.dayofyear

    # Lag features: use the last known values from the train data
    df['lag_1'] = train_data['energy'].iloc[-1]  # Use the last known energy value
    df['lag_24'] = train_data['energy'].iloc[-24]  # Use the energy value from 24 hours ago

    # Rolling features (replace with real data)
    df['rolling_mean'] = train_data['energy'].rolling(window=24).mean().iloc[-1]
    df['rolling_std'] = train_data['energy'].rolling(window=24).std().iloc[-1]

    return df[FEATURES]

# Route for predicting energy for a specific datetime
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from the request
        data = request.json
        dt = data['datetime']

        # Create features for the given datetime
        df = create_features_for_datetime(dt)

        # Predict energy using the loaded model
        prediction = model.predict(df)

        return jsonify({'datetime': dt, 'predicted_energy': prediction[0]})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Route for testing if the app is working
@app.route('/test', methods=['GET'])
def test():
    return "Energy Prediction Model API is working!", 200

if __name__ == '__main__':
    app.run(debug=True)
