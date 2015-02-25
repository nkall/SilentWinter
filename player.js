/*
 *  Player data, plus updating and drawing.
 */

function Player(x, y){
	// X and Y here are actual pixel coordinates, not tiles
	this.loc = new Coord(x,y);

	// Length/width of player's body, in pixels
	this.body_size = 32;

	// True if that directional key is currently being held down
	this.isPressingUp = false;
	this.isPressingDown = false;
	this.isPressingLeft = false;
	this.isPressingRight = false;
	// Pixels moved per frame
	this.moveSpeed = 2;

	this.heat = 2000;
}

// Returns false if the requested destination is obstructed
Player.prototype.canMoveTo = function (nextPos){
	var nextPosTile = gs.mainMap.getTile(nextPos.toTiles());
	return (!nextPosTile.isObstructed);
}

// Moves the player based on keypresses
Player.prototype.updatePos = function (mapPixWidth, mapPixHeight){
	var nextPosition = new Coord(this.loc.x, this.loc.y);
	// Update based on keypresses
	if (this.isPressingUp){
		nextPosition.y -= this.moveSpeed;
	}
	if (this.isPressingDown){
		nextPosition.y += this.moveSpeed;
	}
	if (this.isPressingLeft){
		nextPosition.x -= this.moveSpeed;
	}
	if (this.isPressingRight){
		nextPosition.x += this.moveSpeed;
	}

	// Only move if the next position is not blocked
	if (this.canMoveTo(nextPosition)){
		this.loc = nextPosition;
		// Reset position if walking off map
		this.loc.wrapAroundLimits(new Coord(0,0), new Coord(mapPixWidth, mapPixHeight));
	}
}

Player.prototype.drawPlayer = function (ctx){
	ctx.drawImage(gc.playerImg, (gc.canvasPixWidth - this.body_size) / 2, 
		(gc.canvasPixHeight - this.body_size) / 2);
}