import numpy as np
import pandas as pd

# Function to generate CNC Machine Dataset
def generate_cnc_dataset(num_entries=10000):
    np.random.seed(0)  # For reproducibility
    machineID = [f"{i+1}" for i in range(num_entries)]
    spindle_speed = np.round(np.random.normal(1200, 100, num_entries), 2)
    feed_rate = np.round(np.random.uniform(100, 300, num_entries), 2)
    tool_temperature = np.round(np.cumsum(np.random.normal(200, 5, num_entries)), 2)
    vibration_level = np.round(np.random.normal(1.5, 0.2, num_entries), 2)
    power_consumption = np.round(np.random.normal(5, 0.5, num_entries), 2)
    tool_wear = np.round(np.maximum(0, np.random.normal(0, 1, num_entries).cumsum()), 2)

    # Failure types mapped to numbers
    failure_types = {
        "No Failure": 0,
        "Tool Wear": 1,
        "Overheating": 2,
        "Spindle Failure": 3,
        "Control System Malfunction": 4,
        "Axis Drive Failure": 5
    }

    # Randomly assign one failure type for each entry
    failure_keys = list(failure_types.keys())
    machine_failures = np.random.choice(failure_keys, size=num_entries)

    return pd.DataFrame({
        'machineID': machineID,
        'spindle_speed [RPM]': spindle_speed,
        'feed_rate [mm/min]': feed_rate,
        'tool_temperature [°C]': tool_temperature,
        'vibration_level [m/s²]': vibration_level,
        'power_consumption [kW]': power_consumption,
        'tool_wear [min]': tool_wear,
        'failure_type': [failure_types[failure] for failure in machine_failures]  # Numeric failure type
    })

# Function to generate Injection Molding Machine Dataset
def generate_injection_molding_dataset(num_entries=10000):
    np.random.seed(1)
    machineID = [f"{i+1}" for i in range(num_entries)]
    injection_pressure = np.round(np.random.normal(100, 10, num_entries), 2)
    melt_temperature = np.round(np.random.uniform(180, 220, num_entries), 2)
    clamping_force = np.round(np.random.normal(50, 5, num_entries), 2)
    cycle_time = np.round(np.random.normal(30, 3, num_entries), 2)
    screw_speed = np.round(np.random.uniform(50, 150, num_entries), 2)
    cooling_time = np.round(np.random.normal(20, 2, num_entries), 2)
    hydraulic_pressure = np.round(np.random.normal(3000, 200, num_entries), 2)

    # Failure types mapped to numbers
    failure_types = {
        "No Failure": 0,
        "Injection Unit Failure": 1,
        "Mold Damage": 2,
        "Hydraulic System Failure": 3,
        "Heater Band Failure": 4,
        "Ejector Pin Failure": 5
    }

    # Randomly assign one failure type for each entry
    failure_keys = list(failure_types.keys())
    machine_failures = np.random.choice(failure_keys, size=num_entries)

    return pd.DataFrame({
        'machineID': machineID,
        'injection_pressure [bar]': injection_pressure,
        'melt_temperature [°C]': melt_temperature,
        'clamping_force [ton]': clamping_force,
        'cycle_time [seconds]': cycle_time,
        'screw_speed [RPM]': screw_speed,
        'cooling_time [seconds]': cooling_time,
        'hydraulic_pressure [psi]': hydraulic_pressure,
        'failure_type': [failure_types[failure] for failure in machine_failures]  # Numeric failure type
    })

# Function to generate Lathe Machine Dataset
def generate_lathe_dataset(num_entries=10000):
    np.random.seed(2)
    machineID = [f"{i+1}" for i in range(num_entries)]
    spindle_speed = np.round(np.random.normal(800, 100, num_entries), 2)
    feed_rate = np.round(np.random.uniform(0.1, 0.5, num_entries), 2)
    depth_of_cut = np.round(np.random.normal(2, 0.5, num_entries), 2)
    tool_wear = np.round(np.maximum(0, np.random.normal(0, 1, num_entries).cumsum()), 2)
    vibration_level = np.round(np.random.normal(1.2, 0.1, num_entries), 2)
    cutting_force = np.round(spindle_speed * depth_of_cut * 0.5, 2)

    # Failure types mapped to numbers
    failure_types = {
        "No Failure": 0,
        "Spindle Bearing Failure": 1,
        "Tool Post Misalignment": 2,
        "Gearbox Malfunction": 3,
        "Chuck Failure": 4,
        "Tailstock Misalignment": 5
    }

    # Randomly assign one failure type for each entry
    failure_keys = list(failure_types.keys())
    machine_failures = np.random.choice(failure_keys, size=num_entries)

    return pd.DataFrame({
        'machineID': machineID,
        'spindle_speed [RPM]': spindle_speed,
        'feed_rate [mm/rev]': feed_rate,
        'depth_of_cut [mm]': depth_of_cut,
        'tool_wear [mm]': tool_wear,
        'vibration_level [m/s²]': vibration_level,
        'cutting_force [N]': cutting_force,
        'failure_type': [failure_types[failure] for failure in machine_failures]  # Numeric failure type
    })

