// 2D Array Assignment 
// October 28, 2024 
// 

const GRID_SIZE = 20; 
const EMPTY_TILE = 0;
const HOLE = 1; 
const DIAMOND = 2; 
const MASK = 3; 

let shouldToggleNeighbours = false;
let cellSize; 
let grid; 
let coveringGrid;
let gemCounter = 0;
let holes = 0;
let diamonds = 0;


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
  holes, diamonds = countStuff(GRID_SIZE, grid);
}

function draw() {
  background(220);
  showGrid();
  showCoveringGrid(); 
  keyPressed();
}

function createGrid(rows, cols){
  let newGrid = []; 
  for (let y = 0; y < cols; y++){
    newGrid.push([]);
    for (let x = 0; x < rows; x++){
      if (random(0, 100) <= 20){
        newGrid[y].push(HOLE);
      }
      else if (random(0, 100) > 20 && random(100) <= 25){
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
      
      // Display based on state!
      if (grid[y][x] === HOLE){
        image(floorTile, x*cellSize, y*cellSize, cellSize, cellSize);
        image(theHole, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === EMPTY_TILE){
        image(floorTile, x*cellSize, y*cellSize, cellSize, cellSize);
        fill(0);if (holes > 0){
          text(holes, x*cellSize - cellSize/2, y*cellSize - cellSize/2);
        }
      }
      else if(grid[y][x] === DIAMOND){
        image(floorTile, x*cellSize, y*cellSize, cellSize, cellSize);
        image(theGem, x*cellSize, y*cellSize, cellSize, cellSize); 
        if (holes > 0){
          text(holes, x*cellSize - cellSize/2, y*cellSize - cellSize/2);
        }
      }
      noFill();
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
      textAlign(CENTER, CENTER);
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
    if (grid[y][x] === EMPTY_TILE || grid[y][x] === DIAMOND){
      toggleCell(x, y);
    }
    if (grid[y][x] === HOLE){
      
    }
  }
  if (coveringGrid[y][x] === DIAMOND && mouseButton === RIGHT){
    grid[y][x] = EMPTY_TILE;
    gemCounter += 1;
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


function keyPressed(){
  if (key === "u"){
    for (let y = 0; y<GRID_SIZE; y++) {
      for (let x = 0; x<GRID_SIZE; x++){
        coveringGrid[y][x] = grid[y][x];
      }
    }
  }
}

function countStuff(GRID_SIZE, theGrid){
  //look at every cell
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      //count it's neighbours
      let neighbours = 0;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          //don't fall of the edge
          if (y+i >= 0 && y+i < GRID_SIZE && x+j >= 0 && x+j < GRID_SIZE && theGrid[y+i][x+j] === HOLE) {
            holes += 1;
          }
          else if (y+i >= 0 && y+i < GRID_SIZE && x+j >= 0 && x+j < GRID_SIZE && theGrid[y+i][x+j] === DIAMOND) {
            diamonds += 1;
          }
        }
      }
    }
  }
  return holes, diamonds; 
}