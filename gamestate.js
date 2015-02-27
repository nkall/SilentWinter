/*
 *	This file comprises the main game state object, which keeps track of
 *  much of the game's current status, including constants
 */

function GameState(canvasWidth, canvasHeight){
	this.mainMap = new Map(gc.mainMapWidth, gc.mainMapHeight, gc.tileImgs[0]);
	this.mainMap.genGameMap();

	this.currMap = this.mainMap;

	// The player character -- see player.js for more information
	this.player = new Player(this.mainMap.mapPixSize.x / 2, 
								this.mainMap.mapPixSize.y / 2);
	this.frame = new Frame();
}

GameState.prototype.update = function (){
	this.player.update();
	this.frame.updateFrame(this.player.loc.x, this.player.loc.y);
};

GameState.prototype.draw = function (ctx){
	gs.frame.drawFrame(ctx);
	gs.player.drawPlayer(ctx);
};


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
	this.tileImgs = new Array();
	this.buildingImgs = new Array();
	this.obstacleImgs = new Array();
	this.itemImgs = new Array();
	this.heatImgs = new Array();

	this.itemNames = ['food', 'fuel', 'elec', 'scrap', 'parts'];
	this.itemFullNames = ['Food', 'Fuel', 'Electronics', 'Scrap', 'Parts'];

	// Odds of a non-snow tile forming (1 in 'x')
	this.altTileSpawnOdds = 20;
	// Number of obstacle generation passes to be run for the main map
	this.obstacleCount = 5000;
	this.buildingCount = 1500;
	// Number of random items scattered on the main map
	this.itemCount = 1000;

	this.mainMapWidth = 500;
	this.mainMapHeight = 500;
	this.playerStartPos = new Coord(this.mainMapWidth / 2, 
									this.mainMapHeight / 2);
}

// Preloads all necessary images for the game
GameConstants.prototype.loadAllImages = function (callbackFn) {
	// These should be updated as image file names change
	var playerImgName = 'player.png';
	var tileImgNames = ['terrain0.png', 'terrain1.png', 'terrain2.png'];
	var obstacleImgNames = ['obstacle0.png', 'obstacle1.png', 'obstacle2.png'];
	var buildingImgNames = ['building0.png', 'building1.png', 'building2.png'];
	var itemImgNames = ['item0.png', 'item1.png', 'item2.png', 'item3.png', 'item4.png'];
	var heatImgNames = ['heat0.png', 'heat1.png'];

	// Keep count of loaded images to make sure each is loaded before being
	// displayed. Otherwise, this would be callback hell, since image loading
	// is asynchronous.
	var loadCount = 0
	var loadLimit = 1 + tileImgNames.length + obstacleImgNames.length +
			buildingImgNames.length + itemImgNames.length + heatImgNames.length;

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

	// Load item images
	for (var i = 0; i < itemImgNames.length; i++){
		this.itemImgs[i] = new Image();
		this.itemImgs[i].src = 'bin/' + itemImgNames[i];
		this.itemImgs[i].onload = function (){
			loadCount++;
			if (loadCount === loadLimit){
				callbackFn();
			}
		};
	}

	// Load heat bar
		for (var i = 0; i < heatImgNames.length; i++){
		this.heatImgs[i] = new Image();
		this.heatImgs[i].src = 'bin/' + heatImgNames[i];
		this.heatImgs[i].onload = function (){
			loadCount++;
			if (loadCount === loadLimit){
				callbackFn();
			}
		};
	}
};