import joblib

# Load the trained model
rfc = joblib.load('model_xgboost.joblib')

def get_user_input():
    # Getting the input data from the user
    print("Enter the input parameters for the predictive maintenance classification:")

    selected_type = input("Select a Type (Low/Medium/High) with L/M/H: ")
    type_mapping = {'L': 0, 'M': 1, 'H': 2}
    if selected_type not in type_mapping:
        print("Invalid selection. Please choose from Low, Medium, or High.")
        return None

    air_temperature = float(input('Air temperature [K]: '))
    process_temperature = float(input('Process temperature [K]: '))
    rotational_speed = float(input('Rotational speed [rpm]: '))
    torque = float(input('Torque [Nm]: '))
    tool_wear = float(input('Tool wear [min]: '))

    return [type_mapping[selected_type], air_temperature, process_temperature,
            rotational_speed, torque, tool_wear]

def main():
    user_input = get_user_input()
    if user_input is None:
        return

    # Predicting failure
    failure_pred = rfc.predict([user_input])

    if failure_pred[0] == 1:
        print("Prediction: Failure")
    else:
        print("Prediction: No Failure")

if __name__ == "__main__":
    main()
