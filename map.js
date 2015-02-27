function Map(mapWidth, mapHeight, defaultTile){
	// Size of the map in tiles
	this.mapSize = new Coord(mapWidth, mapHeight);
	// Likewise, in pixels
	this.mapPixSize = this.mapSize.toPixels();
	this.defaultTile = defaultTile;

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
 				var tileImg = gc.tileImgs[tileImgIndex];
 			} else {
 				var tileImg = this.defaultTile;
 			}
 			newMap[x][y] = new Tile(tileImg, false);
 		}
 	}
 	this.map = newMap;
};

Map.prototype.addObstacles = function (){
	for (var i = 0; i < gc.obstacleCount; ++i){
		// Generate random obstacle location
		var obstacleLoc = new Coord(Math.floor(Math.random() * this.mapSize.x),
								Math.floor(Math.random() * this.mapSize.y));
		// Generate random obstacle image
		var obstacleImgIndex = Math.floor(Math.random() * gc.obstacleImgs.length);
		// Create obstacle if not overlapping anything else
		this.addObstacle(obstacleLoc, gc.obstacleImgs[obstacleImgIndex]);
	}
};

Map.prototype.addBuildings = function (){
	for (var i = 0; i < gc.buildingCount; ++i){
		// Generate random obstacle location
		var buildingLoc = new Coord(Math.floor(Math.random() * this.mapSize.x),
								Math.floor(Math.random() * this.mapSize.y));
		// Generate random obstacle image
		var buildingImgIndex = Math.floor(Math.random() * gc.buildingImgs.length);
		this.addObstacle(buildingLoc, gc.buildingImgs[buildingImgIndex]);
	}
};

Map.prototype.isOverlapping = function(obstructedTiles){
	for (var i = 0; i < obstructedTiles.length; ++i){
		// Make sure this also works when obstacle is at map edge
		obstructedTiles[i].wrapAroundLimits(new Coord(0,0), 
						new Coord(this.mapSize.x, this.mapSize.y));
		if (this.getTile(obstructedTiles[i]).isObstructed){
			return true;
		}
	}
	return false;
};

Map.prototype.addObstacle = function (obstacleLoc, obstacleImg){
	// Obstacles take up four tiles, all with no image
	var obstructedTiles = new Array();
	obstructedTiles.push(new Coord(obstacleLoc.x, obstacleLoc.y))
	obstructedTiles.push(new Coord(obstacleLoc.x + 1, obstacleLoc.y));
	obstructedTiles.push(new Coord(obstacleLoc.x, obstacleLoc.y + 1));
	obstructedTiles.push(new Coord(obstacleLoc.x + 1, obstacleLoc.y + 1));

	if (!this.isOverlapping(obstructedTiles)){
		this.map[obstacleLoc.x][obstacleLoc.y].obstaclePic = obstacleImg;
		for (var i = 0; i < obstructedTiles.length; ++i){
			// Make sure this also works when obstacle is at map edge
			obstructedTiles[i].wrapAroundLimits(new Coord(0,0), 
						new Coord(this.mapSize.x, this.mapSize.y));
			// Make tiles obstructing, and null
			this.map[obstructedTiles[i].x][obstructedTiles[i].y].isObstructed = true;
		}
	}
};

Map.prototype.setTile = function (loc, tile){
	this.map[loc.x][loc.y] = tile;
};

Map.prototype.getTile = function (loc){
	return this.map[loc.x][loc.y];
};


// This function initializes the entire game map in a random fashion. In the
// future I plan to do things a bit smarter to generate lakes rather than
// puddles, for example.
Map.prototype.genGameMap = function() {
	this.genTerrain();
	this.addObstacles();
	this.addBuildings();
};