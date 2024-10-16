// Arrays and Object Notation Assignment
// Evalina Maille
// 10/08/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let ground = [];
const NUMBER_OF_ELLIPSES = 1500;
const AG = -9.8;
let biker;
let bikeX;
let bikeY;
let dx;

function preload(){
  biker = loadImage("bike.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let aWidth = width/NUMBER_OF_ELLIPSES;
  generateGround(aWidth);
}

function draw() {
  background(220);

  for (let someEllipse of ground){
    ellipse(someEllipse.l, someEllipse.y, someEllipse.w, someEllipse.h);

  }
  
  displayBiker();
}


function generateGround(howWide){
  let time = 0;
  let deltaTime = 0.007;
  for (let x = 0; x<width; x+= howWide){
    let someHeight = noise(time)*height;
    let someEllipse = spawnEllipse(x, someHeight, howWide);
    ground.push(someEllipse);
    time+= deltaTime;
  }
}

function spawnEllipse(leftAt, theHeight, theWidth){
  let theEllipse = {
    l: leftAt,
    y: height - theHeight,
    w: theWidth,
    h: theHeight,
  };
}

function displayBiker(){
  image(biker, 50, 50, biker.width/4, biker.height/4);
  keyPressed();
}

function keyPressed(){
  if (keyCode === LEFT_ARROW){
    dx = 2;
    bikeX += dx;
  }
  if (keyCode === RIGHT_ARROW){
    dx = 2;
  }
}