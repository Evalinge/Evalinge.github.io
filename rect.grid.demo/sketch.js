// Rectangle Grid demo 
// October 28, 2024  
const CELL_SIZE = 5; 
let theGrid;
let rows; 
let cols;


function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / CELL_SIZE); 
  rows = floor(height / CELL_SIZE);
  grid = generateRandomGrid(cols, rows);


}

function draw() {
  background(220);
  displayGrid();
}  

function displayGrid(){
  for (let y = 0; y < rows; y++){
    for (let x = 0; x <cols; x++){
      if (grid[y][x] === 0){
        fill("pink"); 
      }
      else {
        fill("lightblue");
      }
      stroke(255);
      square(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE); 
    } 
  }
}

function generateRandomGrid(theCols, theRows){
  let newGrid = []; 
  for (let y = 0; y < theRows; y++){
    newGrid.push([]);
    for (let x = 0; x < theCols; x++){
      // toss in a one or a zero randomly 
      if (random(100) <= 50){
        newGrid[y].push(0);
      }
      else {
        newGrid[y].push(1); 
      }

    }
  }
  return newGrid;
}
