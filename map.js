function Map(mapWidth, mapHeight, defaultTile){
	// Size of the map in tiles
	this.mapSize = new Coord(mapWidth, mapHeight);
	// Likewise, in pixels
	this.mapPixSize = this.mapSize.toPixels();
	this.defaultTile = defaultTile;

	// 2d Array of tiles representing the map
	this.map = new Array();

	// 2d Array with gaps showing location of items on map
	this.items = new Array();
}

Map.prototype.addItem = function(loc) {
	// Generate random item image
	var itemImgIndex = Math.floor(Math.random() * gc.itemImgs.length);
	// Create item if not overlapping anything else or near building
	if (!this.getTile(loc).isObstructed && !this.isNearObstacle(loc, true)){
		if (this.items[loc.x] === undefined){
			this.items[loc.x] = new Array();
		}
		this.items[loc.x][loc.y] = new Item();
	}
};

Map.prototype.addItems = function(){
	for (var i = 0; i < gc.itemCount; i++) {
		// Generate random item location
		var itemLoc = new Coord(Math.floor(Math.random() * this.mapSize.x),
								Math.floor(Math.random() * this.mapSize.y));
		this.addItem(itemLoc);
	}
};

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
		var buildingImgIndex = Math.floor(Math.random() * gc.buildingImgs.length - 1) + 1;
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
		
		// Check if overlapping player start positions
		var playerStartLocs = [new Coord(this.mapSize.x / 2, this.mapSize.y / 2)
							   , new Coord(this.mapSize.x / 2-1, this.mapSize.y / 2)
							   , new Coord(this.mapSize.x / 2, this.mapSize.y / 2-1)
							   , new Coord(this.mapSize.x / 2-1, this.mapSize.y / 2-1)
							   ];
		for (var j = 0; j < playerStartLocs.length; j++) {
			if (obstructedTiles[i].x === playerStartLocs[j].x &&
				obstructedTiles[i].y === playerStartLocs[j].y){
				return true;
			}
		};
	}
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

Map.prototype.createInteriorMap = function (loc){
	// Make sure the map is the same for all tiles comprising the building
	var possibleBuildTiles = [new Coord(loc.x-1, loc.y-1)
						   , new Coord(loc.x-1, loc.y)
						   , new Coord(loc.x-1, loc.y+1)
						   , new Coord(loc.x, loc.y-1)
						   , new Coord(loc.x, loc.y+1)
						   , new Coord(loc.x+1, loc.y-1)
						   , new Coord(loc.x+1, loc.y)
						   , new Coord(loc.x+1, loc.y+1)
						   ];
	var buildTiles = [loc];
	for (var i = 0; i < possibleBuildTiles.length; i++) {
		possibleBuildTiles[i].wrapAroundLimits();
		var currTile = this.getTile(possibleBuildTiles[i]);
		if (currTile.isEnterable){
			buildTiles[buildTiles.length] = possibleBuildTiles[i];
		}
	}
	var interiorMap = this.genInteriorMap();
	for (var i = 0; i < buildTiles.length; i++) {
		this.map[buildTiles[i].x][buildTiles[i].y].innerMap = interiorMap;
	}
	console.log(this.map[buildTiles[0].x][buildTiles[0].y]);
	return interiorMap;
};

// If there is a building nearby, this returns the location of
// the nearby tile of the building.  Otherwise, it returns null
Map.prototype.getNearbyBuildingLocation = function (loc){
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
		if (currTile.isObstructed && currTile.isEnterable){
			return surroundingTiles[i];
		}
	}
	return null;
};

