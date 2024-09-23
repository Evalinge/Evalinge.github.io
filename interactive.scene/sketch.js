// Interactive Scene
// Evalina Maille
// 9/19/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let size = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  noStroke();
}

//Change in size of the pen 
function mouseWheel() {
  if (event.delta >0 ){
    size += 5;
  }
  else{
    size-+ 5;
  }
}

function pen() {
  if (mouseIsPressed){
    let isDrawing = true;
  }
  else {
    isDrawing = false;
  }
}

