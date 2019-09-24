let fr = 60;
var skeleton_idle;
var skeleton_idle_spritesheet;
var i;
var skel_enemy;
var level_one;
var ground_level = 100;

function preload() {
    skeleton_idle = loadImage('media/spritesheets/enemies/skeleton/idle.png');
    skeleton_idle_spritesheet = skeleton_idle.get(0, 24, 24, 32);
}

function setup() {
    var canvas = createCanvas(1200, 800);
    canvas.parent("processing");
    frameRate(fr);
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
    this.width = 100;
    this.height = 100;
	this.x = 100;
	this.y = height - ground_level - this.height;

	this.display = function(){
        noStroke();
        fill('black');
        rect(0, height-ground_level, 20);
        image(skeleton_idle_spritesheet, this.x, this.y, this.width, this.height);
	}

	this.move = function(){
        this.y = this.y += -4;

        if(this.y < 0 - this.height) {
            this.x = random(0, width - this.width);
            this.y = height;
            if(scoreBoard.score > 0) {
                scoreBoard.fout ++;
            }
        }
    }
}



