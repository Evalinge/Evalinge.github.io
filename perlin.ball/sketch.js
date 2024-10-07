// Perlin Noise Ball

let x;
let y;
let time = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
}

function draw() {
  background(220);

  x = noise(time)*width;
  y = noise(time+2000) *height;
 // y = random(0, height);

  circle(x, y, 50);

  time +=.01;
}
