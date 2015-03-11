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
	this.base = new Base();
	this.frame = new Frame();
}

GameState.prototype.enterBuilding = function() {
	var buildingLoc = this.currMap.getNearbyBuildingLocation(this.player.loc.toTiles());
	if (this.mainMap.buildingIsBase(buildingLoc)){
		this.base.addToInventory(gs.player.inventory);
		wm.setupBaseMenu();
		wm.gameMode = "Base";
	} else if (buildingLoc !== null){
		if (this.currMap === this.mainMap){
			this.player.mainLoc = this.player.loc;
			var innerMap = this.currMap.getTile(buildingLoc).innerMap;
			if (innerMap === null){
				this.currMap = this.currMap.createInteriorMap(buildingLoc);
			} else {
				this.currMap = innerMap;
			}
			this.player.loc = new Coord(this.currMap.mapPixSize.x / 2, this.currMap.mapPixSize.y / 2);
		} else {
			this.player.loc = this.player.mainLoc;
			this.currMap = this.mainMap;
		}
	};
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
	// Remains uninitialized until loadAllImages() is called in imageloader.js
	this.playerImg = null;
	this.tileImgs = new Array();
	this.buildingImgs = new Array();
	this.obstacleImgs = new Array();
	this.itemImgs = new Array();
	this.heatImgs = new Array();
	this.interiorWallImgs = new Array();
	this.interiorFloorImgs = new Array();
	this.uiElementImgs = new Array();
	this.baseImg = null;
	this.baseUpgradeImgs = new Array();
	this.peopleImgs = new Array();

	this.itemNames = ['food', 'fuel', 'elec', 'scrap', 'parts'];
	this.itemFullNames = ['Food', 'Fuel', 'Electronics', 'Scrap', 'Parts'];

	// Odds of a non-snow tile forming (1 in 'x')
	this.altTileSpawnOdds = 20;
	// Number of obstacle generation passes to be run for the main map
	this.obstacleCount = 5000;
	this.buildingCount = 1000;
	// Number of random items scattered on the main map
	this.itemCount = 1000;

	this.mainMapWidth = 500;
	this.mainMapHeight = 500;
	this.playerStartPos = new Coord(this.mainMapWidth / 2, 
									this.mainMapHeight / 2);

	this.interiorMapSize = 50;
}