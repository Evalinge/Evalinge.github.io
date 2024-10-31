// 2D Array Assignment 
// October 28, 2024 
// 

const GRID_SIZE = 20; 
const EMPTY_TILE = 0;
const LASER = 1; 
const DIAMOND = 2; 
const MASK = 3; 

let shouldToggleNeighbours = false;
let cellSize; 
let grid; 
let coveringGrid;
let gemCounter = 0;


function preload(){
  theHole = loadImage("BlackGroundHole.png");
  floorTile = loadImage("FloorTile.jpg");
  theGem = loadImage("greenGem.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  if (height<width){
    cellSize = height/GRID_SIZE;
  }
  else{
    cellSize = width/GRID_SIZE;
  }
  grid = createGrid(GRID_SIZE, GRID_SIZE);
  coveringGrid = createCoveringGrid(GRID_SIZE, GRID_SIZE);
}

function draw() {
  background(220);
  showGrid();
  showCoveringGrid(); 
}

function createGrid(rows, cols){
  let newGrid = []; 
  for (let y = 0; y < cols; y++){
    newGrid.push([]);
    for (let x = 0; x < rows; x++){
      if (random(0, 100) <= 15){
        newGrid[y].push(LASER);
      }
      else if (random(0, 100) > 15 && random(100) <= 25){
        newGrid[y].push(DIAMOND);
      }
      else{
        newGrid[y].push(EMPTY_TILE);
      }
    }
  }
  return newGrid;
}

function showGrid(){
  for (let y = 0; y<GRID_SIZE; y++) {
    for (let x = 0; x<GRID_SIZE; x++){
      if (grid[y][x] === LASER){
        noFill();
        image(floorTile, x*cellSize, y*cellSize, cellSize, cellSize);
        image(theHole, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === EMPTY_TILE){
        noFill();
        image(floorTile, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      else if(grid[y][x] === DIAMOND){
        noFill();
        image(floorTile, x*cellSize, y*cellSize, cellSize, cellSize);
        image(theGem, x*cellSize, y*cellSize, cellSize, cellSize); 
      }
      
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}

function createCoveringGrid(rows, cols){
  let newCoveringGrid = []; 
  for (let y = 0; y < cols; y++){
    newCoveringGrid.push([]);
    for (let x = 0; x < rows; x++){
      newCoveringGrid[y].push(MASK);
    }
  }
  return newCoveringGrid;
}


function showCoveringGrid(){
  for (let y = 0; y<GRID_SIZE; y++) {
    for (let x = 0; x<GRID_SIZE; x++){
      if (coveringGrid[y][x] === MASK){
        fill("lightgray"); 
      }
      else if (coveringGrid[y][x] !== MASK){
        noFill(); 
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}


function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  if (mouseButton === LEFT){
  //toggle self
    toggleCell(x, y);

    //toggle neighbours
    if (shouldToggleNeighbours) {
      toggleCell(x + 1, y);
      toggleCell(x - 1, y);
      toggleCell(x, y + 1);
      toggleCell(x, y - 1);
    }
    if (coveringGrid[y][x] === DIAMOND){
      grid[y][x] = EMPTY_TILE;
      gemCounter += 1;
    }
  }
}

function toggleCell(x, y) {
  //make sure the cell you're toggling is in the grid
  if (x >= 0 && y >= 0 && x < GRID_SIZE && y < GRID_SIZE) {
    if (coveringGrid[y][x] === MASK) {
      coveringGrid[y][x] = grid[y][x];
    }
  }
}