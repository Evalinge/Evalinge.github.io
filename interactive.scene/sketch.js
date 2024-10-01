// Interactive Scene
// Evalina Maille
// 9/19/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let theSize = 25;
let theShape;
let colPicker;
let state = "start";

//setup?
function setup() {
  createCanvas(windowWidth, windowHeight);
}


//the actual drawing 
function draw() {
  startUp();
  // Drawing a header with info 
  isPainting();
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
      rect(mouseX-size/2, mouseY-size/2, theSize, theSize);
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

function startUp(){
  if (state === "start"){ 
  
    background(0); 
    fill(255);
    textAlign("center");  
    text(`Welcome to Paint
     Once you are ready to begin please press 'a'. 
     When you are painting you can use keys to control the shape of your pen. 
    's' for a square, 't' for a triangle, 'c' for a circle, and 'e' for the   eraser.
    To change the size of the pen, scroll the mouse wheel.`, width, height  );
    fill(0);
    if (mouseIsPressed && state === "start"){
      state = "painting";
    }
  }
}

function isPainting(){
  if (state === "painting"){
    
    background(255);
    colPicker = createColorPicker("black");
    colPicker.position(10, height/10/3);
    mouseWheel();
    fill(160);
    rect(0, 0, width, height/10);
    noStroke();
    fill(colPicker.color());
    keyPressed();
  }
}