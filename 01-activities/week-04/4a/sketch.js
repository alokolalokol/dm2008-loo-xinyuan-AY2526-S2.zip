// DM2008 – Activity 4a
// Bake a Cookie (30 min)

let cookie;

function setup() {
  createCanvas(400, 400);
  noStroke();

  // Step 3: make one cookie object
  cookie = new Cookie("chocolate", 80, width/2, height/2);
  cookie2 = new Cookie("oatmeal",70, width/3,height/3)
}

function draw() {
  background(230);

  // Step 4: call the cookie’s show() method
  cookie.show();
  cookie2.show()
}

// Step 1: define the Cookie class
class Cookie {
  constructor(flavor, sz, x, y) {
    // set up required properties
    this.flavor = flavor;
    this.sz = sz
    this.x = x
    this.y =y
    
 
  }

  // Step 2: display the cookie
  show() {
    
    switch (this.flavor) {
      case "chocolate":
        fill(196, 146, 96);
        break;
      case "oatmeal":
        fill(220, 180, 120);
        break;
      case "strawberry":
        fill(220,30,40)
        break;
        
    }
    ellipse(this.x, this.y, this.sz);
    fill(60);
    const s=this.sz*0.2
    ellipse(this.x-s,this.y-s,s)
    ellipse(this.x+s,this.y+s,s)
    ellipse(this.x-0.5*s,this.y+0.5*s,s)
  }

  // Steps 5 & 6: Implement additional methods here
}

// Step 5: add movement (keyboard arrows)



function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
   cookie.x = cookie.x + 10
  }
  
  if (keyCode === UP_ARROW) {
   cookie.y = cookie.y - 10
  }
   if (keyCode === DOWN_ARROW) {
   cookie.y = cookie.y + 10
  }
    
  if (keyCode === LEFT_ARROW) {
    cookie.x = cookie.x-10
  }
  if (cookie.x > width ||cookie.x<0) {
  cookie.x = width/2;}
  if (cookie.y > height ||cookie.y<0) {
  cookie.y = height/2;}

}







// Step 6: add flavor randomizer (mouse click)
function mousePressed() {
  
  let mixedflavor = ["strawberry","chocolate","oatmeal"]
  cookie.flavor = random(mixedflavor)
}


