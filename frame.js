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

Frame.prototype.drawFrame = function (ctx){
	for (var x = 0; x < gc.canvasWidth; x++) {
		for (var y = 0; y < gc.canvasHeight; y++) {
			var loc = new Coord(x + this.frameStart.x, y + this.frameStart.y);

			// If map edge reached, loop the map
			loc.wrapAroundLimits(new Coord(0,0), new Coord(gs.mainMap.mapSize.x,
														   gs.mainMap.mapSize.y));

			// Draw the tile at the given coordinates on screen
			var currTile = gs.mainMap.getTile(loc);
			if (x === 0 && currTile.isObstructed){
				console.log(currTile);
			}
			currTile.drawTile((new Coord(x,y).toPixels()), this.pixOffset, ctx);
		}
	}
};