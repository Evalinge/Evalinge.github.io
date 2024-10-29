// Character Grid Demo 
// October 22, 2024



// 
let grid; 
const GRID_SIZE = 20;
let cellSize; 
let shouldToggleNeighbours = false; 
const OPEN_TILE = 0; 
const IMPASSIBLE_TILE = 1; 
const PLAYER_TILE = 3;
let player = {
  x: 0,
  y: 0,
};
let grass;
let stone; 

function preload(){
  grass = loadImage("grass2.png");
  stone = loadImage("stone 1.png");
}

function setup() {
  if (windowWidth<windowHeight){
    createCanvas(windowWidth, windowWidth);
  }
  else{
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE); 

  //add player to grid
  grid[player.y][player.x] = PLAYER_TILE; 
  
  mousePressed();
  keyPressed(); 
}

function keyPressed(){
  if (key === "r"){
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "e"){
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "n"){
    shouldToggleNeighbours = !shouldToggleNeighbours;
  }
  if (key === "w"){
    //move up
    movePlayer(player.x, player.y - 1);
  }
  if (key === "s"){
    //move down
    movePlayer(player.x, player.y + 1);
  }
  if (key === "d"){
    //move left
    movePlayer(player.x + 1, player.y);
  }
  if (key === "a"){
    //move right
    movePlayer(player.x - 1, player.y);
  }
}

function movePlayer(x, y){
  // dont run off the screen 
  if (x>=0 && x <GRID_SIZE && y >=0, y < GRID_SIZE && grid[y][x] === OPEN_TILE){
    //open tile
    grid[player.y][player.x] = OPEN_TILE;
    // keep track of player location 
    player.x = x;
    player.y = y; 
    //put player in grid
    grid[player.y][player.x] = PLAYER_TILE; 

  }


}

function draw() {
  background(220);
  drawGrid();
}

function drawGrid(){
  for (let y = 0; y < GRID_SIZE; y++){
    for (let x = 0; x<GRID_SIZE; x++){
      if (grid[y][x]===IMPASSIBLE_TILE){
        image(grass, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === OPEN_TILE){
        image(stone, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === PLAYER_TILE){
        fill("red"); 
        square(x*cellSize, y*cellSize, cellSize);
      }
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
        newGrid[y].push(IMPASSIBLE_TILE);
      }
      else{
        newGrid[y].push(OPEN_TILE); 
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
      newGrid[y].push(OPEN_TILE); 
    }
  }
  return newGrid;
}

function mousePressed(){
  let theY = floor(mouseY/cellSize) ;
  let theX = floor(mouseX/cellSize);
  toggleCell(theX, theY);
  if (shouldToggleNeighbours){
    toggleCell(theX-1, theY);
    toggleCell(theX+1, theY);
    toggleCell(theX, theY-1);
    toggleCell(theX, theY+1);    
  } 
}

function toggleCell(x, y){
//Make sure the cell you are trying to toggle is in the grid
  if (x>0&& y>=0 && x<GRID_SIZE && y <GRID_SIZE){

    if (grid[y][x] === IMPASSIBLE_TILE){
      grid[y][x] = OPEN_TILE;
    }
    else if (grid[y][x] === OPEN_TILE){
      grid[y][x] = IMPASSIBLE_TILE;
    }
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  if (key === "r"){
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "e"){
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
}