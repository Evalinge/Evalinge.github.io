// 2D Array Assignment 
// October 28, 2024 
// 


//Naming variables and constants
const GRID_SIZE = 20; 
const EMPTY_TILE = 0;
const HOLE = 1; 
const GEM = 2; 
const MASK = 3; 

let shouldToggleNeighbours = false;
let cellSize; 
let grid; 
let coveringGrid;
let gemCounter = 0;
let holes = 0;
let gems = 0;
let holeGrid; 
let gemGrid; 


function preload(){
  theHole = loadImage("BlackGroundHole.png");
  floorTile = loadImage("FloorTile.jpg");
  theGem = loadImage("greenGem.png");
  theFlag = loadImage("warningFlag.jpg");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);

  if (height<width){
    cellSize = height/GRID_SIZE;
  }
  else{
    cellSize = width/GRID_SIZE;
  }
  //determine arrays
  grid = createGrid(GRID_SIZE, GRID_SIZE);
  coveringGrid = createCoveringGrid(GRID_SIZE, GRID_SIZE);
  gemGrid = countGems(GRID_SIZE, GRID_SIZE, grid); 
  holeGrid = countHoles(GRID_SIZE, GRID_SIZE, grid); 
}

function draw() {
 
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
        newGrid[y].push(GEM);
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
        textStyle(BOLD);
        if (holeGrid[y][x] >= 0){
          fill("red"); 
          text(holeGrid[y][x], x*cellSize - 3*cellSize/4, y*cellSize - 3*cellSize/4);
        }
        if (gemGrid[y][x] >= 0){
          fill("blue");
          text(gemGrid[y][x], x*cellSize - cellSize/4, y*cellSize - cellSize/4);
        }
      }
      else if(grid[y][x] === GEM){
        image(floorTile, x*cellSize, y*cellSize, cellSize, cellSize);
        image(theGem, x*cellSize, y*cellSize, cellSize, cellSize); 
        if (holeGrid[y][x] > 0){
          fill("red");
          text(holeGrid[y][x], x*cellSize - 3*cellSize/4, y*cellSize - 3*cellSize/4);
        }
        if (gemGrid[y][x] > 0){
          fill("blue");
          text(gemGrid[y][x], x*cellSize - cellSize/4, y*cellSize - cellSize/4);
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
    if (grid[y][x] === EMPTY_TILE || grid[y][x] === GEM){
      toggleCell(x, y);
    }
    if (grid[y][x] === HOLE){
      
    }
  }
  if (coveringGrid[y][x] === GEM && mouseButton === RIGHT){
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

function countGems(rows, cols, theGrid){
  let newGemGrid = []; 
  for (let y = 0; y < cols; y++){
    newGemGrid.push([]);
    for (let x = 0; x < rows; x++){
      gems = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (y+i >= 0 && y+i < cols && x+j >= 0 && x+j < rows && theGrid[y+i][x+j] === GEM) {
            gems += 1;
          }
        }
      }
      //Don't count yourself! 
      if (grid[y][x] === GEM){ 
        gems -= 1; 
      }
      newGemGrid[y].push(gems); 
    }
  }  
  return newGemGrid;
}

function countHoles(rows, cols, theGrid){
  let newHoleGrid = []; 
  for (let y = 0; y < cols; y++){
    newHoleGrid.push([]);
    for (let x = 0; x < rows; x++){
      holes = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (y+i >= 0 && y+i < cols && x+j >= 0 && x+j < rows && theGrid[y+i][x+j] === HOLE) {
            holes += 1;
          }
        }
      }
      //Don't count yourself! 
      if (grid[y][x] === HOLE){
        holes -= 1; 
      }
      newHoleGrid[y].push(holes); 
    }
  }  
  return newHoleGrid;
}