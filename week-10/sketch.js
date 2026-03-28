let sizeSlider, shapeSelect, colorPicker, resetButton;
let colorHistory = [];
let sizeHistory = [];
let shapeHistory = [];
let xHistory = [];
let yHistory = [];
let s;
let showtext = true



function setup() {
  createCanvas(640, 400);
  noStroke();
  textFont("Helvetica, Arial, sans-serif");
  
  

  // starting color
  shapeColor = color(random(255), random(255), random(255));

  colorPicker = createColorPicker("red")
  colorPicker.position(16, 16)
  

  // Slider: controls size
  createP("Size").position(0, 50).style("margin", "4px 0 0 16px");
  sizeSlider = createSlider(20, 220, 100, 1);
  sizeSlider.position(15, 70);

  // Dropdown: choose shape
  createP("Shape").position(0, 100).style("margin", "8px 0 0 16px");
  shapeSelect = createSelect();
  shapeSelect.position(16, 130);
  shapeSelect.option("ellipse");
  shapeSelect.option("rect");
  shapeSelect.option("triangle");

  //reset canvas button
  resetButton = createButton("Reset Canvas")
  resetButton.position(15,height - 45)
  resetButton.mousePressed(resetCanvas)

  function resetCanvas(){
    colorHistory = []
    shapeHistory = []
    sizeHistory = []
    xHistory = []
    yHistory = []
  }

 
 }


function draw() {
  background(240);
  
  //prompt to right click

  if (showtext === true) {
    textAlign(CENTER)
    textSize(12)
    text('rightclick to stamp shape',width/2,height/2,);
  }

  //stamp function
  function stampImage() {
    colorHistory.push(colorPicker.color())
    shapeHistory.push(shapeSelect.value())
    sizeHistory.push(s)
    xHistory.push(mouseX)
    yHistory.push(mouseY)
    
  }

  //rightclick to stamp, remove text prompt
  if (mouseIsPressed === true)  {
    if (mouseButton === RIGHT){
      showtext = false
      stampImage();
    }
  }

  if(colorHistory.length >= 1 && sizeHistory.length >= 1 && shapeHistory.length >= 1 && xHistory.length >= 1 && yHistory.length >= 1) {
  for (let i = 0; i < colorHistory.length; i++) {
  
    push();
      fill(colorHistory[i]);
      let x = xHistory[i];
      let y = yHistory[i];
      let szH = sizeHistory[i];
      let shpH = shapeHistory[i];
      
      
     if (shpH === "ellipse") {
      ellipse(x, y, szH, szH);
     } else if (shpH === "rect") {
      rectMode(CENTER);
      rect(x, y, szH, szH);
    } else if (shpH === "triangle") {
      // Note: for triangle, you'll want to translate to x, y first
      push();
        translate(x, y);
        triangle(-szH * 0.6, szH * 0.5, 0, -szH * 0.6, szH * 0.6, szH * 0.5);
      pop();
    }
    pop();
  }
}

  push();

  //changesize
  s = sizeSlider.value();

  //colorpick to change color
  fill(colorPicker.color());

  // draw chosen shape
  let choice = shapeSelect.value();

  if (choice === "ellipse") {
    ellipse(mouseX, mouseY, s, s);
  } else if (choice === "rect") {
    rectMode(CENTER);
    rect(mouseX, mouseY, s, s);
  } else if (choice === "triangle") {
    push();
    translate(mouseX, mouseY);
    triangle(-s * 0.6, s * 0.5, 0, -s * 0.6, s * 0.6, s * 0.5);
    pop();
  }
  pop();

//disable contextmenu (did a quick google search)
  document.oncontextmenu = function() {
    return false;
  }
 

}




