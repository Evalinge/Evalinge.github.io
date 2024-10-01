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
  colPicker = createColorPicker("black");
  colPicker.position(10, height/10/3);
}


//the actual drawing 
function draw() {

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
    theSize += 5;
  }
  else{
    theSize-= 5;
  }
}


//Changing shapes when a key is pressed 
function keyPressed(){
  if (mouseIsPressed){
    if (key === "c"){
      circle(mouseX, mouseY, theSize);
    }
    if (key === "s"){
      rect(mouseX-theSize/2, mouseY-theSize/2, theSize, theSize);
    }
    if (key === "t"){
      triangle(mouseX, mouseY, mouseX+theSize, mouseY, mouseX+theSize/2, mouseY+theSize);
    }
    if (key === "e"){
      fill(255);
      circle(mouseX, mouseY, theSize);
    }
    else {
      fill(colPicker.color());
    }
  }
}
