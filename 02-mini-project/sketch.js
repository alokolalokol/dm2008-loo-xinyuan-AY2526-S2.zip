// DM2008 — Mini Project
// PONG (Starter Scaffold)

// Notes for students:
// 1) Add paddle controls (W/S and ↑/↓) inside handleInput()
// 2) Add scoring + reset when the ball goes past a paddle
// 3) (Optional) Add win conditions / start + game-over states

/* ----------------- Globals ----------------- */
let leftPaddle, rightPaddle, ball;

let leftScore=0, rightScore=0

let startgame=false


function preload() {
bgm = loadSound("assets/bgm.mp3");
scoreblip = loadSound("assets/score.mp3")
boopsound = loadSound("assets/boop.mp3")
}

/* ----------------- Setup & Draw ----------------- */
function setup() {
  createCanvas(640, 360);
  noStroke();
  bgm.loop()


  
  // paddles: x, y, w, h
  leftPaddle  = new Paddle(30, height/2 - 30, 10, 60);
  rightPaddle = new Paddle(width - 40, height/2 - 30, 10, 60);
  
  // ball starts center (studewnts: make it move by uncommenting code in Ball constructor)
  ball = new Ball(width/2, height/2, 8);
}
  

function keyPressed(){
  if (keyCode === 32){
    startgame=true;
    bgm.pause()
  }
}


function draw(){
  if (startgame == false){
    background(18)
    fill(255,255,255)
   textAlign(CENTER);
    textSize(40)
   text('PONG THE GAME',width/2,height/2)
    textSize(20)
   text('press space to start',width/2, height/3*2)
    
  }
  else{
  
  background(18);
  
  // 1) read input (students: add paddle movement here)
  handleInput();
  
  // 2) update world
  leftPaddle.update();
  rightPaddle.update();
  ball.update();
  
  // 3) handle collisions
  ball.checkWallBounce();                // top & bottom
  ball.checkPaddleBounce(leftPaddle);
  ball.checkPaddleBounce(rightPaddle);
  
  // 4) draw everything
  drawCourt();
  leftPaddle.show();
  rightPaddle.show();
  ball.show();
  showleftScore();
  showrightScore();
  if (leftScore==10|| rightScore==10){
      endGame();
  }
}
}


function endGame() {
  if (leftScore>rightScore){
        textAlign(CENTER);
        text('left wins',width/2, height/2);
        ball.pos.set(width/2, height/2);
        ball.vel.set(0,0)   
    }
  if (rightScore>leftScore){
        textAlign(CENTER);
        text('right wins',width/2, height/2);
        ball.pos.set(width/2, height/2);
        ball.vel.set(0,0)
        }
  textAlign(CENTER);
    textSize(20)
    text('press space to restart', width/2, height/3*2)

if (keyIsPressed===true){
  if (keyCode === 32){
      leftScore=0
      rightScore=0
      ball.reset()}

}

}
/* ----------------- Input ----------------- */
function handleInput() {
  // TODO (students): move paddles based on key presses
  // Hints:
  // - Use keyIsDown(87) for W, keyIsDown(83) for S (left paddle)
  // - Use keyIsDown(UP_ARROW), keyIsDown(DOWN_ARROW) (right paddle)
  // - Set paddle.vy to positive (down) or negative (up) values
  // Read up on keyIsDown() in the p5js Reference
  // 
  // Example:
  if (keyIsDown(87)) { leftPaddle.vy = -leftPaddle.speed; }      // W key
  if (keyIsDown(83)) { leftPaddle.vy = leftPaddle.speed; }       // S key
  if (keyIsDown(UP_ARROW)) { rightPaddle.vy = -rightPaddle.speed; }
  if (keyIsDown(DOWN_ARROW)) { rightPaddle.vy = rightPaddle.speed; }
}

function keyReleased() {
  // Stop paddles when keys are released
  // (Students: this works automatically once you add handleInput controls)
  leftPaddle.vy  = 0;
  rightPaddle.vy = 0;
}




