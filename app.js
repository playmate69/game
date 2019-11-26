let fr = 30;
var rows, cols;
var grid = [];
var w = 80;
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
}

//draw
function draw() {
    background('darkgrey');
    for(var i=0;i<grid.length;i++) {
        grid[i].display();
    }
}

function Cell(x, y) {
    this.x = x;
    this.y = y;

    this.display = function() {
        var x = this.x*w;
        var y = this.y*w;
        //console.log("(" + x + "," + y + ')');
        stroke('black');
        noFill();
        line(x,y,x+w,y);
        line(x+w,y,x+w,y+w);
        line(x+w,y+w,x,y+w);
        line(x,y+w,x,y);
    }
}