let fr = 30;
var rows, cols;
var grid = [];
var w = 80;
var current;
//setup
function setup() {
    var canvas = createCanvas(800, 800);
    canvas.parent("processing");
    frameRate(fr);
    rows = width/w;
    cols = width/w;
    for(var i=0;i<rows;i++) {
        for(var j=0;j<cols;j++) {
            cell = new Cell(i,j);
            grid.push(cell);
        }
    }
    current = grid[0];
}

//draw
function draw() {
    background('darkgrey');
    for(var i=0;i<grid.length;i++) {
        grid[i].display();
    }
    current.visited = true;
    current.checkNeighbors();
}

function index(i, j) {
    return i + j * cols;
}

function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;

    this.display = function() {
        var x = this.i*w;
        var y = this.j*w;
        //console.log("(" + x + "," + y + ')');
        if(this.visited) {
            fill(195, 4, 4);
            rect(x,y,w,w);
        } else {
            stroke('black');
            noFill();
        }
        if(this.walls[0]) {
            line(x,y,x+w,y);
        }
        if(this.walls[1]) {
            line(x+w,y,x+w,y+w);
        }
        if(this.walls[2]) {   
            line(x+w,y+w,x,y+w);
        }
        if(this.walls[3]) {
            line(x,y+w,x,y);
        }
    }

    this.checkNeighbors = function() {
        var neighbors = [];
        var top     = grid[index(i, j-1)],
            right   = grid[index(i+1, j)],
            bottom  = grid[index(i, j+1)],
            left    = grid[index(i-1, j)];
        var cordinates = [top, right, bottom, left];
        for(var i=0;i<cordinates.length;i++) {
            if(!cordinates[i].visited) {
                neighbors.push(cordinates[i]);
            }
        }
        console.log(neighbors);
    }
}