# Function to generate 3D Printing Machine Dataset
def generate_3d_printer_dataset(num_entries=10000):
    np.random.seed(3)
    machineID = [f"{i+1}" for i in range(num_entries)]
    layer_height = np.round(np.random.uniform(0.1, 0.5, num_entries), 2)
    print_speed = np.round(np.random.uniform(30, 100, num_entries), 2)
    nozzle_temperature = np.round(np.random.normal(200, 10, num_entries), 2)
    bed_temperature = np.round(np.random.normal(60, 5, num_entries), 2)
    filament_diameter = np.round(np.random.normal(1.75, 0.05, num_entries), 2)

    # Failure types mapped to numbers
    failure_types = {
        "No Failure": 0,
        "Nozzle Clogging": 1,
        "Bed Adhesion Failure": 2,
        "Filament Jam": 3,
        "Power Loss": 4,
        "Software Error": 5
    }

    # Randomly assign one failure type for each entry
    failure_keys = list(failure_types.keys())
    machine_failures = np.random.choice(failure_keys, size=num_entries)

    return pd.DataFrame({
        'machineID': machineID,
        'layer_height [mm]': layer_height,
        'print_speed [mm/s]': print_speed,
        'nozzle_temperature [°C]': nozzle_temperature,
        'bed_temperature [°C]': bed_temperature,
        'filament_diameter [mm]': filament_diameter,
        'failure_type': [failure_types[failure] for failure in machine_failures]  # Numeric failure type
    })


def generate_conveyor_belt_dataset(num_entries=10000):
    np.random.seed(4)
    conveyorID = [f"{i+1}" for i in range(num_entries)]
    belt_speed = np.round(np.random.normal(1.5, 0.1, num_entries), 2)
    load_weight = np.round(np.random.uniform(100, 500, num_entries), 2)
    motor_current = np.round(10 + (load_weight / 50), 2)
    belt_tension = np.round(200 + (load_weight * 0.5), 2)
    belt_alignment_offset = np.round(np.random.normal(0, 0.5, num_entries), 2)
    pulley_rotation_speed = np.round(belt_speed * 60, 2)
    ambient_temperature = np.round(np.random.normal(25, 2, num_entries), 2)

    # Failure types
    failure_types = {
        "No Failure": 0,
        "Belt Misalignment" : 1,
        "Motor Failure" : 2,
        "Pulley Wear" : 3,
        "Roller Seizing" : 4,
        "Tensioner Failure" : 5
    }

    failure_keys = list(failure_types.keys())
    machine_failures = np.random.choice(failure_keys, size=num_entries)

    return pd.DataFrame({
        'conveyorID': conveyorID,
        'belt_speed [m/s]': belt_speed,
        'load_weight [kg]': load_weight,
        'motor_current [A]': motor_current,
        'belt_tension [N]': belt_tension,
        'belt_alignment_offset [mm]': belt_alignment_offset,
        'pulley_rotation_speed [RPM]': pulley_rotation_speed,
        'ambient_temperature [°C]': ambient_temperature,
        'failure_type': [failure_types[failure] for failure in machine_failures]  # Numeric failure type
    })



# Example usage
cnc_dataset = generate_cnc_dataset()
injection_molding_dataset = generate_injection_molding_dataset()
lathe_dataset = generate_lathe_dataset()
printer_dataset = generate_3d_printer_dataset()
conveyor_dataset = generate_conveyor_belt_dataset()

# Save the datasets as CSV files
cnc_dataset.to_csv('./CSVs/cnc_machine_dataset.csv', index=False)
injection_molding_dataset.to_csv('./CSVs/injection_molding_machine_dataset.csv', index=False)
lathe_dataset.to_csv('./CSVs/lathe_machine_dataset.csv', index=False)
printer_dataset.to_csv('./CSVs/3d_printer_machine_dataset.csv', index=False)
conveyor_dataset.to_csv('./CSVs/conveyor_belt_dataset.csv', index=False)

print("Datasets generated and saved as CSV files.")
