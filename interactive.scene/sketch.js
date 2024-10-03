// Interactive Scene
// Evalina Maille
// 9/19/2024
//
// Extra for Experts:
// In this project I tried tackling a few things, 
// one being the mouse wheel, for this you must create 
// a function. Then you can use the event.delta (delta 
// meaning change), and using that to reassign a variable. 
//Sadly I broke something while adding the state variable, 
// it seems to be reassigning itself and I cant find our where. 
// While other components worked in earlier versions, 
// my final version is not functional. S
let theSize = 25;
let theShape;
let colPicker;
let isPainting = false;


//setup?
function setup() {
  createCanvas(windowWidth, windowHeight);
  if (millis() < 8000){
    isPainting = false;
  }
  else{
    isPainting = true;
  }
  
}

//the actual drawing
function draw() {
  // Drawing a header with info
  
  if (isPainting === true){
    displayPainting();
    showHeader();
  }
  keyPressed();
  
  if (isPainting === false){
    displayStart();
  }
  if (isPainting === true){
    background(255);
  }
}

//Change in size of the pen when mouse wheel is scrolled
function mouseWheel() {
  //if (event.delta > 0) {
  //  theSize += 5;
  // } else {
  //  theSize -= 5;
  // }
}

//Changing shapes when a key is pressed
function keyPressed() {
  if (mouseIsPressed) {
    if (key === "c") {
      circle(mouseX, mouseY, theSize);
    }
    if (key === "s") {
      rect(mouseX - theSize / 2, mouseY - theSize / 2, theSize, theSize);
    }
    if (key === "t") {
      triangle(
        mouseX,
        mouseY,
        mouseX + theSize,
        mouseY,
        mouseX + theSize / 2,
        mouseY + theSize
      );
    }
    if (key === "e") {
      fill(255);
      circle(mouseX, mouseY, theSize);
    }
    else {
      fill(colPicker.color());
    }
  }
}

function displayText() {
  if (isPainting === false) {
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(24);
    text(
      `Welcome to "Poor Man's Paint", 
You can select what colour you 
would like in the upper left corner. 
You can change the shape of your pen 
by pressing certain keys!
Press "C" for a Circle, 
Press "T" for a Triangle, 
Press "S" for a Square, 
And press "E" to use the Eraser. 
To begin, click anywhere on the screen 
and press "C"`, width / 2, height / 2);
  }
  if (isPainting === true) {
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(24);
    text(hex(colPicker.color()));
    background(255);
  }
}

function displayStart() {
  background(0);
  displayText();
  keyPressed();
}
function displayPainting() {
  fill(colPicker.color());
  keyPressed();
  mouseWheel();
}

function showHeader(){
  colPicker = createColorPicker("black");
  colPicker.position(10, height / 10 / 3);
  fill(160);
  rect(0, 0, width, height / 10);
  noStroke();
  displayText();
}