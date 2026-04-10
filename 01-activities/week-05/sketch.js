// DM2008 – Activity 5a
// Colliding Circles (30 min)

let balls = [];

function setup() {
  createCanvas(400, 400);

  // Step 1: create two Ball objects
  balls.push(new Ball(width/2, height/2));
  balls.push(new Ball(200, 200));
}

function draw() {
  background(230);

  // Step 2: update and display each ball
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.move();
    b.show();
    b.checkCollision(balls);

  }
}

class Ball {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.r = 30;
    this.vel = createVector(random(-2, 2), random(-2, 2));
  }

  move() {
    this.pos.add(this.vel);
    if (this.pos.x <= 0 + this.r || this.pos.x >= width - this.r){
      this.vel.x*=-1
    }
    if (this.pos.y <= 0 + this.r || this.pos.y >= height - this.r){
      this.vel.y*=-1
    }
  }

  show() {
    fill(100, 180, 220);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
  
  checkCollision(others) {
    for (let i = 0; i < others.length; i++) {
      // Make sure we do not compare the ball to itself
      if (others[i] !== this) {
        let other = others[i];
        let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if (d < this.r + other.r) {
          push()
          stroke(0,0,0)
          strokeWeight (4)
          fill(255,255,255)
          ellipse(this.pos.x,this.pos.y,this.r*2)
          
          pop()
    
    
    
  }
      
    }

}}}