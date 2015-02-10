/*
 *  This file comprises the main game loop, plus a few initialization 
 *  and utility functions
 */

// Main GameState object (see gamestate.js)
// Arguments are the dimensions of the canvas
var gs = new GameState(1024, 512);

function initialize(){
	addKeyboardEvents();
	gs.genGameMap();
}

function update(){
	gs.updateFrame();
	gs.player.updatePos();
}

function draw(ctx){
	gs.drawFrame(ctx);
	gs.player.drawPlayer(ctx);
}

// Main game loop
function runGameLoop(ctx){
	update();
	draw(ctx);
}

// Initialize everything, then run the game
function runGame(){
	var ctx = $("#canvas")[0].getContext("2d");
	initialize();
	window.setInterval(function(){
		runGameLoop(ctx);
	}, 20); // FPS can be changed here
}

$(window).load(function(){
	gs.c.loadAllImages(runGame);
});

// Respond to user keyboard input
// So far, this only applies to player movement
function addKeyboardEvents(){
	// Arrow keys and WASD both work for input
	document.addEventListener("keydown", function(e){
		switch(e.keyCode){
			// Up
			case 87:
			case 38:
				gs.player.isPressingUp = true;
				break;
			// Down
			case 83:
			case 40:
				gs.player.isPressingDown = true;
				break;
			// Left
			case 65:
			case 37:
				gs.player.isPressingLeft = true;
				break;
			// Right
			case 68:
			case 39:
				gs.player.isPressingRight = true;
				break;
			default:
				break;
		}
	}, false);
	document.addEventListener("keyup", function(e){
		switch(e.keyCode){
			// Up
			case 87:
			case 38:
				gs.player.isPressingUp = false;
				break;
			// Down
			case 83:
			case 40:
				gs.player.isPressingDown = false;
				break;
			// Left
			case 65:
			case 37:
				gs.player.isPressingLeft = false;
				break;
			// Right
			case 68:
			case 39:
				gs.player.isPressingRight = false;
				break;
			default:
				break;
		}

	}, false);
};