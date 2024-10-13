import cv2
from pyzbar.pyzbar import decode
import hashlib

# Function to hash the data
def hash_data(data):
    return hashlib.sha256(data.encode('utf-8')).hexdigest()

# Function to verify QR code integrity
def verify_qr_codes(qr_codes):
    data_set = set()

    for qr_code in qr_codes:
        # Decode the QR code
        decoded_data = qr_code.data.decode('utf-8')

        # Extract the actual data and the hash (assuming the format includes a hash)
        data, received_hash = decoded_data.rsplit('; Hash=', 1)

        # Verify the hash
        calculated_hash = hash_data(data)
        if calculated_hash != received_hash:
            return False  # QR code has been tampered with

        # Add the data (excluding hash) to the set
        data_set.add(data)

    # Check if all QR codes have the same data
    if len(data_set) == 1:
        return True  # All QR codes match and are valid
    else:
        return False  # Data mismatch between QR codes

# Start video capture
cap = cv2.VideoCapture(1)  # 0 for default camera, change if you have multiple cameras

if not cap.isOpened():
    print("Error: Could not open video.")
    exit()

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()
    if not ret:
        print("Error: Could not read frame.")
        break

    # Decode all QR codes in the frame
    qr_codes = decode(frame)

    # Verify the integrity of the QR codes if any are detected
    if qr_codes:
        if verify_qr_codes(qr_codes):
            print("All QR codes match and are valid.")
        else:
            print("Mismatch detected or tampering occurred.")

    # Display the resulting frame with rectangles around detected QR codes
    for qr_code in qr_codes:
        # Draw rectangle around the QR code
        points = qr_code.polygon
        if len(points) == 4:
            pts = [(point.x, point.y) for point in points]
            cv2.polylines(frame, [np.array(pts, dtype=np.int32)], isClosed=True, color=(0, 255, 0), thickness=2)
            # Put the decoded data as text
            cv2.putText(frame, qr_code.data.decode('utf-8'), (pts[0][0], pts[0][1]-10), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 1)

    # Show the frame
    cv2.imshow('QR Code Scanner', frame)

    # Break the loop on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the capture and close windows
cap.release()
cv2.destroyAllWindows()
