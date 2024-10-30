// 2D Array Assignment 
// October 28, 2024 
// 

const GRID_SIZE = 40; 
let cellSize; 
let grid; 
let rows; 
let cols; 
const EMPTY_TILE = 0;
const LASER = 1; 
const DIAMOND = 2; 

function preload(){
  theLaser = loadImage("laser.png");
  
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
}

function draw() {
  background(220);
  showGrid();
}

function createGrid(GRID_SIZE, GRID_SIZE){
  let newGrid = []; 
  for (let y = 0; y < GRID_SIZE; y++){
    newGrid.push([]);
    for (let x = 0; x < GRID_SIZE; x++){
      if (random(0, 100) <= 25){
        newGrid[y].push(LASER);
      }
      else if (random(0, 100) > 25 && random(100) <= 40){
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
  for (let y = 0; y<GRID_SIZE; y++)
    for (let x = 0; x<GRID_SIZE; x++){
      if (grid[y][x] === LASER){
        image(theLaser, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === EMPTY_TILE){
        fill(0);
      }
      else if(grid[y][x] === DIAMOND){
        fill("blue"); 
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
