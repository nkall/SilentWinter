/*
 *  Functions to do with an individual tile, possibly including a building
 *  or obstacle
 */

function Tile(pic, isObstructed, isEnterable){
	// Index of the tile image in GameConstant's tileImgs array
	this.pic = pic;
	this.isObstructed = isObstructed;
	// Null unless the tile contains an obstruction/building
	this.obstaclePic = null;
	// Null unless the tile contains a building
	this.innerMap = null;
}

Tile.prototype.drawTile = function(pixLoc, offset, ctx) {
	if (this.pic !== null){
		ctx.drawImage(this.pic, pixLoc.x + offset.x, pixLoc.y + offset.y);
	}
};

Tile.prototype.drawObstacle = function (pixLoc, offset, ctx) {
	if (this.obstaclePic !== null){
		ctx.drawImage(this.obstaclePic, pixLoc.x + offset.x, pixLoc.y + offset.y);
	}
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
	// Limits default to the size of the main map
	if (lowerLim === undefined) {lowerLim = new Coord(0,0);}
	if (upperLim === undefined) {upperLim = new Coord(gc.mainMapWidth,
														   gc.mainMapHeight);}
	while (this.x < lowerLim.x) { this.x += upperLim.x - lowerLim.x; }
	while (this.x >= upperLim.x){ this.x -= upperLim.x - lowerLim.x; }
	while (this.y < lowerLim.y) { this.y += upperLim.y - lowerLim.y; }
	while (this.y >= upperLim.y){ this.y -= upperLim.y - lowerLim.y; }
};