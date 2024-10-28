// 2D Array Assignment 
// October 28, 2024 
// 
const CELL_SIZE = 40; 
let grid; 
let rows; 
let cols; 

function preload(){
  theMine = loadImage("theMine.png");
  
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(height / CELL_SIZE);
  rows = floor(width / CELL_SIZE); 
  grid = createGrid(cols, rows);
}

function draw() {
  background(220);
  showGrid();
}

function createGrid(thecols, therows){
  let newGrid = []; 
  for (let y = 0; y < thecols; y++){
    newGrid.push([]);
    for (let x = 0; x <therows; x++){
      if (random(100) <= 20){
        newGrid[y].push(3);
      }
      else if (random(100) >20 && random(100) <= 40){
        newGrid[y].push(1);
      }
      else {
        newGrid[y].push(2);
      }
    }
  }
  return newGrid;
}

function showGrid(){
  for (let y = 0; y<rows; y++){
    for (let x = 0; x<cols; x++){
      if (grid[y][x] === 3){
        image(theMine, width/2, height/2, CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === 1){
        fill(0);
      }
      else {
        fill(255); 
      }
      square(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE);
    }
  }
}