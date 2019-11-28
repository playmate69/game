let fr = 15;
var rows, cols;
var w = 80;
var grid = [];
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
        grid[i].walls();
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
        var top = grid[index(i, j-1)], right = grid[index(i+1, j)], bottom = grid[index(i, j+1)], left = grid[index(i-1, j)];
        var cordinates = [top, right, bottom, left];
  
        for(let i=0;i<cordinates.length;i++) {
            if(typeof cordinates[i] !== "undefined" && !cordinates[i].visited) {
                neighbors.push(cordinates[i]);
            } 
        }

        for(let i=0;i<neighbors.length;i++) {
            if(!neighbors[i].visited) {
                var randNeighbor = floor(random(0, neighbors.length));
                var next = neighbors[randNeighbor];
                current = grid[index(next.i, next.j)];
            }   
        }

        //console.log(neighbors);
    }

    this.walls = function() {
        var top = grid[index(i, j-1)], right = grid[index(i+1, j)], bottom = grid[index(i, j+1)], left = grid[index(i-1, j)];
        var cordinates = [top, right, bottom, left];
  
        if(typeof cordinates[0] !== "undefined") {
            this.walls = [false, true, true, true];
        }
        if(typeof cordinates[1] !== "undefined") {
            this.walls = [true, false, true, true];
        }
        if(typeof cordinates[2] !== "undefined") {
            this.walls = [true, true, false, true];
        }
        if(typeof cordinates[3] !== "undefined") {
            this.walls = [true, true, false, true];
        }
    }

}