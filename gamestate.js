/*
 *	This file comprises the main game state object
 */

var gs = new GameState();

function GameState(){
	this.constant = new GameConstants();
	// Uninitialized until genGameMap() is called in main
	this.map = new Array();
}

// This function initiallizes the entire game map in a random fashion. In the
// future I plan to do things a bit smarter to generate lakes rather than
// puddles, for example.
GameState.prototype.genGameMap = function() {
 	for (var x = 0; x < this.constant.mapWidth; x++) {
 		this.map[x] = new Array();
 		for (var y = 0; y < this.constant.mapHeight; y++) {
 			// Generate random tile image
 			var tileImgIndex = Math.floor(Math.random() * 
 										  this.constant.tileImgs.length);
 			// Small chance (5%) of generating obstacle
 			if ((Math.floor(Math.random() * 20)) === 0){
 				var obsImgIndex = Math.floor(Math.random() * 
 										   this.constant.obstacleImgs.length);
 				this.map[x][y] = new Tile(tileImgIndex, true, null);
 			} else {
 				this.map[x][y] = new Tile(tileImgIndex, false, null);
 			}
 		}
 	}
};

function GameConstants(canvasPixWidth, canvasPixHeight){
	this.tileSize = 32;      // Pixel length of (square) tiles

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

GameConstants.prototype.loadAllImages = function(callbackFn) {
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