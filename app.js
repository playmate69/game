let fr = 0.25;
var skeleton_idle;
var skeleton_idle_spritesheet;
var skel_enemy;
var i = 0;
var level_one;
var ground_level = 100;

function preload() {
    skeleton_idle = loadImage('media/spritesheets/enemies/skeleton/attack.png');
}

function setup() {
    var canvas = createCanvas(1200, 800);
    canvas.parent("processing");
    frameRate(fr);

    setInterval(function(){
        if(i > 773) {
            i = 0;
        }
        i+= 43;
        skeleton_idle_spritesheet = skeleton_idle.get(i, 0, 43, 37);
    }, 1);
    level_one = new Level_one();
    skel_enemy = new Skel_enemy();
}

// draw

function draw() {
    background('lightblue');
    level_one.display();
    skel_enemy.display();
}

function Level_one(){
    this.width = 100;
    this.height = 100;
	this.x = random(0, width - this.width);
	this.y = height;

	this.display = function(){
        noStroke();
        fill('brown');
        rect(0, height-ground_level, width, ground_level);
	}
}

function Skel_enemy(){
    this.width = 43 * 3;
    this.height = 37 * 3;
	this.x = 100;
	this.y = height - ground_level - this.height;

	this.display = function(){
        noStroke();
        fill('black');
        //rect(this.x, height-ground_level-this.height, this.width, this.height);
        image(skeleton_idle_spritesheet, this.x, this.y, this.width, this.height);

	}
}
