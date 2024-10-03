// Bouncing Ball Demo
// Evalina Maille
// October 3, 2024
let ballArray = [];



function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 10; i++){
    spawnBall(width/2, height/2);
  }
}

function draw() {
  background(220);

  for (let someBall of ballArray) {
  // move ball
  someBall.x+=someBall.dx;
  someBall.y+=someBall.dy;

  // bounce ball
  if (someBall.x > width - someBall.r || someBall.x < 0 + someBall.r){
    someBall.dx = someBall.dx *-1;
  }
  if (someBall.y > height - someBall.r || someBall.y < 0 + someBall.r){
    someBall.dy = someBall.dy*-1;
  }
  // Display ball 
  noStroke();
  fill(someBall.red, someBall.green, someBall.blue,  someBall.alpha);
  circle(someBall.x, someBall.y, someBall.r*2);
}
}

function mousePressed(){
  spawnBall(mouseX, mouseY);
}

function spawnBall(theX, theY){
  let theBall = {
    x: theX,
    y: theY,  
    r: random(30, 70),
    dx: random(-5, 5), 
    dy: random(-5, 5), 
    red: random(0, 255), 
    green: random(0, 255), 
    blue: random(0, 255), 
    alpha: random(0, 255),
  };
  
ballArray.push(theBall);

}