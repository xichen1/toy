function copygrid(g){
    let extra = blank();
    for (let i=0; i<4; i++){
        for (let j = 0; j<4; j++){
            extra[i][j] = g[i][j];
        }
    }
    return extra;
}

function compare(a,b){
    for (let i=0; i<4; i++){
        for (let j = 0; j<4; j++){
            if(a[i][j] !== b[i][j]){
                return true;
            }
        }
    }
    return false;
}
function rotateGrid(grid){
    let rotated = blank();
    for (let i=0; i<4; i++){
        for (let j = 0; j<4; j++){
            rotated[i][j] = grid[j][i];
        }
    }
    return rotated;
}

function keyPressed(){
    let old = copygrid(grid);
    switch(keyCode){
        case DOWN_ARROW:
            grid = rotateGrid(grid);
            for (let i = 0; i < 4; i++){
                grid[i] = operateRight(grid[i]);
            }
            grid = rotateGrid(grid);
            break;
        case UP_ARROW:
            grid = rotateGrid(grid);
            for (let i=0; i < 4; i++){
                grid[i] = operateLeft(grid[i]);
            }
            grid = rotateGrid(grid);
            break;
        case RIGHT_ARROW:
            for (let i = 0; i < 4; i++){
                grid[i] = operateRight(grid[i]);
            }
            break;
        case LEFT_ARROW:
            for (let i = 0; i < 4; i++){
                grid[i] = operateLeft(grid[i]);
            }
            break;
        default:
            true;
    }

    if (compare(old, grid)){
        addNum();
    }
    updateCanvas();

    if (isGameOver()){
        select("#score").html("GAME OVER");
    }
    if (gameWon()){
        select("#score").html("GAME WON");
    }
}

function operateLeft(row){
    row = slideLeft(row);
    row = combineLeft(row);
    row = slideLeft(row);
    return row;
}
function operateRight(row){
    row = slideRight(row);
    row = combineRight(row);
    row = slideRight(row);
    return row;
}


function slideLeft(row){
    let arr= row.filter(val => val); // keep all values except 0
    let missing = 4-arr.length;
    let zeros = Array(missing).fill(0);
    arr = arr.concat(zeros);
    return arr;
}

function slideRight(row){
    let arr= row.filter(val => val); // keep all values except 0
    let missing = 4-arr.length;
    let zeros = Array(missing).fill(0);
    arr = zeros.concat(arr);
    return arr;
}

function combineLeft(row){
    for (let i = 0; i<=2; i++){
        let a = row[i];
        let b = row[i+1];
        if (a === b){
            row[i] = a+b;
            score += row[i];
            row[i+1] = 0;

        }
    }
    return row;
}

function combineRight(row){
    for (let i = 3; i>=0; i--){
        let a = row[i];
        let b = row[i-1];
        if (a === b){
            row[i] = a+b;
            score += row[i];
            row[i-1] = 0;
        }
    }
    return row;
}