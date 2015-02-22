/*
 *  This file comprises the main game loop, plus a few initialization 
 *  and utility functions
 */

// Main GameState object (see gamestate.js)
var gs = null;
// Arguments are the tile size and dimensions of the canvas
var gc = new GameConstants(32, 1024, 512);

function initialize(){
	addKeyboardEvents();
}


// Main game loop
function runGameLoop(ctx){
	gs.update();
	gs.draw(ctx);
}

// Initialize everything, then run the game
function runGame(){
	var ctx = $("#canvas")[0].getContext("2d");
	gs = new GameState(1024, 512);
	initialize();
	window.setInterval(function(){
		runGameLoop(ctx);
	}, 20); // FPS can be changed here
}

$(window).load(function(){
	gc.loadAllImages(runGame);
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