# My Project

### Introduction
Using the Ultrasonic sensor to control colors and sizes of two circles on the canvas. Code was hindered substantially by tech limitations (incredible lag despite attempts to change lerp values)


### Key Code
```js
      targetSize = float(sensorVal);
      // last value in lerp() controls speed of change
      circleSize = lerp(circleSize, targetSize, 0.1);
```

primitive way to change circle color:

```js
 ellipse(width / 2, height / 2, circleSize);
  fill(circleSize*2,circleSize*3,circleSize*4);
  pop();

  push();
  ellipse(width/3, height/2, circleSize/2)
  fill(circleSize*4,circleSize*2,circleSize);
  pop();
  ```

