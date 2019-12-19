let fr = 60;
let balloonImg;
var balloons = [];
var balloonAmount = 1;
//preload 
function preload() {
    balloonImg = loadImage('balloon.png');
}
//setup
function setup() {
    var canvas = createCanvas(500, 600);
    canvas.parent("#ipad");
    frameRate(fr);

    for(var i=0;i<50;i++) {
        var balloon = new Balloon();
        balloons.push(balloon);
    }

}

//draw
function draw() {
    background('black');
    for(var i=0;i<balloonAmount;i++) {
        balloons[i].display();
        balloons[i].update();
    }
}

function Balloon() {
    this.width = 50;
    this.height = 50;
    this.x = floor(random(0, width - this.width));
    this.y = height - this.height;
    this.display = function() {
        image(balloonImg, this.x, this.y, this.width, this.height);
    } 
    this.update = function() {
        this.y -= 1;
    } 
}

setInterval(function() {
        balloonAmount++;
}, 1000);