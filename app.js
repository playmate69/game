let fr = 60;
var skeleton_idle;
var skeleton_idle_spritesheet;
var skel_enemy;
var level_one;
var ground_level = 100;

function preload() {
    skeleton_idle = loadImage('media/spritesheets/enemies/skeleton/idle.png');
}

function setup() {
    var canvas = createCanvas(1200, 800);
    canvas.parent("processing");
    frameRate(fr);
        for(var i; i < fr; i+=25) {
            skeleton_idle_spritesheet = skeleton_idle.get(i, 0, 24, 32);
        }
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
    this.width = 24 * 3;
    this.height = 32 * 3;
	this.x = 100;
	this.y = height - ground_level - this.height;

	this.display = function(){
        noStroke();
        fill('black');
        //rect(this.x, height-ground_level-this.height, this.width, this.height);
        image(skeleton_idle_spritesheet, this.x, this.y, this.width, this.height);

	}
}
