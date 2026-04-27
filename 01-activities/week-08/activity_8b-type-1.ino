// DM2008 — Activity 8b
// Type 1: Phototransistor Sensor (10 min)
//
// Upload this sketch, then open the Serial Monitor (Tools > Serial Monitor)
// to watch live light readings from your sensor.
//
// Try covering the sensor or shining a light on it — watch the numbers change.

const int lightPin = A0; // SIG connected to analog pin A0

void setup() {
  Serial.begin(9600); // start communication with your computer at 9600 baud
}

void loop() {
  int luxVal = analogRead(lightPin); // read light level (0 = dark, 1023 = bright)
  Serial.println(luxVal);            // print the value to the Serial Monitor
  delay(100);                        // slow down the output so it's easier to read
}