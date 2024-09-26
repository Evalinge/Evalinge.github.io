// Interactive Scene
// Evalina Maille
// 9/19/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let theSize = 25;
let theShape;
let colPicker;

//setup?
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
}


//the actual drawing 
function draw() {
  colPicker = createColorPicker("#000000".color());
  colPicker.position(10, 50);
  // Drawing a header with info 
  fill(160);
  rect(0, 0, width, height/10);
  
  noStroke();
  fill(colPicker.color());
  keyPressed();
}

//Change in size of the pen when mouse wheel is scrolled 
function mouseWheel() {
  if (event.delta >0 ){
    size += 5;
  }
  else{
    size-= 5;
  }
}


//Changing shapes when a key is pressed 
function keyPressed(){
  if (mouseIsPressed){
    if (key === "c"){
      circle(mouseX, mouseY, size);
    }
    if (key === "s"){
      rect(mouseX-size/2, mouseY-size/2, size, size);
    }
    if (key === "t"){
      triangle(mouseX, mouseY, mouseX+size, mouseY, mouseX+size/2, mouseY+size);
    }
    if (key === "e"){
      fill(255);
      circle(mouseX, mouseY, size);
    }
    else {
      fill(0);
    }
  }
}

