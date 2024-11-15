// Obect Oriented Programing walker array demo 
// 11/13/2024

class Walker {
  constructor(x, y, theColour) {
    this.x = x;
    this.y = y;
    this.speed = 25;
    this.radius = 10; 
    this.colour = theColour; 
  }
  display() {
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, this.radius*2);
  }
  move(){
    let choice = random(100);
    if (choice <25){
      this.y -= this.speed;
    }
    else if (choice < 50){
      this.y += this.speed; 
    }
    else if (choice < 75){
      this.x -= this.speed; 
    }
    else {
      this.x += this.speed;
    }
  }
}

let walkerArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  let luc = new Walker(width/2, height/2, "lightblue");
  walkerArray.push(luc);
}

function draw() {
  for (let theWalker of walkerArray){
    theWalker.move(); 
    theWalker.display(); 
  }
}


function mousePressed(){
  let randomColour = color(random(255), random(255), random(255));
  let someWalker = new Walker(mouseX, mouseY, randomColour);
  walkerArray.push(someWalker);
}
