// Evalina Maille
// Array and Object Notation Assignment 
// No working Extra for Experts. 

let someEllipse;
let ground = [];
const NUMBER_OF_ELLIPSES = 1250;
let biker;
let bikeX0; 


function preload(){
  biker = loadImage("bike.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bikeX = width - biker.width/2
  // This runs much faster, but looks bad. 
  showGround(); 
 
}

//display biker and show ground, this was to fix the way the biker is displayed
//Unfortunately it also makes it incredibly slow. 
function draw() {
  // This will run slowly, but hides the trail that the biker leaves behind
  // showGround();  
  displayBiker();
}


//Terrain Generation using perlin noise 
function generateGround(howWide){
  let time = 0;
  let deltaTime = 0.007;
  for (let x = 0; x<width; x+= howWide){
    let someHeight = noise(time)*height + biker.height/4;
    let someEllipse = spawnEllipse(x, someHeight, howWide);
    ground.push(someEllipse);
    time+= deltaTime;
  };
}

//Function to be used in terrain generation - uses object notation 
function spawnEllipse(leftAt, theHeight, theWidth){
  let theEllipse = {
    x: leftAt,
    y: height - theHeight,
    w: theWidth,
    h: theHeight,
  };
  return theEllipse;
}

//Display the image of the biker
function displayBiker(){
  imageMode(CORNER);
  console.log(ground[bikeX].y + ground[bikeX].h/4+biker.height/4);
  image(biker, bikeX, ground[bikeX].y - ground[bikeX].h/4+biker.height/4, biker.width/4, biker.height/4);
  keyPressed();
  if (bikeX <= 0){
    aWidth = width/NUMBER_OF_ELLIPSES;
    generateGround(aWidth);
    bikeX = width - 10;
  };
}

//Define what happens when user clicks left or right arrow
function keyPressed(){
  if (keyIsPressed){
    if (keyCode === LEFT_ARROW){
      bikeX -= 5;
    }
    if (keyCode === RIGHT_ARROW){
      bikeX +=5;
    };
  };
}

function showGround(){
  let aWidth = width/NUMBER_OF_ELLIPSES;
  generateGround(aWidth);
  background(220);
  //Drawing the terrain 
  for (let someEllipse of ground){
    ellipse(someEllipse.x, someEllipse.y, someEllipse.w, someEllipse.h);
    ellipse(someEllipse.x, someEllipse.y, someEllipse.w, someEllipse.h);
  };
}