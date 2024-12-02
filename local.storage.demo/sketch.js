// Local Storage Demo

let numberOfClicks = 0;
let highestClick; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (getItem("highest")){
    highestClick = getItem("highest");
  }
}

function draw() {
  background(220);
  displayClicks();
  displayHighest();
}

function displayHighest(){
  fill("green");
  textSize(75);
  text(highestClick, 400, height/2);
}

function displayClicks(){
  fill("black");
  textSize(75);
  text(numberOfClicks, 100, height/2);
}

function mousePressed(){
  numberOfClicks++;
  if (numberOfClicks > highestClick){
    highestClick = numberOfClicks;
    storeItem("highest", highestClick);
  }
}