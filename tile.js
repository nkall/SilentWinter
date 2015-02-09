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
	if ((Math.floor(Math.random() * gs.c.buildingSpawnOdds)) === 0){
		var buildImgIndex = Math.floor(Math.random() * 
 						gs.c.buildingImgs.length);
 		this.obstacle = new Obstacle(true, buildImgIndex);
 	} else { // Otherwise, run of the mill obstacle
 		var obsImgIndex = Math.floor(Math.random() * 
 						gs.c.obstacleImgs.length);
 		this.obstacle = new Obstacle(false, obsImgIndex);
 	}
}

// Draws the tile, without any obstacle
Tile.prototype.drawTile = function(x, y, xOffset, yOffset, ctx) {
	ctx.drawImage(gs.c.tileImgs[this.imgIndex], 
		(x * gs.c.tileSize) + xOffset, (y * gs.c.tileSize) + yOffset);
};

function Obstacle(isBuilding, imgIndex){
	this.isBuilding = isBuilding;
	this.imgIndex = imgIndex;
}

Obstacle.prototype.drawObstacle = function(x, y, xOffset, yOffset, ctx) {
	if (this.isBuilding){
		ctx.drawImage(gs.c.buildingImgs[this.imgIndex], 
			(x * gs.c.tileSize) + xOffset, (y * gs.c.tileSize) + yOffset);
	} else {
		ctx.drawImage(gs.c.obstacleImgs[this.imgIndex], 
			(x * gs.c.tileSize) + xOffset, (y * gs.c.tileSize) + yOffset);
	}
}