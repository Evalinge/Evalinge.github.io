let someEllipse;
let ground = [];
const NUMBER_OF_ELLIPSES = 1500;
let biker;
let bikeX = 50; 


function preload(){
  biker = loadImage("bike.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let aWidth = width/NUMBER_OF_ELLIPSES;
  generateGround(aWidth);
  background(220);
}

function draw() {

  for (let someEllipse of ground){
    ellipse(someEllipse.x, someEllipse.y, someEllipse.w, someEllipse.h);
    ellipse(someEllipse.x, someEllipse.y, someEllipse.w, someEllipse.h);

  }
  
  displayBiker();
}


function generateGround(howWide){
  let time = 0;
  let deltaTime = 0.007;
  for (let x = 0; x<width; x+= howWide){
    let someHeight = noise(time)*height + biker.height/4;
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

function displayBiker(){
  imageMode(CENTER);
  image(biker, bikeX+biker.width/4/2, ground[bikeX].y+ground[bikeX].h/2, biker.width/4, biker.height/-4*-1);
  keyPressed();
  if (bikeX - biker.width/4 <= 0){
    bikeX = width - 10;
   }
}

function keyPressed(){
  if (keyIsPressed){
    if (keyCode === LEFT_ARROW){
      bikeX -= 5;
    }
    if (keyCode === RIGHT_ARROW){
      bikeX +=5;
    }
  }
}