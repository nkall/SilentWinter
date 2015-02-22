function Map(mapWidth, mapHeight){
	// Size of the map in tiles
	this.mapWidth = mapWidth;
	this.mapHeight = mapHeight;
	// Likewise, in pixels
	this.mapPixWidth = this.mapWidth * gc.tileSize;
	this.mapPixHeight = this.mapHeight * gc.tileSize;

	// 2d Array of tiles representing the game map
	this.map = this.genGameMap();
}

// This function initializes the entire game map in a random fashion. In the
// future I plan to do things a bit smarter to generate lakes rather than
// puddles, for example.
Map.prototype.genGameMap = function() {
	newMap = new Array();
 	for (var x = 0; x < this.mapWidth; x++) {
 		newMap[x] = new Array();
 		for (var y = 0; y < this.mapHeight; y++) {
 			// Generate random tile image
 			if (Math.floor(Math.random() * gc.altTileSpawnOdds) === 0){
 				var tileImgIndex = Math.floor(Math.random() * 
 								  gc.tileImgs.length);
 			} else {
 				var tileImgIndex = 1;
 			}
 			// Small chance of generating obstacle
 			if ((Math.floor(Math.random() * gc.obstacleSpawnOdds)) === 5){
 				newMap[x][y] = new Tile(tileImgIndex, true);
 			} else { // Otherwise, empty tile
 				newMap[x][y] = new Tile(tileImgIndex, false);
 			}
 		}
 	}
 	return newMap;
};

Map.prototype.getTile = function(x, y){
	return this.map[x][y];
}




function Frame(){
	// These values are set with updateFrame()
	// The indices of the map tile that is top-leftmost on the canvas
	this.frameStartX = 0;
	this.frameStartY = 0;
	// Pixel distance from (0,0) that the top-leftmost tile should be drawn
	this.xOffset = 0;
	this.yOffset = 0;
}

// Updates the state of the frame (tiles displayed on canvas) based on player position
Frame.prototype.updateFrame = function (playerX, playerY){
	var firstTilePixX = (playerX - gc.canvasPixWidth / 2);
	var firstTilePixY = (playerY - gc.canvasPixHeight / 2);
	this.frameStartX = Math.floor(firstTilePixX / gc.tileSize);
	this.frameStartY = Math.floor(firstTilePixY / gc.tileSize);
	this.xOffset = -(playerX % gc.tileSize);
	this.yOffset = -(playerY % gc.tileSize);
};

Frame.prototype.drawFrame = function (ctx){
	for (var x = 0; x < gc.canvasWidth; x++) {
		for (var y = 0; y < gc.canvasHeight; y++) {
			var xCoord = x + this.frameStartX;
			var yCoord = y + this.frameStartY;

			// If map edge reached, loop the map
			if (xCoord < 0){ xCoord += gc.mapWidth; }
			if (xCoord >= gc.mapWidth){ xCoord -= gc.mapWidth; }
			if (yCoord < 0){ yCoord += gc.mapHeight; }
			if (yCoord >= gc.mapHeight){ yCoord -= gc.mapHeight; }

			// Draw the tile at the given coordinates on screen
			var currTile = gs.mainMap.getTile(xCoord, yCoord);
			currTile.drawTile(x, y, this.xOffset, this.yOffset, ctx);
			// Draw the obstacle if it has one
			if (currTile.hasObstacle){
				currTile.obstacle.drawObstacle(x, y, this.xOffset, this.yOffset, ctx);
			}
		}
	}
};