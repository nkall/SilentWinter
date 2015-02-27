function Map(mapWidth, mapHeight, defaultTile){
	// Size of the map in tiles
	this.mapSize = new Coord(mapWidth, mapHeight);
	// Likewise, in pixels
	this.mapPixSize = this.mapSize.toPixels();
	this.defaultTile = defaultTile;

	// 2d Array of tiles representing the game map
	this.map = null;

	// 2d Array with gaps showing location of items on map
	this.items = new Array();
}

Map.prototype.addItems = function(){
	for (var i = 0; i < gc.itemCount; i++) {
		// Generate random item location
		var itemLoc = new Coord(Math.floor(Math.random() * this.mapSize.x),
								Math.floor(Math.random() * this.mapSize.y));
		// Generate random item image
		var itemImgIndex = Math.floor(Math.random() * gc.itemImgs.length);
		// Create item if not overlapping anything else
		if (!this.getTile(itemLoc).isObstructed){
			if (this.items[itemLoc.x] === undefined){
				this.items[itemLoc.x] = new Array();
			}
			this.items[itemLoc.x][itemLoc.y] = new Item();
		}
	};
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
 			newMap[x][y] = new Tile(tileImg, false, false);
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
		this.addObstacle(obstacleLoc, gc.obstacleImgs[obstacleImgIndex], false);
	}
};

Map.prototype.addBuildings = function (){
	for (var i = 0; i < gc.buildingCount; ++i){
		// Generate random obstacle location
		var buildingLoc = new Coord(Math.floor(Math.random() * this.mapSize.x),
								Math.floor(Math.random() * this.mapSize.y));
		// Generate random obstacle image
		var buildingImgIndex = Math.floor(Math.random() * gc.buildingImgs.length);
		this.addObstacle(buildingLoc, gc.buildingImgs[buildingImgIndex], true);
	}
};

Map.prototype.isOverlapping = function(obstructedTiles){
	// Check if overlapping other obstructions
	for (var i = 0; i < obstructedTiles.length; ++i){
		// Make sure this also works when obstacle is at map edge
		obstructedTiles[i].wrapAroundLimits(new Coord(0,0), 
						new Coord(this.mapSize.x, this.mapSize.y));
		if (this.getTile(obstructedTiles[i]).isObstructed){
			return true;
		}
	}
	// Check if overlapping player start position
	var playerStartLoc = new Coord(gc.mainMapWidth / 2, gc.mainMapHeight / 2);
	if (this.isNearObstacle(playerStartLoc, false)){
		return true;
	}
	return false;
};

// Returns true if one of the tiles surrounding the argument tile is a building,
// or if it is an obstacle in general, if needsToBeEnterable is false
Map.prototype.isNearObstacle = function (loc, needsToBeEnterable){
	var surroundingTiles = [loc
						   , new Coord(loc.x-1, loc.y-1)
						   , new Coord(loc.x-1, loc.y)
						   , new Coord(loc.x-1, loc.y+1)
						   , new Coord(loc.x, loc.y-1)
						   , new Coord(loc.x, loc.y+1)
						   , new Coord(loc.x+1, loc.y-1)
						   , new Coord(loc.x+1, loc.y)
						   , new Coord(loc.x+1, loc.y+1)
						   ];
	for (var i = 0; i < surroundingTiles.length; i++) {
		surroundingTiles[i].wrapAroundLimits();
		var currTile = this.getTile(surroundingTiles[i]);
		if (currTile.isObstructed){
			if (needsToBeEnterable){
				if (currTile.isEnterable){
					return true;
				}
			} else {
				return true;
			}
		}
	}
	return false;
};

Map.prototype.addObstacle = function (obstacleLoc, obstacleImg, isEnterable){
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
			// Make tiles obstructing, and enterable if applicable
			this.map[obstructedTiles[i].x][obstructedTiles[i].y].isObstructed = true;
			this.map[obstructedTiles[i].x][obstructedTiles[i].y].isEnterable = isEnterable;
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
	this.addItems();
};