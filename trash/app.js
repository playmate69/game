let fr = 30;
//player vars
var player; //player object
var player_states; //player states (in image)
var player_facing_left = false;
var player_facing_right = true; //default facing
var player_run_left = false;
var player_run_right = false;
var player_attack = false;
var player_data_idle_left;
var player_data_idle_right; //default state
var player_data_attack_left;
var player_data_attack_right; //default state
var world_one;
//enemy vars
var enemy; //enemy object
var world_one;
var ground_level = 100;

function preload() {
    // player states
    player_states = loadImage('media/spritesheets/player/player_states.png');
    player_data_idle_left = loadJSON('media/spritesheets/player/idle_left.json');
    player_data_idle_right = loadJSON('media/spritesheets/player/idle_right.json');
    player_data_run_left = loadJSON('media/spritesheets/player/run_left.json');
    player_data_run_right = loadJSON('media/spritesheets/player/run_right.json');
    player_data_attack_left = loadJSON('media/spritesheets/player/attack_left.json');
    player_data_attack_right = loadJSON('media/spritesheets/player/attack_right.json');
}

//setup
function setup() {
    var canvas = createCanvas(1200, 800);
    canvas.parent("processing");
    frameRate(fr);
    enemy = new Enemy();
    player = new Player();
    world_one = new World_one();
}

//draw
function draw() {
    background('lightblue');
    world_one.display();
    enemy.display();
    player.display();
    player.move();
    player.attack();
}

function mouseClicked() {
    attack = true;
}

//level one
function World_one(){
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
            if(player_attack == true) {
                let animation = [];
                let frames = player_data_attack_left.frames;
                for(i = 0; i < frames.length; i++) {
                    let pos = frames[i].position;
                    let img = player_states.get(pos.x, pos.y, pos.w, pos.h);
                    animation.push(img);
                }
                image(animation[frameCount % animation.length], this.x, this.y, this.width, this.height);
            } else {
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
        }
        if(player_facing_right == true) {
            if(player_attack == true) {
                let animation = [];
                let frames = player_data_attack_right.frames;
                for(i = 0; i < frames.length; i++) {
                    let pos = frames[i].position;
                    let img = player_states.get(pos.x, pos.y, pos.w, pos.h);
                    animation.push(img);
                }
                image(animation[frameCount % animation.length], this.x, this.y, this.width, this.height);
            } else {
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
        }
    } //end display
    this.move = () => {
        if (keyIsPressed === true) {

            if (keyIsDown(87)) {
                player_attack = true;
            } else {
                player_attack = false;
            }

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
    this.attack = () => {
        if(player_attack == true) {
            if(this.x >= enemy.x - 25 && this.x + this.width <= enemy.x + enemy.width + 25) {
                console.log('collide');
                enemy.x = random(0, width - this.width);
            }
        }
    } //end attack
} //end player object

//enemy object function
function Enemy() {
    this.width = 32 * 3;
    this.height = 32 * 3;
	this.x = random(0, width - this.width);
	this.y = height - ground_level - this.height;
    this.display = () => {
        noStroke();
        fill('white');
        rect(this.x, this.y, this.width, this.height);
    } //end display
} //end enemy object