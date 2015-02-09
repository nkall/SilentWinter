// Main GameState object
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
}

function runGameLoop(ctx){
	update();
	draw(ctx);
}

function runGame(){
	var ctx = $("#canvas")[0].getContext("2d");
	initialize();
	window.setInterval(function(){
		runGameLoop(ctx);
	}, 10);
}

$(window).load(function(){
	gs.c.loadAllImages(runGame);
});


function addKeyboardEvents(){
	document.addEventListener("keydown", function(e){
		switch(e.key){
			case "w":
			case "W":
			case "Up":
				gs.player.isPressingUp = true;
				break;
			case "s":
			case "S":
			case "Down":
				gs.player.isPressingDown = true;
				break;
			case "a":
			case "A":
			case "Left":
				gs.player.isPressingLeft = true;
				break;
			case "d":
			case "D":
			case "Right":
				gs.player.isPressingRight = true;
				break;
			default:
				break;
		}
	}, false);
	document.addEventListener("keyup", function(e){
		switch(e.key){
			case "w":
			case "W":
			case "Up":
				gs.player.isPressingUp = false;
				break;
			case "s":
			case "S":
			case "Down":
				gs.player.isPressingDown = false;
				break;
			case "a":
			case "A":
			case "Left":
				gs.player.isPressingLeft = false;
				break;
			case "d":
			case "D":
			case "Right":
				gs.player.isPressingRight = false;
				break;
			default:
				break;
		}

	}, false);
};