/* ----------------- Classes ----------------- */
class Paddle {
  constructor(x, y, w, h) {
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
    this.vy = 0;     // current velocity (students will change this via input)
    this.speed = 5;  // how fast the paddle moves
  }
  
  update() {
    // basic vertical movement; constrained to canvas
    this.pos.y += this.vy;
    this.pos.y = constrain(this.pos.y, 0, height - this.h);
  }
  
  show() {
    fill(220);
    rect(this.pos.x, this.pos.y, this.w, this.h, 2);
  }
}

class Ball {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    
    // separate speed components (easier for students to adjust)
    this.xSpeed = 4;  // horizontal speed (try 2-5)
    this.ySpeed = 2.0;  // vertical speed (try 1-4)
    
    this.vel = createVector(0, 0); // actual velocity vector
    
    // TODO (students): uncomment to start ball moving immediately
    this.vel.x = random([-1, 1]) * this.xSpeed;
    this.vel.y = random([-1, 1]) * this.ySpeed;
  }
  
  update() {
    this.pos.add(this.vel);
  }
  
  checkWallBounce() {
    // bounce off top/bottom walls
    if (this.pos.y - this.r <= 0 || this.pos.y + this.r >= height) {
      this.vel.y *= -1;
      this.pos.y = constrain(this.pos.y, this.r, height - this.r);
    }
    
    // TODO (students): detect when ball passes left or right edge
    // Add scoring and reset the ball to center
    // Hints:
    if (this.pos.x + this.r < 0) { 
      /* right player scores - add to their score */ 
      rightScore ++;
      scoreblip.play()
      this.reset();
    }
    if (this.pos.x - this.r > width) { 
      /* left player scores - add to their score */ 
      leftScore ++;
      scoreblip.play()
      this.reset();
      
    }
  }
  

  
  
  checkPaddleBounce(paddle) {
    // Box collision detection (simple & forgiving)
    const withinY = this.pos.y > paddle.pos.y && this.pos.y < paddle.pos.y + paddle.h;
    const withinX = this.pos.x + this.r > paddle.pos.x && this.pos.x - this.r < paddle.pos.x + paddle.w;
    
    if (withinX && withinY) {
      boopsound.play()
      // push ball out so it doesn't get stuck
      if (this.vel.x < 0) {
        this.pos.x = paddle.pos.x + paddle.w + this.r;
      } else {
        this.pos.x = paddle.pos.x - this.r;
      }
      this.vel.x *= -1; // reflect horizontally
      this.vel.y += (this.pos.y - paddle.pos.y - paddle.h/2) * 0.1 ;
      // TODO (students): add some angle variation based on where ball hits paddle
      // Hint: this.vel.y += (this.pos.y - paddle.pos.y - paddle.h/2) * 0.1;
    }
  }
  
  show() {
    fill(255, 170, 70);
    circle(this.pos.x, this.pos.y, this.r * 2);
  }
  
  reset() {
    // return ball to center and give it a random direction
    this.pos.set(width/2, height/2);
    
    // use the xSpeed and ySpeed properties for consistent behavior
    const xDir = random([-1, 1]); // randomly left or right
    const yDir = random([-1, 1]); // randomly up or down
    this.vel.set(xDir * this.xSpeed, yDir * this.ySpeed);
  }


   

}

/* ----------------- UI helpers ----------------- */


function drawCourt() {
  // center line (dashed)
  stroke(80);
  strokeWeight(2);
  for (let y = 10; y < height; y += 18) {
    line(width/2, y, width/2, y + 8);
  }
  noStroke();
}

function showleftScore(){
  fill(255,255,255)
  textSize(40)
  text(leftScore,width/3,60)
}
function showrightScore(){
  fill(255,255,255)
  textSize(40)
  text(rightScore,width/3*2,60)
}



