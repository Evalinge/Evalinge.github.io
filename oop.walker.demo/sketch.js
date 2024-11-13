// Obect Oriented Programing walker demo 
// 11/13/2024

class Walker {
  constructor(x, y, theColour) {
    this.x = x;
    this.y = y;
    this.speed = 8;
    this.radius = 3; 
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

let luc;
let evalina; 
let nathan;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  luc = new Walker(width/2, height/2, "blue");
  evalina = new Walker(width/4, height/2, "deeppink");
  nathan = new Walker(width/3, height/2, "purple");
}

function draw() {
  luc.move(); 
  luc.display(); 
  evalina.move(); 
  evalina.display(); 
  nathan.move(); 
  nathan.display(); 
}

