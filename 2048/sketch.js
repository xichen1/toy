let grid;
let score = 0


function blank(){
    return [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]];
}

function gameWon(){
    for (let i = 0; i <4; i++){
        for (let j = 0; j <4; j++){
            if (grid[i][j]===2048){
                return true;
            }
        }
    }
    return false;
}

function isGameOver(){
    for (let i = 0; i <4; i++){
        for (let j = 0; j <4; j++){
            if (grid[i][j]===0){
                return false;
            }
            if (i != 3 && grid[i][j] === grid[i+1][j]){
                return false;
            }
            if (j != 3 && grid[i][j] === grid[i][j+1]){
                return false;
            }
        }
    }
    return true;
}

function setup(){
    createCanvas(400,400);
    noLoop();
    grid = blank();
    addNum();
    addNum();
    updateCanvas();
}

function addNum(){
    let option = [];
    for (let i = 0; i <4; i++){
        for (let j = 0; j <4; j++){
            if (grid[i][j]===0){
                option.push({x:i, y:j});
            }
        }
    }
    if (option.length > 0 ){
        let spot = random(option);
        let r = random(1);
        grid[spot.x][spot.y] = r > 0.5 ? 2 : 4;
    }

}

function drawGrid(){
    let w = 100;
    for (let i = 0; i <4; i++){
        for (let j = 0; j <4; j++){
            let val = grid[i][j];
            strokeWeight(2); // set the width of the frame
            stroke(0); // set the grayscale color for the frame
            let s = "" + val;
            if (val !== 0){
                fill(colorSizes[s].color);
            }
            else{
                noFill();
            }
            rect(j * w, i * w, w, w, 30); // draw the fram at the location i * w, j * w and the width, height are w

            if (val !== 0){
                textAlign(CENTER,CENTER);
                textSize(colorSizes[s].size);  
                fill(0);              
                noStroke();
                text(val, j*w+w/2, i*w+3*w/4);
            }
        }
    }  
}

function updateCanvas(){
    background(255);
    drawGrid();
    select("#score").html(score);
}
