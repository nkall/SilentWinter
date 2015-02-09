function Tile(x, y, imgIndex, hasObstacle, obstacleImgIndex){
	// Index of the tile image in GameConstant's tileImgs array
	this.imgIndex = imgIndex;
	this.hasObstacle = hasObstacle;
	// Index of obstacle image in obstacleImgs
	// Should be null if hasObstacle is false
	this.obstacleImgIndex = obstacleImgIndex;
}

Tile.prototype.drawTile = function(x, y, xOffset, yOffset, ctx) {
	ctx.drawImage(gs.c.tileImgs[this.imgIndex], 
		(x * gs.c.tileSize) + xOffset, (y * gs.c.tileSize) + yOffset);
};