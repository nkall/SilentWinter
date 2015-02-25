/*
 *	This file comprises the main game state object, which keeps track of
 *  much of the game's current status, including constants
 */

function GameState(canvasWidth, canvasHeight){
	this.mainMap = new Map(500, 500);
	// The player character -- see player.js for more information
	this.player = new Player(this.mainMap.mapPixSize.x / 2, this.mainMap.mapPixSize.y / 2);
	this.frame = new Frame();
}

GameState.prototype.update = function (){
	if (this.player.heat % 100 === 0){
		console.log(this.player.heat);
	}
	this.player.heat--;
	this.player.updatePos(this.mainMap.mapPixSize.x, this.mainMap.mapPixSize.y);

	this.frame.updateFrame(this.player.loc.x, this.player.loc.y);
}

GameState.prototype.draw = function (ctx){
	gs.frame.drawFrame(ctx);
	gs.player.drawPlayer(ctx);
}


// This function contains values not likely to change during the game,
// i.e. a form of global constants
function GameConstants(tileSize, canvasPixWidth, canvasPixHeight){
	this.tileSize = tileSize;      // Pixel length of (square) tiles

	// Size of the canvas
	this.canvasPixWidth = canvasPixWidth;
	this.canvasPixHeight = canvasPixHeight;
	// Tiles rendered on canvas at one time
	this.canvasWidth = (canvasPixWidth / this.tileSize) + 1;
	this.canvasHeight = (canvasPixHeight / this.tileSize) + 1;

	// Images used in displaying various map elements/items/characters
	// Remains uninitialized until loadAllImages() is called in main
	this.playerImg = null;
	this.tileImgs = [];
	this.buildingImgs = [];
	this.obstacleImgs = [];

	// Odds of a non-snow tile forming (1 in 'x')
	this.altTileSpawnOdds = 20;
	// Number of obstacle generation passes to be run for the main map
	this.obstacleCount = 2000;
}

// Preloads all necessary images for the game
GameConstants.prototype.loadAllImages = function (callbackFn) {
	// These should be updated as image file names change
	var playerImgName = 'player.png';
	var tileImgNames = ['terrain0.png', 'terrain1.png', 'terrain2.png'];
	var obstacleImgNames = ['obstacle0.png', 'obstacle1.png', 'obstacle2.png',
							'obstacle3.png'];
	var buildingImgNames = ['building0.png', 'building1.png', 'building2.png'];

	// Keep count of loaded images to make sure each is loaded before being
	// displayed. Otherwise, this would be callback hell, since image loading
	// is asynchronous.
	var loadCount = 0
	var loadLimit = 1 + tileImgNames.length + obstacleImgNames.length +
			buildingImgNames.length;

	// Load player image
	this.playerImg = new Image();
	this.playerImg.src = 'bin/' + playerImgName;
	this.playerImg.onload = function (){
		loadCount++;
		if (loadCount === loadLimit){
			callbackFn();
		}
	};

	// Load tile images
	for (var i = 0; i < tileImgNames.length; i++){
		this.tileImgs[i] = new Image();
		this.tileImgs[i].src = 'bin/' + tileImgNames[i];
		this.tileImgs[i].onload = function (){
			loadCount++;
			if (loadCount === loadLimit){
				callbackFn();
			}
		};
	}

	// Load obstacle images
	for (var i = 0; i < obstacleImgNames.length; i++){
		this.obstacleImgs[i] = new Image();
		this.obstacleImgs[i].src = 'bin/' + obstacleImgNames[i];
		this.obstacleImgs[i].onload = function (){
			loadCount++;
			if (loadCount === loadLimit){
				callbackFn();
			}
		};
	}

	// Load building images
	for (var i = 0; i < buildingImgNames.length; i++){
		this.buildingImgs[i] = new Image();
		this.buildingImgs[i].src = 'bin/' + buildingImgNames[i];
		this.buildingImgs[i].onload = function (){
			loadCount++;
			if (loadCount === loadLimit){
				callbackFn();
			}
		};
	}
};