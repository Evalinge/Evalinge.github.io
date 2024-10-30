// 2D Array Assignment 
// October 28, 2024 
// 

const GRID_SIZE = 20; 
const EMPTY_TILE = 0;
const LASER = 1; 
const DIAMOND = 2; 
const MASK = 3; 


let cellSize; 
let grid; 
let coveringGrid;
let isGridCovered;
let maskedCell = {
  isMasked: true,
  value: MASK,
};

function preload(){
  theLaser = loadImage("theLaser.png");
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
  isGridcovered = createStateGrid(GRID_SIZE, GRID_SIZE); 
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
}

function createCoveringGrid(rows, cols){
  let newCoveringGrid = []; 
  for (let y = 0; y < cols; y++){
    newCoveringGrid.push([]);
    for (let x = 0; x < rows; x++){
      newCoveringGrid[y].push(maskedCell.value);
    }
  }
  return newCoveringGrid;
}

function createStateGrid(rows, cols){
  let newisGridCovered = [];
  for (let y = 0; y <cols; y++){
    newisGridCovered.push([]);
    for (let x = 0; x < rows; x++){
      newisGridCovered[y].push(maskedCell.isMasked);
    }
  }
  return newisGridCovered;
}


function showCoveringGrid(){
  for (let y = 0; y<GRID_SIZE; y++) {
    for (let x = 0; x<GRID_SIZE; x++){
      if (coveringGrid[y][x] === MASK && isGridCovered[y][x] === true){
        fill("lightgray"); 
      }
      else if (coveringGrid[y][x] === MASK && cell.isMasked === false){
        noFill(); 
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}

function mousePressed(){
  if (mouseButton === LEFT){
    coveringGrid[floor(mouseX)][floor(mouseY)].cell.isMasked = !cell.isMasked; 
  }
}