function Tile(imgIndex, hasObstacle, obstacleImgIndex){
	// Index of the tile image in GameConstant's tileImgs array
	this.imgIndex = imgIndex;
	this.hasObstacle = hasObstacle;
	// Index of obstacle image in obstacleImgs
	// Should be null if hasObstacle is false
	this.obstacleImgIndex = obstacleImgIndex;
}

Tile.prototype.renderTile = function() {
	return;
};