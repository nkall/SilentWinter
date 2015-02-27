/*
 *  Player data, plus updating and drawing.
 */

function Player(x, y){
	// X and Y here are actual pixel coordinates, not tiles
	this.loc = new Coord(x,y);
	this.currentTileLoc = this.loc.toTiles();

	// Length/width of player's body, in pixels
	this.body_size = 32;
	// Degree angle player is oriented
	this.angle = 0;

	// True if that directional key is currently being held down
	this.isPressingUp = false;
	this.isPressingDown = false;
	this.isPressingLeft = false;
	this.isPressingRight = false;
	// Pixels moved per frame
	this.moveSpeed = 2;

	this.heat = 5000;
	this.heatBar = new HeatBar(this.heat);

	this.inventory = new Inventory(0,0,0,0,0);

	this.lastItemCollected = null;
	this.turnsSinceItemCollected = 50;
}

Player.prototype.update = function (){
	this.updatePos();
	this.updateStatus();
}

Player.prototype.updateStatus = function() {
	// Update heat readings
	this.heat--;
	this.heatBar.updateHeatBar(this.heat);
	if (this.heat < 0){this.heat = 0;}

	this.currentTileLoc = this.loc.toTiles();

	var item = gs.currMap.getItem(this.currentTileLoc);
	if (item !== undefined){
		this.inventory.collectItem(item);
		this.lastItemCollected = item;
		this.turnsSinceItemCollected = 0;
		gs.currMap.removeItem(this.currentTileLoc);
	} else {
		this.turnsSinceItemCollected++;
	}
};

// Moves the player based on keypresses
Player.prototype.updatePos = function (){
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

	// Reset position if walking off map
	nextPosition.wrapAroundLimits(new Coord(0,0), new Coord(gs.currMap.mapPixSize.x, 
															gs.currMap.mapPixSize.y));
	// Only move if the next position is not blocked
	if (this.canMoveTo(nextPosition, gs.currMap)){
		this.loc = nextPosition;	
	}
};

// Returns false if the requested destination is obstructed
Player.prototype.canMoveTo = function (nextPos){
	var nextPosTile = gs.currMap.getTile(nextPos.toTiles());
	return (!nextPosTile.isObstructed);
};

Player.prototype.drawPlayer = function (ctx){
	ctx.drawImage(gc.playerImg, (gc.canvasPixWidth - this.body_size) / 2, 
		(gc.canvasPixHeight - this.body_size) / 2);
	this.heatBar.drawHeatBar(ctx);

	if (gs.currMap.isNearObstacle(this.currentTileLoc, true)){
		wm.displayMessage(ctx, 'Press E to enter building');
	}
	if (this.turnsSinceItemCollected < 50){
		console.log(this.lastItemCollected);
		var itemMessage = (this.lastItemCollected.quantity.toString() + ' ' +
						gc.itemFullNames[this.lastItemCollected.itemType] + ' Collected');
		wm.displayMessage(ctx, itemMessage);
	}
};


function HeatBar(maxHeat){
	this.maxHeat = maxHeat;
	this.barWidth = gc.heatImgs[0].width;
	this.barHeight = gc.heatImgs[0].height;
	this.barFillLevel = gc.heatImgs[0].width;
}

HeatBar.prototype.updateHeatBar = function(heat){
	this.barFillLevel = this.barWidth * (heat / this.maxHeat);
};

HeatBar.prototype.drawHeatBar = function(ctx){
	ctx.drawImage(gc.heatImgs[0], 0, 0);
	ctx.drawImage(gc.heatImgs[1], 0, 0, this.barFillLevel, this.barHeight, 0, 0, 
												this.barFillLevel, this.barHeight);
};