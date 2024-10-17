// Translation and rotation with images. 

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  
  push(); // save the transformation matrix
  translate(200, 200)
  rotate(mouseX); 
  fill("red")
  square(-50, -50, 100);

  fill("green");
  rect(0, height-300, width*2, 500);

  pop(); 
}
