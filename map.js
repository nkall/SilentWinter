function Map(mapWidth, mapHeight){
	// Size of the map in tiles
	this.mapSize = new Coord(mapWidth, mapHeight);
	// Likewise, in pixels
	this.mapPixSize = this.mapSize.toPixels();

	// 2d Array of tiles representing the game map
	this.map = null;
	this.genGameMap();
}

Map.prototype.genTerrain = function (){
	var newMap = new Array();
 	for (var x = 0; x < this.mapSize.x; x++) {
 		newMap[x] = new Array();
 		for (var y = 0; y < this.mapSize.y; y++) {
 			// Generate random tile image
 			if (Math.floor(Math.random() * gc.altTileSpawnOdds) === 0){
 				var tileImgIndex = Math.floor(Math.random() * 
 								  gc.tileImgs.length);
 			} else {
 				var tileImgIndex = 0;
 			}
 			newMap[x][y] = new Tile(gc.tileImgs[tileImgIndex], false);
 		}
 	}
 	this.map = newMap;
};

Map.prototype.addObstacles = function (){
	for (var i = 0; i < gc.obstacleCount; ++i){
		// Generate random obstacle location
		obstacleLoc = new Coord(Math.floor(Math.random() * this.mapSize.x),
								Math.floor(Math.random() * this.mapSize.y));
		// Generate random obstacle image
		obstacleImgIndex = Math.floor(Math.random() * gc.obstacleImgs.length);
		this.map[obstacleLoc.x][obstacleLoc.y] = new Tile 
								(gc.obstacleImgs[obstacleImgIndex], true);
	}
};

// This function initializes the entire game map in a random fashion. In the
// future I plan to do things a bit smarter to generate lakes rather than
// puddles, for example.
Map.prototype.genGameMap = function() {
	this.genTerrain();
	this.addObstacles();
};

Map.prototype.getTile = function(loc){
	return this.map[loc.x][loc.y];
}