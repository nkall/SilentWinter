/*
 *  Functions to do with an individual tile, possibly including a building
 *  or obstacle
 */

function Tile(imgIndex, hasObstacle){
	// Index of the tile image in GameConstant's tileImgs array
	this.imgIndex = imgIndex;

	this.hasObstacle = hasObstacle;
	// This field should remain null if hasObstacle is false
	this.obstacle = null;
	if (this.hasObstacle){
		this.addObstacle();
	}
}

// Adds an obstacle to the current tile (or possibly a building)
Tile.prototype.addObstacle = function (){
	// Small chance of being a building
	if ((Math.floor(Math.random() * gc.buildingSpawnOdds)) === 0){
		var buildImgIndex = Math.floor(Math.random() * 
 						gc.buildingImgs.length);
 		this.obstacle = new Obstacle(true, buildImgIndex);
 	} else { // Otherwise, run of the mill obstacle
 		var obsImgIndex = Math.floor(Math.random() * 
 						gc.obstacleImgs.length);
 		this.obstacle = new Obstacle(false, obsImgIndex);
 	}
}

// Draws the tile, without any obstacle
Tile.prototype.drawTile = function(pixLoc, offset, ctx) {
	ctx.drawImage(gc.tileImgs[this.imgIndex], 
		pixLoc.x + offset.x, pixLoc.y + offset.y);
};

function Obstacle(isBuilding, imgIndex){
	this.isBuilding = isBuilding;
	this.imgIndex = imgIndex;
}

Obstacle.prototype.drawObstacle = function(x, y, xOffset, yOffset, ctx) {
	if (this.isBuilding){
		ctx.drawImage(gc.buildingImgs[this.imgIndex], 
			(x * gc.tileSize) + xOffset, (y * gc.tileSize) + yOffset);
	} else {
		ctx.drawImage(gc.obstacleImgs[this.imgIndex], 
			(x * gc.tileSize) + xOffset, (y * gc.tileSize) + yOffset);
	}
}


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