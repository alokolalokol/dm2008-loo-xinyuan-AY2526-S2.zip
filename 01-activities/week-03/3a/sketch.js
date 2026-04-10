// DM2008 — Activity 3a
// (Array Sampler, 25 min)

// 1. Create an array of colors (or other values)
//    You can make more than one array if you'd like
let palette = ["#f06449", "#009988", "#3c78d8", "#ffeb3b"];

// 2. A variable to track the current index
let currentIndex = 0;


function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(220);

  // 3. Use the array value at currentIndex
  fill(palette[currentIndex]);
  ellipse(width/2, height/2, 200);
}

function keyPressed () {
  if (key == "1"){
    palette.push(color(random(255),random(255),random(255)))
  }
  if (key=="2"){
    currentIndex++;
    if (currentIndex >= palette.length)
      currentIndex=0
  }
  if (key=="3"){
    if (palette.length > 1){
      palette.splice(currentIndex,1)
      currentIndex--
      if (currentIndex=0){
        currentIndex=[palette.length]
      }
    }
    
    
  }
}


  // Log in the console to check
  console.log("Current index:", currentIndex, "→", palette[currentIndex]);


  





/* 
TODOs for students:
1. Replace colors with your own data (positions, text, sizes, etc).
2. Try mousePressed() instead of keyPressed().
3. Use push() to add new items, or splice() to remove them, then check how the sketch adapts.
4. Try looping through an array to visualize all the items within it instead of accessing one item at a time.
*/