function Frame(){
	// These values are set with updateFrame()
	// The indices of the map tile that is top-leftmost on the canvas
	this.frameStart = new Coord(0, 0);

	// Pixel distance from (0,0) that the top-leftmost tile should be drawn
	this.pixOffset = new Coord(0, 0);
}

// Updates the state of the frame (tiles displayed on canvas) based on player position
Frame.prototype.updateFrame = function (playerX, playerY){
	var firstTileLoc = new Coord(playerX - gc.canvasPixWidth / 2, 
								  playerY - gc.canvasPixHeight / 2);
	this.frameStart = firstTileLoc.toTiles();
	this.pixOffset.set(-(playerX % gc.tileSize), -(playerY % gc.tileSize));
};

Frame.prototype.drawTerrain = function(ctx, map){
	for (var x = -1; x < gc.canvasWidth; x++) {
		for (var y = -1; y < gc.canvasHeight; y++) {
			var loc = new Coord(x + this.frameStart.x, y + this.frameStart.y);

			// If map edge reached, loop the map
			loc.wrapAroundLimits();

			// Draw the tile at the given coordinates on screen
			var currTile = map.getTile(loc);
			currTile.drawTile((new Coord(x,y).toPixels()), this.pixOffset, ctx);
		}
	}	
};

Frame.prototype.drawObstacles = function(ctx, map){
	for (var x = -1; x < gc.canvasWidth; x++) {
		for (var y = -1; y < gc.canvasHeight; y++) {
			var loc = new Coord(x + this.frameStart.x, y + this.frameStart.y);

			// If map edge reached, loop the map
			loc.wrapAroundLimits();

			// Draw the tile at the given coordinates on screen
			var currTile = gs.mainMap.getTile(loc);
			currTile.drawObstacle((new Coord(x,y).toPixels()), this.pixOffset, ctx);

			// Draw items, if applicable
			var item = map.getItem(loc);
			if (item !== undefined){
				map.items[loc.x][loc.y].drawItem((new Coord(x,y).toPixels()), this.pixOffset, ctx);
			}
		}
	}
}

Frame.prototype.drawFrame = function (ctx, map){
	this.drawTerrain(ctx, map);
	this.drawObstacles(ctx, map);
};