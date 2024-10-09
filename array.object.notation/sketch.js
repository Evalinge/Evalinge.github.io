// Arrays and Object Notation Assignment
// Evalina Maille
// 10/08/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let someEllipse;
let ground = [];
const NUMBER_OF_ELLIPSES = 1500;
const AG = -9.8;
let biker;

function preload(){
  biker = loadImage("bike.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let aWidth = width/NUMBER_OF_ELLIPSES;
  generateGround(aWidth);
}

function draw() {
  background(220);

  for (let someEllipse of ground){
    ellipse(someEllipse.x, someEllipse.y, someEllipse.w, someEllipse.h);

  }
  
  image(biker, mouseX, mouseY, biker.width, biker.height);
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
    x: leftAt,
    y: height - theHeight,
    w: theWidth,
    h: theHeight,
  };
  return theEllipse;
}