import cv2
from pyzbar.pyzbar import decode
import serial
import time
from contract_interact import authenticate_company_product  # Importing the authenticate function

# Set up serial communication with ESP32
esp32 = serial.Serial('COM6', 115200, timeout=2)  # Adjusted to match ESP32
time.sleep(2)
 # Adjust COM port to your setup
esp32.flush()
  # Allow time for ESP32 to initialize

def scan_qr_code():
    cap = cv2.VideoCapture(1)  # Try adjusting this index if needed

    if not cap.isOpened():
        print("Error: Could not open the camera.")
        return

    manufacturer = "MIT"  # Hardcoded manufacturer

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

                try:
                    # Convert qr_data to an integer as required by the contract
                    product_id = int(qr_data)

                    # Authenticate the product using product_id (as uint256) and manufacturer
                    if authenticate_company_product(product_id, manufacturer):  # Using product_id
                        esp32.write(b'green\n')  # Signal green light
                        print("Authentication successful: Green light")
                    else:
                        esp32.write(b'red\n')  # Signal red light
                        print("Authentication failed: Red light")

                    # Receive response from ESP32
                    response = esp32.readline().decode('utf-8').strip()
                    print(f"ESP32 Response: {response}")

                except ValueError:
                    print(f"Error: QR data '{qr_data}' is not a valid product ID (integer).")
                    esp32.write(b'red\n')  # Signal red light for invalid QR code

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
