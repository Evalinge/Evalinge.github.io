//Image demo Sep 23 2024

let patrick;

function preload(){
  patrick = loadImage("patrick.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  image(patrick, mouseX, mouseY, patrick.width*2, patrick.height*2);
}
