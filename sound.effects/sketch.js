//sound effects demo
let bgMusicLoop;
let clickSound;


function preload(){
  bgMusicLoop = loadSound("bgmusic.mp3");
  clickSound = loadSound("potPickup.ogg"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}


function keyPressed(){
  if (!bgMusicLoop.isPlaying()){
    bgMusicLoop.loop();
  }
}

function mousePressed(){
  clickSound.play();
}