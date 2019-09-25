let fr = 30;
//player vars
var player; //player object
var player_facing_left = false;
var player_facing_right = true; //default facing
var player_run_left = false;
var player_run_right = false;
var player_states; //player states (in image)
var player_data_idle_left;
var player_data_idle_right; //default state
var level_one;
var ground_level = 100;

function preload() {
    // player states
    player_states = loadImage('media/spritesheets/player/player_states.png');
    player_data_idle_left = loadJSON('media/spritesheets/player/idle_left.json');
    player_data_idle_right = loadJSON('media/spritesheets/player/idle_right.json');
    player_data_run_left = loadJSON('media/spritesheets/player/run_left.json');
    player_data_run_right = loadJSON('media/spritesheets/player/run_right.json');
}

//setup
function setup() {
    var canvas = createCanvas(1200, 800);
    canvas.parent("processing");
    frameRate(fr);
    player = new Player();
    level_one = new Level_one();
}

//draw
function draw() {
    background('lightblue');
    level_one.display();
    player.display();
    player.move();
}

function mouseClicked() {
    attack = true;
}

//level one
function Level_one(){
    this.width = 100;
    this.height = 100;
	this.x = random(0, width - this.width);
	this.y = height;

	this.display = () => {
        noStroke();
        fill('brown');
        rect(0, height-ground_level, width, ground_level);
	}
}

//player object function
function Player() {
    this.width = 32 * 3;
    this.height = 32 * 3;
	this.x = 100;
	this.y = height - ground_level - this.height;
    this.display = () => {
        if(player_facing_left == true) {
            if(player_run_left == true) {
                let animation = [];
                let frames = player_data_run_left.frames;
                for(i = 0; i < frames.length; i++) {
                    let pos = frames[i].position;
                    let img = player_states.get(pos.x, pos.y, pos.w, pos.h);
                    animation.push(img);
                }
                image(animation[frameCount % animation.length], this.x, this.y, this.width, this.height);
            } else {
                let animation = [];
                let frames = player_data_idle_left.frames;
                for(i = 0; i < frames.length; i++) {
                    let pos = frames[i].position;
                    let img = player_states.get(pos.x, pos.y, pos.w, pos.h);
                    animation.push(img);
                }
                image(animation[frameCount % animation.length], this.x, this.y, this.width, this.height);
            }
        }
        if(player_facing_right == true) {
            if(player_run_right == true) {
                let animation = [];
                let frames = player_data_run_right.frames;
                for(i = 0; i < frames.length; i++) {
                    let pos = frames[i].position;
                    let img = player_states.get(pos.x, pos.y, pos.w, pos.h);
                    animation.push(img);
                }
                image(animation[frameCount % animation.length], this.x, this.y, this.width, this.height);
            } else {
                let animation = [];
                let frames = player_data_idle_right.frames;
                for(i = 0; i < frames.length; i++) {
                    let pos = frames[i].position;
                    let img = player_states.get(pos.x, pos.y, pos.w, pos.h);
                    animation.push(img);
                }
                image(animation[frameCount % animation.length], this.x, this.y, this.width, this.height);
            }
        }
    } //end display
    this.move = () => {
        if (keyIsPressed === true) {
            if (keyIsDown(LEFT_ARROW)) {
                this.x -= 5;
                player_facing_left = true;
                player_facing_right = false;
                player_run_left = true;
                player_run_right = false;
            }
            if (keyIsDown(RIGHT_ARROW)) {
                this.x += 5;
                player_facing_left = false;
                player_facing_right = true;
                player_run_left = false;
                player_run_right = true;
            }
        } else {
            player_run_left = false;
            player_run_right = false;
        }
    } //end move
}

/*
function Skel_enemy(){
    if (attack == true) {
        this.width = 43 * 3;
        this.height = 37 * 3;
    } else {
        this.width = 24 * 3;
        this.height = 32 * 3;
    }
	this.x = 100;
	this.y = height - ground_level - this.height;

	this.display = function(){
        noStroke();
        fill('black');
        if (attack == true) {
            let animation = [];
            let frames = skeleton_attack_data.frames;
                for(i = 0; i < frames.length-1; i++) {
                    let pos = frames[i].position;
                    let img = skeleton_attack.get(pos.x, pos.y, pos.w, pos.h);
                    animation.push(img);
                }
                image(animation[frameCount % animation.length], this.x, this.y, this.width, this.height);

                setTimeout( () => {
                    attack = false;
                }, animation.length*(60%animation.length));
        } else {
            let animation = [];
            let frames = skeleton_idle_data.frames;
                for(i = 0; i < frames.length-1; i++) {
                    let pos = frames[i].position;
                    let img = skeleton_idle.get(pos.x, pos.y, pos.w, pos.h);
                    animation.push(img);
                }
                image(animation[frameCount % animation.length], this.x, this.y, this.width, this.height);
        }
	} // end display
} //end skel_enemy
*/