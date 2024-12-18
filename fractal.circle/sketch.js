// Fractal Circle Demo
// Using recursion - (a function that calls itself)

function recursiveCircle(x, y, radius){
  circle(x, y, radius*2);
  //exit clause
  if (radius>30){
    recursiveCircle(x-radius/2, y, radius/2);
    recursiveCircle(x+radius/2, y, radius/2);
    recursiveCircle(x, y-radius/2, radius/2);
    recursiveCircle(x, y+radius/2, radius/2);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  recursiveCircle(width/2, height/2, mouseX+mouseY);
}
