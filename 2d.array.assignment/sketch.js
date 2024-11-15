// 2D Array Assignment 
// October 28, 2024 
// Evalina Maille
// GemSweeper (Minesweeper inspired)
// No extra for experts, but I did encorporate 2d arrays, sound, images,
// and state variables. (much better than the state variable assignment.)
// Images and sounds from OpenGameArt.org
// You can place flags but cannot take them back as I ran out of time. 

//Naming variables and constants
const GRID_SIZE = 10; 
const EMPTY_TILE = 0;
const HOLE = 1; 
const GEM = 2; 
const MASK = 3; 
const FLAG = 4;

let state = "starting";
let shouldToggleNeighbours = false;
let cellSize; 
let grid; 
let coveringGrid;
let gemCounter = 0;
let holes = 0;
let gems = 0;
let holeGrid; 
let gemGrid; 
let unflaggedHoles; 


function preload(){
  theHole = loadImage("BlackGroundHole.png");
  floorTile = loadImage("FloorTile.jpg");
  theGem = loadImage("greenGem.png");
  theFlag = loadImage("warningFlag.jpg");
  slipSound = loadSound("slipSound.wav");
  pickUp = loadSound("dingSound.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault());
  background(255);

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
  unflaggedHoles = countAllHoles(GRID_SIZE, GRID_SIZE, grid); 

}

function draw() {
  if (state === "starting") {
    showStartScreen();
  }
  if (state === "running") {
    background(255);
    showGrid();
    showCoveringGrid(); 
  }
  if (state === "lost"){
    gameOver();
  }
 
  keyPressed();
}

function gameOver() {
  background(0);
  textWrap(WORD);
  textAlign(CENTER);
  fill("red");
  textSize(30);
  text("You've been trapped! You collected " + gemCounter + " gems!"
    + " Please refresh the page if you wish to try again...", 0, height/4, width, height/2);  
}

function showStartScreen() {
  background("lightpink");
  textWrap(WORD);
  textAlign(CENTER);
  fill(0);
  textSize(30);
  text("Welcome to Gem Sweeper you are a ninja avoiding hole traps and collecting gems!"
    + " Red numbers indicate neighbouring holes and the green numbers indicate neighbouring gems."
    + " Left click to reveal cells, and right click to flag a hole, or collect a gem.", 0, height/4, width, height/2);  
  button();
}

function button() {
  fill("hotpink");
  rect(width/2-100, height - 250, 200, 100); 
  fill(0);
  text("Start", width/2-100, height-200, 200, 100);
  if (mouseIsPressed && (mouseX > width/2-100 && mouseX < width/2+100) && (mouseY > height-250 && mouseY < height-150)){
    state = "running"; 
  }
}

function countAllHoles(rows, cols, grid) {
  let counter = 0;
  for (let y = 0; y < cols; y++){
    for (let x = 0; x < rows; x++){
      if (grid[y][x] === HOLE){
        counter += 1; 
      }
    }
  }
  return counter;
}

function createGrid(rows, cols){
  let newGrid = []; 
  //Iterate through all y and x values
  for (let y = 0; y < cols; y++){
    newGrid.push([]);
    for (let x = 0; x < rows; x++){
      //randomly decide their state and create an array to store them
      if (random(100) <= 20){
        newGrid[y].push(HOLE);
      }
      else if (random(100) > 20 && random(100) <= 25){
        newGrid[y].push(GEM);
      }
      else{
        newGrid[y].push(EMPTY_TILE);
      }
      
    }
  }  
  return newGrid;
}

// takes the neighbouring hole and gem amounts and displays them in their cell
function displayNumbers(){
  for (let y = 0; y<GRID_SIZE; y++) {
    for (let x = 0; x<GRID_SIZE; x++){
      
      // Display based on state!
      if (grid[y][x] === EMPTY_TILE || grid[y][x] === GEM){
        textStyle(BOLD);
        fill("red"); 
        text(holeGrid[y][x], x*cellSize + cellSize/4, y*cellSize + cellSize/4);
        fill("lime");
        text(gemGrid[y][x], x*cellSize + 3*cellSize/4, y*cellSize +  3*cellSize/4);
      }
      noFill();
      textAlign(CENTER, CENTER);
    }
  }
}

//Display the grid with images based on cell state 
function showGrid(){
  for (let y = 0; y<GRID_SIZE; y++) {
    for (let x = 0; x<GRID_SIZE; x++){
      displayNumbers();
      // Display based on state!
      if (grid[y][x] === HOLE){
        image(floorTile, x*cellSize, y*cellSize, cellSize, cellSize);
        image(theHole, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      if (grid[y][x] === EMPTY_TILE){
        image(floorTile, x*cellSize, y*cellSize, cellSize, cellSize);
        
      }
      if(grid[y][x] === GEM){
        image(floorTile, x*cellSize, y*cellSize, cellSize, cellSize);
        image(theGem, x*cellSize, y*cellSize, cellSize, cellSize); 
      }
      noFill();
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}

//Store the cover in a separate array
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

//Display the mask or add a flag
function showCoveringGrid(){
  for (let y = 0; y<GRID_SIZE; y++) {
    for (let x = 0; x<GRID_SIZE; x++){
      if (coveringGrid[y][x] === MASK && coveringGrid[y][x] !== FLAG){
        fill("lightgray"); 
        rect(x*cellSize, y*cellSize, cellSize, cellSize);
      }
      else if (coveringGrid[y][x] === FLAG){
        fill("lightgray");
        rect(x*cellSize, y*cellSize, cellSize, cellSize);
        image(theFlag, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      else {
        noFill(); 
      }
    }
  }
}

// Takes mouse input
function mousePressed() {
  if (state === "running") {

    let x = Math.floor(mouseX/cellSize);
    let y = Math.floor(mouseY/cellSize);
  
    if (mouseButton === LEFT){
    //toggle self
      if (grid[y][x] === EMPTY_TILE || grid[y][x] === GEM){
        toggleCell(x, y);
      }
      if (grid[y][x] === HOLE && coveringGrid[y][x] !== FLAG){
        toggleCell(x, y); 
        slipSound.play();
        state = "lost";
      }
    }
    if (mouseButton === RIGHT){
      // Collect gem
      if (coveringGrid[y][x] === GEM ){
        grid[y][x] = EMPTY_TILE;
        gemCounter += 1;
        pickUp.play();
      }
      // Place flag
      if (coveringGrid[y][x] === MASK){
        coveringGrid[y][x] = FLAG;
      }
    }
  }
}

//removes the cover from a cell 
function toggleCell(x, y) {
  //make sure the cell you're toggling is in the grid
  if (x >= 0 && y >= 0 && x < GRID_SIZE && y < GRID_SIZE) {
    if (coveringGrid[y][x] === MASK) {
      coveringGrid[y][x] = grid[y][x];
    }
  }
}

//uncover the entire grid
function keyPressed(){
  if (key === "u"){
    for (let y = 0; y<GRID_SIZE; y++) {
      for (let x = 0; x<GRID_SIZE; x++){
        coveringGrid[y][x] = grid[y][x];
      }
    }
  }
}

//Count neighbouring gems
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

//Count neighbouring holes
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