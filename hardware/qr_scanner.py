import cv2
from pyzbar.pyzbar import decode
import serial
import time
from contract_interact import authenticate_company_product  # Importing the authenticate function from auth.py

# Set up serial communication with ESP32
esp32 = serial.Serial('COM6', 9600, timeout=1)  # Adjust COM port to your setup
time.sleep(2)  # Allow time for ESP32 to initialize

def scan_qr_code():
    cap = cv2.VideoCapture(1)  # Try adjusting this index if needed

    if not cap.isOpened():
        print("Error: Could not open the camera.")
        return

    manufacturer = "MIT"  # Hardcoded manufacturing date

    try:
        while True:
            ret, frame = cap.read()
            if not ret or frame is None:
                print("Failed to grab frame, skipping...")
                continue

            # Decode QR codes
            decoded_objects = decode(frame)

            for obj in decoded_objects:
                qr_data = obj.data.decode("utf-8")
                print(f"QR Code detected: {qr_data}")

                # Authenticate the product using qr_data (product_id) and manufacturing_date
                if authenticate_company_product(qr_data, manufacturer):
                    esp32.write(b'1')  # Signal green light
                    print("Authentication successful: Green light")
                else:
                    esp32.write(b'0')  # Signal red light
                    print("Authentication failed: Red light")

            cv2.imshow("QR Code Scanner", frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    except KeyboardInterrupt:
        print("Exiting...")

    finally:
        cap.release()
        cv2.destroyAllWindows()

if __name__ == "__main__":
    scan_qr_code()
