// Grid Demo 
// October 22, 2024


//If hardcoding, use something like this. 
//let grid = [[1, 0, 1, 0],[0,0,1,1],[0,1,1,0],[0,1,1,0]];

// 
let grid; 
const GRID_SIZE = 25;
let cellSize; 

function setup() {
  if (windowWidth<windowHeight){
    createCanvas(windowWidth, windowWidth);
  }
  else{
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE); 
  keyPressed(); 
  mousePressed()
}

function keyPressed(){
  if (key === "r"){
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "e"){
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
}

function draw() {
  background(220);
  drawGrid();
}

function drawGrid(){
  for (let y = 0; y < GRID_SIZE; y++){
    for (let x = 0; x<GRID_SIZE; x++){
      if (grid[y][x]===1){
        fill("black");
      }
      else if (grid[y][x] === 0){
        fill ("white");
      }
      square(x*cellSize, y*cellSize, cellSize);
    }
  }
}

function generateRandomGrid(cols, rows){
  let newGrid = []; 
  for (let y = 0; y<rows; y++){
    newGrid.push([]);
    for(let x = 0; x < cols; x++){
      //Choose either 0 or 1, each 50% of the time. 
      if (random(100) < 50){
        newGrid[y].push(1);
      }
      else{
        newGrid[y].push(0); 
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows){
  let newGrid = []; 
  for (let y = 0; y<rows; y++){
    newGrid.push([]);
    for(let x = 0; x < cols; x++){
      //Choose either 0 or 1, each 50% of the time. 
      newGrid[y].push(0); 
    }
  }
  return newGrid;
}

function mousePressed(){
  if (mouseIsPressed){
    let theY = floor(mouseY/cellSize) ;
    let theX = floor(mouseX/cellSize);
    if (grid[theY][theX] === 1){
      grid[theY].splice(theX, 1, 0);
    }
    else if (grid[theY][theX] === 0){
      grid[theY].splice(theX, 1, 1);
    }
  }
}
