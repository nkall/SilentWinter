/*
 *	This file comprises the main game state object
 */

function GameState(canvasWidth, canvasHeight){
	this.c = new GameConstants(canvasWidth, canvasHeight);

	// 2d Array of tiles representing the game map
	// This is uninitialized until genGameMap() is called in main
	this.map = new Array();

	this.player = new Player((this.c.mapWidth * 
		this.c.tileSize) / 2, (this.c.mapHeight * 
		this.c.tileSize) / 2);

	this.frameStartX = 0;
	this.frameStartY = 0;
	this.xOffset = 0;
	this.yOffset = 0;
}

// This function initiallizes the entire game map in a random fashion. In the
// future I plan to do things a bit smarter to generate lakes rather than
// puddles, for example.
GameState.prototype.genGameMap = function() {
 	for (var x = 0; x < this.c.mapWidth; x++) {
 		this.map[x] = new Array();
 		for (var y = 0; y < this.c.mapHeight; y++) {
 			// Generate random tile image
 			var tileImgIndex = Math.floor(Math.random() * 
 								  this.c.tileImgs.length);
 			// Small chance (5%) of generating obstacle
 			if ((Math.floor(Math.random() * 20)) === 0){
 				var obsImgIndex = Math.floor(Math.random() * 
 								   this.c.obstacleImgs.length);
 				this.map[x][y] = new Tile(x, y, tileImgIndex, true, null);
 			} else {
 				this.map[x][y] = new Tile(x, y, tileImgIndex, false, null);
 			}
 		}
 	}
};

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
			this.map[x + this.frameStartX][y + this.frameStartY].drawTile(x, y, this.xOffset, this.yOffset, ctx);
		}
	}
};

function GameConstants(canvasPixWidth, canvasPixHeight){
	this.tileSize = 32;      // Pixel length of (square) tiles

	this.canvasPixWidth = canvasPixWidth;
	this.canvasPixHeight = canvasPixHeight;
	// Tiles rendered on canvas at one time
	this.canvasWidth = (canvasPixWidth / this.tileSize) + 2;
	this.canvasHeight = (canvasPixHeight / this.tileSize) + 2;

	this.mapWidth = 500;	// Width of map in tiles
	this.mapHeight = 500;	// Length of map in tiles

	// Images used in displaying various map elements/items/characters
	// Uninitialized until loadAllImages() is called in main
	this.playerImg = null;
	this.tileImgs = [];
	this.obstacleImgs = [];
}

GameConstants.prototype.loadAllImages = function (callbackFn) {
	// These should be updated as image file names change
	var playerImgName = 'player.png';
	var tileImgNames = ['terrain0.jpg', 'terrain1.gif', 'terrain2.png'];
	var obstacleImgNames = ['obstacle0.png', 'obstacle1.gif', 'obstacle2.png',
							'obstacle3.png'];

	// Keep count of loaded images to make sure each is loaded before being
	// displayed. Otherwise, this would be callback hell, since image loading
	// is asynchronous in nature.
	var loadCount = 0
	var loadLimit = 1 + tileImgNames.length + obstacleImgNames.length;

	// Load player image
	this.playerImg = new Image();
	this.playerImg.src = playerImgName;
	this.playerImg.onload = function (){
		loadCount++;
		if (loadCount === loadLimit){
			callbackFn();
		}
	};

	// Load tile images
	for (var i = 0; i < tileImgNames.length; i++){
		this.tileImgs[i] = new Image();
		this.tileImgs[i].src = tileImgNames[i];
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
		this.obstacleImgs[i].src = obstacleImgNames[i];
		this.obstacleImgs[i].onload = function (){
			loadCount++;
			if (loadCount === loadLimit){
				callbackFn();
			}
		};
	}
};