// DM2008 — Activity 8b
// Type 2: Force Sensor (10 min)
//
// The code is the same as the phototransistor — analogRead() works for any sensor
// that gives a range of values. Only the wiring and what you're measuring changes.
//
// Open the Serial Monitor and press the sensor — watch the numbers rise with pressure.
// Press gently, the sensor is sensitive!

const int forcePin = A0; // sensor connected to analog pin A0

void setup() {
  Serial.begin(9600);
}

void loop() {
  int forceVal = analogRead(forcePin); // read pressure (0 = none, 1023 = max)
  Serial.println(forceVal);
  delay(100);
}