/*
 *  This file comprises the main game loop, plus a few initialization 
 *  and utility functions
 */

// Main GameState object (see gamestate.js)
var gs = null;
var wm = new WindowManager();

// Arguments are the tile size and dimensions of the canvas
var gc = new GameConstants(64, 1024, 512);

function initialize(){
	addKeyboardEvents();
}


// Main game loop
function runGameLoop(ctx){
	wm.update();
	wm.draw(ctx);
	//console.log(gs.player.loc);
}

// Initialize everything, then run the game
function runGame(){
	var ctx = $("#canvas")[0].getContext("2d");
	gs = new GameState(gc.canvasPixWidth, gc.canvasPixHeight);
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
			// E
			case 69:
				if (wm.gameMode === "Scavenge"){
					gs.enterBuilding();
				}
				break;
			// I
			case 73:
				if (wm.gameMode === "Scavenge"){
					wm.gameMode = "Inventory";
				} else if (wm.gameMode === "Inventory"){
					wm.gameMode = "Scavenge";
				}
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

	$("canvas")[0].addEventListener("click", function(e){
		if (wm.gameMode === "Base" || 
				wm.gameMode === "Upgrade" ||
				wm.gameMode === "Dialog"){
			wm.checkMousePress(new Coord(e.clientX, e.clientY));
		}
	}, false);
};

var music = document.getElementById('backMusic');

document.getElementById('mute').addEventListener('click', function (e)
{
    e = e || window.event;
    music.muted = !music.muted;
    e.preventDefault();
	music.loop = true;
}, false);

var music2 = document.getElementById('backMusic2');

document.getElementById('mute').addEventListener('click', function (e)
{
    e = e || window.event;
    music2.muted = !music2.muted;
    e.preventDefault();
	music2.loop = true;
}, false);