/*
 *	This file comprises the main game state object
 */

var gs = new GameState();

function GameState(){
	this.constant = new GameConstants();
}

function GameConstants(canvasPixWidth, canvasPixHeight){
	this.tileSize = 32;      // Pixel length of (square) tiles

	// Tiles rendered on canvas at one time
	this.canvasWidth = (canvasPixWidth / this.tileSize) + 2;
	this.canvasHeight = (canvasPixHeight / this.tileSize) + 2;

	this.mapWidth = 500;	// Width of map in tiles
	this.mapHeight = 500;	// Length of map in tiles

	// Images used in displaying various map elements/items/characters
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