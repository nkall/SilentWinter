/*
 *	This file comprises the main game state object, which keeps track of
 *  much of the game's current status, including constants
 */

function GameState(canvasWidth, canvasHeight){
	this.c = new GameConstants(canvasWidth, canvasHeight);

	// 2d Array of tiles representing the game map
	// This is uninitialized until genGameMap() is called in main
	this.map = new Array();

	// The player character -- see player.js for more information
	this.player = new Player(this.c.mapPixWidth / 2, this.c.mapPixWidth / 2);

	// These values are set with updateFrame()
	// The indices of the this.map tile that is top-leftmost on the canvas
	this.frameStartX = 0;
	this.frameStartY = 0;
	// Pixel distance from (0,0) that the top-leftmost tile should be drawn
	this.xOffset = 0;
	this.yOffset = 0;
}

// This function initializes the entire game map in a random fashion. In the
// future I plan to do things a bit smarter to generate lakes rather than
// puddles, for example.
GameState.prototype.genGameMap = function() {
 	for (var x = 0; x < this.c.mapWidth; x++) {
 		this.map[x] = new Array();
 		for (var y = 0; y < this.c.mapHeight; y++) {
 			// Generate random tile image
 			if (Math.floor(Math.random() * this.c.altTileSpawnOdds) === 0){
 				var tileImgIndex = Math.floor(Math.random() * 
 								  this.c.tileImgs.length);
 			} else {
 				var tileImgIndex = 1;
 			}
 			// Small chance of generating obstacle
 			if ((Math.floor(Math.random() * this.c.obstacleSpawnOdds)) === 5){
 				this.map[x][y] = new Tile(tileImgIndex, true);
 			} else { // Otherwise, empty tile
 				this.map[x][y] = new Tile(tileImgIndex, false);
 			}
 		}
 	}
};

// Updates the state of the frame (tiles displayed on canvas) based on player position
GameState.prototype.updateFrame = function (){
	var firstTilePixX = (this.player.x - this.c.canvasPixWidth / 2);
	var firstTilePixY = (this.player.y - this.c.canvasPixHeight / 2);
	this.frameStartX = Math.floor(firstTilePixX / this.c.tileSize);
	this.frameStartY = Math.floor(firstTilePixY / this.c.tileSize);
	this.xOffset = -(this.player.x % this.c.tileSize);
	this.yOffset = -(this.player.y % this.c.tileSize);
};

GameState.prototype.drawFrame = function (ctx){
	for (var x = 0; x < this.c.canvasWidth; x++) {
		for (var y = 0; y < this.c.canvasHeight; y++) {
			var xCoord = x + this.frameStartX;
			var yCoord = y + this.frameStartY;

			// If map edge reached, loop the map
			if (xCoord < 0){ xCoord += this.c.mapWidth; }
			if (xCoord >= this.c.mapWidth){ xCoord -= this.c.mapWidth; }
			if (yCoord < 0){ yCoord += this.c.mapHeight; }
			if (yCoord >= this.c.mapHeight){ yCoord -= this.c.mapHeight; }

			// Draw the tile at the given coordinates on screen
			var currTile = this.map[xCoord][yCoord];
			currTile.drawTile(x, y, this.xOffset, this.yOffset, ctx);
			// Draw the obstacle if it has one
			if (currTile.hasObstacle){
				currTile.obstacle.drawObstacle(x, y, this.xOffset, this.yOffset, ctx);
			}
		}
	}
};

// This function contains values not likely to change during the game,
// i.e. a form of global constants
function GameConstants(canvasPixWidth, canvasPixHeight){
	this.tileSize = 32;      // Pixel length of (square) tiles

	// Size of the canvas
	this.canvasPixWidth = canvasPixWidth;
	this.canvasPixHeight = canvasPixHeight;
	// Tiles rendered on canvas at one time
	this.canvasWidth = (canvasPixWidth / this.tileSize) + 2;
	this.canvasHeight = (canvasPixHeight / this.tileSize) + 2;

	// Size of the map in tiles
	this.mapWidth = 500;
	this.mapHeight = 500;
	// Likewise, in pixels
	this.mapPixWidth = this.mapWidth * this.tileSize;
	this.mapPixHeight = this.mapHeight * this.tileSize

	// Images used in displaying various map elements/items/characters
	// Remains uninitialized until loadAllImages() is called in main
	this.playerImg = null;
	this.tileImgs = [];
	this.buildingImgs = [];
	this.obstacleImgs = [];

	// Odds of spawning an obstacle (1 in 'x')
	this.obstacleSpawnOdds = 75;
	// Odds of an obstacle being a building (1 in 'x')
	this.buildingSpawnOdds = 20;
	this.altTileSpawnOdds = 20;
}

// Preloads all necessary images for the game
GameConstants.prototype.loadAllImages = function (callbackFn) {
	// These should be updated as image file names change
	var playerImgName = 'player.png';
	var tileImgNames = ['terrain0.png', 'terrain1.png', 'terrain2.png', 
						'terrain3.png', 'terrain4.png'];
	var obstacleImgNames = ['obstacle0.png', 'obstacle1.png', 'obstacle2.png',
							'obstacle3.png'];
	var buildingImgNames = ['build0.png', 'build1.png', 'build2.png', 
							'build3.png', 'build4.png']

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