// DM2008 — Activity 8a
// Type 3: Fade Control (10 min)
//
// Upload this sketch to fade your LED in and out using analogWrite().
// Unlike digitalWrite(), analogWrite() sends values from 0 (off) to 255 (full brightness).
// This works on PWM pins — look for the (~) symbol on your Arduino board.
//
// Try these:
// - What happens if you change fadeAmount?
// - What happens if you change the delay?
// - Can you make the LED pulse faster on the way up and slower on the way down?

int ledPin = 9;      // must be a PWM pin (~)
int brightness = 0;  // current brightness level (0–255)
int fadeAmount = 5;  // how much brightness changes each step

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  analogWrite(ledPin, brightness);

  brightness += fadeAmount;

  // When brightness hits 0 or 255, reverse the direction
  if (brightness <= 0 || brightness >= 255) {
    fadeAmount = -fadeAmount;
  }

  delay(30);
}