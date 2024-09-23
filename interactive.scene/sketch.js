// Interactive Scene
// Evalina Maille
// 9/19/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let shape = circle();
let size = 50;

//setup?
function setup() {
  createCanvas(windowWidth, windowHeight);
}


//the actual drawing 
function draw() {
  background(255);
  noStroke();
  shape; 
}

//Change in size of the pen when mouse wheel is scrolled 
function mouseWheel() {
  if (event.delta >0 ){
    size += 5;
  }
  else{
    size-+ 5;
  }
}


//Changing shapes when a key is pressed 
function keyPressed(){
  if (key = "c"){
    shape = circle(mouseX, mouseY, size)
  }
  if (key = "s"){
    shape = rect(mouseX, mouseY, size, size)
  }
  if (key = "t"){
    shape = triangle(mouseX, mouseY, mouseX+size, mouseY, mouseX+(size/2), mouseY+size)
  }
}

