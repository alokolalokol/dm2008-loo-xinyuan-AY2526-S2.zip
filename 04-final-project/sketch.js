
let lettersSoup = []
let textString = []
let colliders = [];
let idleTimer, gravity, myInput;


const idleTimeLimit = 1500


function setup() {
  createCanvas(400, 600);




  myInput = createInput();
  myInput.value("alphabet soup")
  myInput.style('font-size', '20px')
  myInput.style('font-family', 'Courier New')
  myInput.style('width', '380px')
  myInput.style('text-align', 'center')
  myInput.style('margin', '10px')




  gravity = createVector(0, 0.4);
  resetIdleTimer();
  textFont('Courier New')
  textStyle(BOLD)
  textAlign(CENTER, CENTER)
  // fill(50);
  textSize(20)
  textWrap(CHAR)


}
//on idle, split sentence into letters and push into the soup 
function onIdle() {

  let lettersTemp = split(myInput.value(), '')
  lettersSoup.push(...lettersTemp)    //use spread operator to open lettersTemp array and push into soup 

  if (lettersSoup.length > colliders.length) {
    let diff = lettersSoup.length - colliders.length;
    for (let i = 0; i < diff; i++) {
      //pass specific letters to the constructor (Gemini)
      let char = lettersSoup[colliders.length]
      colliders.push(new Collider(random(width), 50, char))
    }
  }
  else if (lettersSoup.length < colliders.length) {
    colliders.splice(lettersSoup.length);
  }

  if (myInput.value() == 'float') {
    gravity = createVector(0, -0.1)
    //reset Physics after 3 seconds
    setTimeout(function () {
      gravity = createVector(0, 0.5)
    }, 3000)
  }
  if (myInput.value() == 'boo') {
    for (let c of colliders)
      c.shake = true
    setTimeout(function () {
      for (let c of colliders)
        c.shake = false
    }, 2500)

  }

  if (myInput.value() == 'clear') {//gemini
    let clearTask = setInterval(function () {
      if (lettersSoup.length > 0) {
        // Remove the first element of both arrays
        lettersSoup.shift();
        colliders.shift();
      } else {
        // Once empty, stop the interval so it doesn't run forever
        clearInterval(clearTask);
      }
    }, 25); // Adjust this number for faster or slower disappearing


  }

  if (myInput.value() == 'glitch') {

    for (let c of colliders)
      c.letterShuffle = true
    setTimeout(function () {
      for (let c of colliders)
        c.letterShuffle = false
    }, 4000)
  }



  if (myInput.value() == 'skittles') {
    for (let c of colliders)
      c.rainbow = true
    setTimeout(function () {
      for (let c of colliders)
        c.rainbow = false
    }, 4000)
  }

  if (myInput.value() == 'jellybeans') {
    for (let c of colliders)
      c.jellybeans = true
    setTimeout(function () {
      for (let c of colliders)
        c.jellybeans = false
    }, 4000)
  }

  if (myInput.value() == 'boom') {
    for (let c of colliders)
      c.explodeBoolean = true
  }
  myInput.value('');

}





function draw() {
  background(240);
  newText();



  //idle timer
  if (keyIsPressed) {
    resetIdleTimer()
  }


  for (let i = 0; i < colliders.length; i++) {
    let c = colliders[i];
    c.applyForce(gravity)
    c.friction();
    c.show();
    c.update();
    c.edges();
    c.checkCollision(colliders)
    c.boo();
    c.glitch();
    c.jllybn();
    c.explode();
  }

}


// run onIdle once on every 3 seconds
function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(onIdle, idleTimeLimit)

}


function newText() {
  fill(50)
  text(myInput.value(), 10, 10, 380, 380)

}




//CLASSES
class Collider {
  constructor(x, y, char) {
    this.pos = createVector(x, y);
    this.r = 10
    this.char = char
    this.vel = createVector(random(-1, 1), random(-1, 1))
    this.acc = createVector(0, 0);
    this.mass = 1;
    this.bounceloss = 0.4      //kinetic energy loss
    this.shake = false
    this.letterShuffle = false
    this.rainbow = false
    this.jellybeans = false
    this.explodeBoolean = false
  }

  show() {
    noStroke();
    if (this.letterShuffle == true) {
      let styles = [BOLD, ITALIC, NORMAL]
      textStyle(random(styles))
    }
    else {
      textStyle(BOLD)
    }
    textAlign(CENTER, CENTER);
    textSize(this.r * 2);
    if (this.rainbow == true) {
      fill(random(255), random(255), random(255))
    }
    else {
      fill(50);
    }
    text(this.char, this.pos.x, this.pos.y)
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0)
    //Air resistance
    this.vel.mult(0.99)



  }


  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  friction() {
    let diff = height - (this.pos.y + this.r);
    if (diff < 1) {
      this.vel.mult(0.95);
      //stop moving if still
      if (this.vel.mag() < 0.2) {
        this.vel.set(0, 0);
      }
    }
  }

  edges() {
  
    //floor
    if (this.pos.y >= height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y *= -this.bounceloss
      //stop sliding on floor
      this.vel.x *= 0.8;
      //kill vertical velocity if not bouncing
      if (abs(this.vel.y) < 0.2)
        this.vel.y = 0;
    }
    //walls
    if (this.pos.x >= width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -this.bounceloss;

    } else if (this.pos.x <= this.r) {
      this.pos.x = this.r;
      this.vel.x *= -this.bounceloss;
    }
  }

  checkCollision(others) {
    for (let i = 0; i < others.length; i++) {
      if (others[i] !== this) {
        let other = others[i];
        let impactVector = p5.Vector.sub(other.pos, this.pos);
        let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if (d < this.r + other.r) {

          //push out the balls apart (coding train + gemini)
          let overlap = (this.r + other.r) - d
          let dir = impactVector.copy()
          dir.normalize();      ///set 
          
          dir.mult(overlap / 2);
          this.pos.sub(dir)
          other.pos.add(dir);

          d = this.r + other.r;
          //stop moving if still
          if (this.vel.mag() < 0.2) {
            this.vel.set(0, 0);
          }
          else {
            //elastic collision math(coding train)
            let vDiff = p5.Vector.sub(other.vel, this.vel)
            //Particle A
            let num = vDiff.dot(impactVector)
            let den = d * d;
            let deltaVA = impactVector.copy()
            deltaVA.mult(num / den);
            deltaVA.mult(this.bounceloss)
            this.vel.add(deltaVA)

            //Particle B
            let deltaVB = impactVector.copy()
            deltaVB.mult(-num / den);
            deltaVB.mult(this.bounceloss)
            other.vel.add(deltaVB)
          }



        }
      }
    }
  }

  boo() {
    let mag = random(-2, 2)
    if (this.shake == true) {
      this.pos.x += mag
      this.pos.y += mag
    }

  }

  glitch() {
    if (this.letterShuffle == true) {
      this.char = random(lettersSoup)
    }
  }

  jllybn() {
    let jump = createVector(random(1, -1), random(0, -10))

    if (this.jellybeans == true) {
      this.vel.add(jump)
      this.jellybeans = false
    }
  }

  explode() {
    if (this.explodeBoolean == true) {

      if (this.pos.x >= width / 2) {
        this.vel.x += random(10, 20)
      }
      else {
        this.vel.x -= random(10, 20)
      }
      if (this.vel.y >= height / 2) {
        this.vel.y += random(10, 20)
      }
      else {
        this.vel.y -= random(10, 20)
      }
      this.explodeBoolean = false

    }

  }

}








