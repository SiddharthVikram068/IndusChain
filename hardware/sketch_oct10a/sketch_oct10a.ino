#define RED_LED_PIN 23
#define GREEN_LED_PIN 21

void setup() {
  // Initialize serial communication at 115200 baud rate
  Serial.begin(115200);
  Serial.setTimeout(2000);

  // Initialize the GPIO pins for LEDs
  pinMode(RED_LED_PIN, OUTPUT);
  pinMode(GREEN_LED_PIN, OUTPUT);

  // Start with LEDs off
  digitalWrite(RED_LED_PIN, LOW);
  digitalWrite(GREEN_LED_PIN, LOW);
  digitalWrite(RED_LED_PIN, HIGH);  // Turn ON Red LED
delay(2000);  // Keep it on for 2 seconds
digitalWrite(RED_LED_PIN, LOW);   // Turn it OFF after 2 seconds

}

void loop() {
  // Check if data is available to read
  if (Serial.available() > 0) {
    String data = Serial.readString();  // Read the incoming data as a string
    Serial.print("Received data: ");
    Serial.println(data);  // Print the received data for debugging
    data.trim(); 

    // Check for specific data and turn on LEDs accordingly
    if (data == "red") {
      digitalWrite(RED_LED_PIN, HIGH);  // Turn ON Red LED
      digitalWrite(GREEN_LED_PIN, LOW);  // Turn OFF Green LED
    } else if (data == "green") {
      digitalWrite(RED_LED_PIN, LOW);   // Turn OFF Red LED
      digitalWrite(GREEN_LED_PIN, HIGH);  // Turn ON Green LED
    } else {
      // Turn off both LEDs if unrecognized data is received
      digitalWrite(RED_LED_PIN, LOW);
      digitalWrite(GREEN_LED_PIN, LOW);
    }
  }
}
