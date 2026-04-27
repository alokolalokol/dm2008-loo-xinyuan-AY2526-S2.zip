// DM2008 — Activity 9a
// Mapping Sensors (30 min)
//
// Use map() to turn ultrasonic distance readings into LED brightness.
// The closer the object, the brighter the LED should be.
//
// Your job: declare an LED pin, set it up in setup(), and use analogWrite()
// to send the brightness value to your LED — remember it needs a PWM pin (~).
//
// Adjust and refine until the response feels smooth and natural.

const int usSensorPin = A0;
const float usMaxRange = 520.0;
const float dataSize = 1023.0;

float sensorVal, distVal;
int brightness = 0;

void setup() {
  Serial.begin(9600);
  // Set up your LED pin here
}

void loop() {
  sensorVal = analogRead(usSensorPin);
  distVal = sensorVal * usMaxRange / dataSize;

  // Clamp to the sensor's reliable range
  if (distVal < 2)   distVal = 2;
  if (distVal > 500) distVal = 500;

  // map() rescales a value from one range to another
  // here: distance (2–500cm) becomes brightness (0–255)
  brightness = map(distVal, 2, 500, 0, 255);
  brightness = constrain(brightness, 0, 255);

  // Use analogWrite() to send brightness to your LED pin
  // analogWrite(ledPin, brightness);

  Serial.print(distVal);
  Serial.println(" cm");
  Serial.print("Brightness: ");
  Serial.println(brightness);

  delay(500);
}