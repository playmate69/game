let fr = 30;
let skeleton_idle_data;
let skeleton_idle;
var skel_enemy;
let animation = [];
let frames;
let pos;
let img;
var level_one;
var ground_level = 100;

function preload() {
    skeleton_idle_data = loadJSON('media/spritesheets/enemies/skeleton/attack.json');
    skeleton_idle = loadImage('media/spritesheets/enemies/skeleton/attack.png');
}

function setup() {
    var canvas = createCanvas(1200, 800);
    canvas.parent("processing");
    frameRate(fr);
    frames = skeleton_idle_data.frames;
    for(i = 0; i < frames.length; i++) {
        pos = frames[i].position;
        img = skeleton_idle.get(pos.x, pos.y, pos.w, pos.h);
        animation.push(img);
    }
    level_one = new Level_one();
    skel_enemy = new Skel_enemy();
}

// draw

function draw() {
    background('lightblue');
    level_one.display();
    //skel_enemy.display();
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
        image(animation[1], this.x, height-ground_level-this.height, this.width, this.height);
	}
}
