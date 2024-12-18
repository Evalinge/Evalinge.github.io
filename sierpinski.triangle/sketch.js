// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let initialTriangle = [
  {x: 250, y: 50,},
  {x: 50, y:300},
  {x:500, y:300}
];

let theDepth = 0;
let theColours = ['blue', 'green', 'yellow', 'red', 'turquoise', 'purple', 'black', 'white'];

function mousePressed(){
  theDepth++;
}

function sierpinski(points, depth){
  noStroke();
  fill(theColours[theDepth]);
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);
  if (depth > 0){
    sierpinski([points[0],midpoint(points[0], points[1]), midpoint(points[0], points[2])]);

  }
}

function midpoint(point1, point2){
  let midx = (point1.x + point2.x)/2;
  let midy =(point1.y+point2.y)/2;
  return midx, midy;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  sierpinski(initialTriangle, theDepth);
}
