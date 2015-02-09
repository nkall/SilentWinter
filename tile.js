function Tile(mapXLoc, mapYLoc, imgIndex){
	// Coordinates of tile in game map (not canvas)
	this.x = mapXLoc;
	this.y = mapYLoc;
	// Index of the tile image in GameConstant's tileImgs array
	this.imgIndex = imgIndex
}

Tile.prototype.renderTile = function() {
	
};