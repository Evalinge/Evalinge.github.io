// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let greenOn = true;
let yellowOn = false;
let redOn = false;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  whatColour()
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function whatColour(){
  if (greenOn){
   fill("limegreen");
   top;
  }
  if (yellowOn){
    fill("yellow"){
      middle;
    }
  if (redOn){
    fill('red');
    bottom;
  }
  }
}