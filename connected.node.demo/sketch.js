// Connected Nodes Demo
// Evalina Maille

let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnPoint(width/2, height/2);  
  background(0);
}

function spawnPoint(x, y){
  let somePoint = new MovingPoint(x,y); 
  points.push(somePoint); 
}

function draw() {
  //background(0);
  //move and draw lines
  for (let point of points){
    point.update(points);
  }
  //draw circles so they show up on top
  
  for (let point of points){
    //point.display();
  }
}


function mousePressed(){
  spawnPoint(mouseX, mouseY);
}

class MovingPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.radius = 25; 
    this.colour = color(random(255), random(255), random(255));
    this.xTime = random(0, 1000);
    this.yTime = random(0, 1000);
    this.deltaTime = 0.01; 
    this.reach = 250;
    this.minRadius = 15;
    this.maxRadius = 50; 
  }
  display(){
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, this.radius*2);
  }
  
  update(thePoints){
    this.move();
    this.wrapAroundScreen();
    this.connectTo(thePoints);
    this.adjustSizeWithMouse();
  }

  adjustSizeWithMouse(){
    let mouseDistance = dist(this.x, this.y, mouseX, mouseY);
    if (mouseDistance < this.reach){
      let theSize = map(mouseDistance, 0, this.reach, this.maxRadius, this.minRadius); 
      this.radius = theSize;
    }
    else {
      this.radius = this.minRadius;
    }
  }

  move(){
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    //scale to the movement speed
    this.dx = map(dx,0, 1, -this.speed, this.speed);
    this.dy = map(dy, 0, 1, -this.speed, this.speed);

    //move point
    this.x += this.dx;
    this.y += this.dy;

    //increment on the time axis
    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }

  wrapAroundScreen(x, y){
    //Teleport across the screen if you fall off
    if (this.x - this.radius < 0){
      this.x = width - this.radius;
    }
    if (this.x +this.radius > width){
      this.x = this.radius;
    }
    if (this.y + this.radius > height){
      this.y = this.radius;
    }
    if (this.y - this.radius < 0){
      this.y = height - this.radius;
    }
  }

  connectTo(pointsArray){
    for (let otherPoint of pointsArray){
      //avoid drawing line to self 
      if (this !== otherPoint){
        let pointDistance = dist(this.x, this.y, otherPoint.x, otherPoint.y);
        if (pointDistance < this.reach){
          stroke(this.colour); 
          line(this.x, this.y, otherPoint.x, otherPoint.y);
        }
      }
    }
  }

}