// Adds a new obstacle to the map if certain conditions are met
Map.prototype.addObstacle = function (obstacleLoc, obstacleImg, isEnterable){
	// Obstacles take up four tiles, all with no image
	var obstructedTiles = new Array();
	obstructedTiles.push(new Coord(obstacleLoc.x, obstacleLoc.y))
	obstructedTiles.push(new Coord(obstacleLoc.x + 1, obstacleLoc.y));
	obstructedTiles.push(new Coord(obstacleLoc.x, obstacleLoc.y + 1));
	obstructedTiles.push(new Coord(obstacleLoc.x + 1, obstacleLoc.y + 1));

	// Obstacles can't be overlapping & buildings can't horizontally border another building
	if (!this.isOverlapping(obstructedTiles) && !this.isNearObstacle(obstacleLoc, true) && 
		!this.isNearObstacle(obstructedTiles[1], true) && 
		!this.isNearObstacle(obstructedTiles[2], true) && 
		!this.isNearObstacle(obstructedTiles[3], true)){
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

Map.prototype.getItem = function (loc){
	if (this.items[loc.x] !== undefined){
		return this.items[loc.x][loc.y];
	}
	return undefined;
};

Map.prototype.removeItem = function (loc){
	if (this.items[loc.x] !== undefined){
		this.items[loc.x][loc.y] = undefined;
	}
};

Map.prototype.getTile = function (loc){
	//if (this.map[loc.x] === undefined){
	//	console.trace();
	//}
	return this.map[loc.x][loc.y];
};


// This function initializes the main game map in a random fashion
Map.prototype.genGameMap = function() {
	// Generate snowy ground
	this.genTerrain();
	// Add home base
	var homeBaseLoc = new Coord(this.mapSize.x / 2 - 1, this.mapSize.y / 2 - 3);
	this.addObstacle(homeBaseLoc, gc.buildingImgs[0], true);

	this.addObstacles();
	this.addBuildings();
	this.addItems();
};

// Hardcoded for now, but will have different forms in the future
Map.prototype.genInteriorMap = function() {
	var newMap = new Map(gc.interiorMapSize, gc.interiorMapSize, gc.tileImgs[0]);
	for (var x = 0; x < newMap.mapSize.x; x++) {
 		newMap.map[x] = new Array();
 		for (var y = 0; y < newMap.mapSize.y; y++) {
 			newMap.map[x][y] = new Tile(gc.tileImgs[0], false, false);
 		}
 	}

 	var mapCent = new Coord(newMap.mapSize.x / 2, newMap.mapSize.y / 2);
 	var floorTiles = [mapCent
 					, new Coord(mapCent.x-1, mapCent.y)
 					, new Coord(mapCent.x, mapCent.y-1)
 					, new Coord(mapCent.x-1, mapCent.y-1)
 					, new Coord(mapCent.x-1, mapCent.y-2)
 					, new Coord(mapCent.x, mapCent.y-2)
 					, new Coord(mapCent.x-1, mapCent.y-3)
 					, new Coord(mapCent.x, mapCent.y-3)
 					];
 	for (var i = 0; i < floorTiles.length; i++) {
 		newMap.map[floorTiles[i].x][floorTiles[i].y].pic = gc.interiorFloorImgs[0];
 	};
 	var wallTiles = [new Coord(mapCent.x-2, mapCent.y)
 					, new Coord(mapCent.x-2, mapCent.y-1)
 					, new Coord(mapCent.x-2, mapCent.y-2)
 					, new Coord(mapCent.x-2, mapCent.y-3)
 					, new Coord(mapCent.x-2, mapCent.y-4)
 					, new Coord(mapCent.x-2, mapCent.y+1)
 					, new Coord(mapCent.x+1, mapCent.y)
 					, new Coord(mapCent.x+1, mapCent.y-1)
 					, new Coord(mapCent.x+1, mapCent.y-2)
 					, new Coord(mapCent.x+1, mapCent.y-3)
 					, new Coord(mapCent.x+1, mapCent.y-4)
 					, new Coord(mapCent.x+1, mapCent.y+1)
 					, new Coord(mapCent.x-1, mapCent.y-4)
 					, new Coord(mapCent.x, mapCent.y-4)
 					, new Coord(mapCent.x, mapCent.y+1)
 					];
 	for (var i = 0; i < wallTiles.length; i++) {
 		newMap.map[wallTiles[i].x][wallTiles[i].y].pic = gc.interiorWallImgs[0];
 		newMap.map[wallTiles[i].x][wallTiles[i].y].isObstructed = true;
 	};

 	newMap.addItem(new Coord(mapCent.x, mapCent.y-3));

	return newMap;
};