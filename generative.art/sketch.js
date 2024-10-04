// Generative Art Demo
// Evalina Maille
// Oct 4, 2024

const TILE_SIZE = 5;
let tileArray = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let x=0; x< width; x+= TILE_SIZE){
    for (let y = 0; y<height; y+=TILE_SIZE){
      let someTile = spawnTile(x, y);
      tileArray.push(someTile); 
    }
  }
}

function draw() {
  background(0);
  //Display tile
  for (let myTile of tileArray){
    stroke(random(100, 255), random(100, 255), random (100, 255));
    line(myTile.x1, myTile.y1, myTile.x2, myTile.y2);
  }
}


function spawnTile(x, y){
  let tile;
  let choice = random(0, 100);

  if (choice<50){
    //Negative slope 
    tile = {
      x1: x - TILE_SIZE/2, 
      y1: y - TILE_SIZE/2, 
      x2: x + TILE_SIZE/2,
      y2: y + TILE_SIZE/2, 
    };
  }
  else{
    //Negative slope 
    tile = {
      x1: x - TILE_SIZE/2, 
      y1: y + TILE_SIZE/2, 
      x2: x + TILE_SIZE/2,
      y2: y - TILE_SIZE/2, 
    };
  }
  return tile; 
}