function Map(mapWidth, mapHeight){
	// Size of the map in tiles
	this.mapSize = new Coord(mapWidth, mapHeight);
	// Likewise, in pixels
	this.mapPixSize = this.mapSize.toPixels();

	// 2d Array of tiles representing the game map
	this.map = this.genGameMap();
}

// This function initializes the entire game map in a random fashion. In the
// future I plan to do things a bit smarter to generate lakes rather than
// puddles, for example.
Map.prototype.genGameMap = function() {
	newMap = new Array();
 	for (var x = 0; x < this.mapSize.x; x++) {
 		newMap[x] = new Array();
 		for (var y = 0; y < this.mapSize.y; y++) {
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

Map.prototype.getTile = function(loc){
	return this.map[loc.x][loc.y];
}




function Frame(){
	// These values are set with updateFrame()
	// The indices of the map tile that is top-leftmost on the canvas
	this.frameStart = new Coord(0, 0);

	// Pixel distance from (0,0) that the top-leftmost tile should be drawn
	this.pixOffset = new Coord(0, 0);
}

// Returns an array of nearby obstacle coordinates
Frame.prototype.getObstaclesInFrame = function(){
	for (var x = 0; x < gc.canvasWidth; x++) {
		for (var y = 0; y < gc.canvasHeight; y++) {
			return;
		}
	}
}

// Updates the state of the frame (tiles displayed on canvas) based on player position
Frame.prototype.updateFrame = function (playerX, playerY){
	var firstTileLoc = new Coord(playerX - gc.canvasPixWidth / 2, 
								  playerY - gc.canvasPixHeight / 2);
	this.frameStart = firstTileLoc.toTiles();
	this.pixOffset.set(-(playerX % gc.tileSize), -(playerY % gc.tileSize));
};

Frame.prototype.drawFrame = function (ctx){
	for (var x = 0; x < gc.canvasWidth; x++) {
		for (var y = 0; y < gc.canvasHeight; y++) {
			var loc = new Coord(x + this.frameStart.x, y + this.frameStart.y);

			// If map edge reached, loop the map
			if (loc.x < 0){ loc.x += gs.mainMap.mapSize.x; }
			if (loc.x >= gs.mainMap.mapSize.x){ loc.x -= gs.mainMap.mapSize.x; }
			if (loc.y < 0){ loc.y += gs.mainMap.mapSize.y; }
			if (loc.y >= gs.mainMap.mapSize.y){ loc.y -= gs.mainMap.mapSize.y; }

			// Draw the tile at the given coordinates on screen
			var currTile = gs.mainMap.getTile(loc);
			currTile.drawTile((new Coord(x,y).toPixels()), this.pixOffset, ctx);
			// Draw the obstacle if it has one
			if (currTile.hasObstacle){
				//currTile.obstacle.drawObstacle(x, y, this.pixOffset.x, this.pixOffset.y, ctx);
			}
		}
	}
};