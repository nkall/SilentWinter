/*
 *	This file comprises the main game state object
 */

function GameState(canvasWidth, canvasHeight){
	this.c = new GameConstants(canvasWidth, canvasHeight);

	// 2d Array of tiles representing the game map
	// This is uninitialized until genGameMap() is called in main
	this.map = new Array();

	this.player = new Player(0,0);//this.c.mapPixWidth / 2, this.c.mapPixWidth / 2);

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

 			// Small chance of generating obstacle
 			if ((Math.floor(Math.random() * this.c.obstacleSpawnOdds)) === 5){
 				this.map[x][y] = new Tile(tileImgIndex, true);
 			} else {
 				this.map[x][y] = new Tile(tileImgIndex, false);
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
			var xCoord = x + this.frameStartX;
			var yCoord = y + this.frameStartY;

			// If map edge reached, loop the map
			if (xCoord < 0){ xCoord += this.c.mapWidth; }
			if (xCoord >= this.c.mapWidth){ xCoord -= this.c.mapWidth; }
			if (yCoord < 0){ yCoord += this.c.mapHeight; }
			if (yCoord >= this.c.mapHeight){ yCoord -= this.c.mapHeight; }

			var currTile = this.map[xCoord][yCoord];
			currTile.drawTile(x, y, this.xOffset, this.yOffset, ctx);
			if (currTile.hasObstacle){
				currTile.obstacle.drawObstacle(x, y, this.xOffset, this.yOffset, ctx);
			}
		}
	}
	this.player.drawPlayer(ctx);
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
	this.mapPixWidth = this.mapWidth * this.tileSize;
	this.mapPixHeight = this.mapHeight * this.tileSize

	// Images used in displaying various map elements/items/characters
	// Uninitialized until loadAllImages() is called in main
	this.playerImg = null;
	this.tileImgs = [];
	this.buildingImgs = [];
	this.obstacleImgs = [];

	this.obstacleSpawnOdds = 20;
	this.buildingSpawnOdds = 20;
}

GameConstants.prototype.loadAllImages = function (callbackFn) {
	// These should be updated as image file names change
	var playerImgName = 'player.png';
	var tileImgNames = ['terrain0.jpg', 'terrain1.gif', 'terrain2.png'];
	var obstacleImgNames = ['obstacle0.png', 'obstacle1.gif', 'obstacle2.png'];
	var buildingImgNames = ['build0.png', 'build1.png', 'build2.png', 
			'build3.png', 'build4.png']

	// Keep count of loaded images to make sure each is loaded before being
	// displayed. Otherwise, this would be callback hell, since image loading
	// is asynchronous in nature.
	var loadCount = 0
	var loadLimit = 1 + tileImgNames.length + obstacleImgNames.length +
			buildingImgNames.length;

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

	// Load building images
	for (var i = 0; i < buildingImgNames.length; i++){
		this.buildingImgs[i] = new Image();
		this.buildingImgs[i].src = buildingImgNames[i];
		this.buildingImgs[i].onload = function (){
			loadCount++;
			if (loadCount === loadLimit){
				callbackFn();
			}
		};
	}
};