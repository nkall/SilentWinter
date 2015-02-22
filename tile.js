/*
 *  Functions to do with an individual tile, possibly including a building
 *  or obstacle
 */

function Tile(pic, isObstructed){
	// Index of the tile image in GameConstant's tileImgs array
	this.pic = pic;

	this.isObstructed = isObstructed;
}

Tile.prototype.drawTile = function(pixLoc, offset, ctx) {
	ctx.drawImage(this.pic, pixLoc.x + offset.x, pixLoc.y + offset.y);
};




function Coord(x, y){
	this.x = x;
	this.y = y;
}

Coord.prototype.set = function(x, y){
	this.x = x;
	this.y = y;
};

Coord.prototype.toPixels = function(){
	return (new Coord(this.x * gc.tileSize, this.y * gc.tileSize));
};

Coord.prototype.toTiles = function(){
	return (new Coord(Math.floor(this.x / gc.tileSize), 
					  Math.floor(this.y / gc.tileSize)));
};

// Fixes coordinates that are off the map, thereby 'wrapping around' the
// playable map surface, Mobius strip-style
Coord.prototype.wrapAroundLimits = function(lowerLim, upperLim){
	while (this.x < lowerLim.x) { this.x += upperLim.x - lowerLim.x; }
	while (this.x >= upperLim.x){ this.x -= upperLim.x - lowerLim.x; }
	while (this.y < lowerLim.y) { this.y += upperLim.y - lowerLim.y; }
	while (this.y >= upperLim.y){ this.y -= upperLim.y - lowerLim.y; }
};