// DM2008 — Activity 8b
// Type 3: Ultrasonic Sensor (10 min)
//
// Upload this sketch, then open the Serial Monitor to see live distance readings in cm.
// Move your hand closer and further from the sensor — watch the numbers change.

const int ultraPin = A0;  // sensor connected to analog pin A0

void setup() {
  Serial.begin(9600);
}

void loop() {
  int duration = analogRead(ultraPin);             // raw reading from the sensor
  float distanceCM = (duration * 520.0) / 1023.0;  // convert to centimeters

  // Clamp to the sensor's reliable range
  if (distanceCM < 2) {
    distanceCM = 2;
  }
  if (distanceCM > 500) {
    distanceCM = 500;
  }

  // Print label and value on the same line, then move to the next line
  Serial.print("Distance: ");
  Serial.print(distanceCM, 1);
  Serial.println(" cm");

  delay(100);
}