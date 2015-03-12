/*
 *  Player data, plus updating and drawing.
 */

function Player(x, y){
	// X and Y here are actual pixel coordinates, not tiles
	this.loc = new Coord(x,y);
	// Location on the main map
	this.mainLoc = this.loc;
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
	this.moveSpeed = 4;

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
	if (gs.currMap === gs.mainMap){
		this.heat--;
	}
	// Return to base if heat runs out
	if (this.heat < 1){
		gs.base.addToInventory(gs.player.inventory);
		wm.setupBaseMenu();
		wm.gameMode = "Base";
	}
	this.heatBar.updateHeatBar(this.heat);

	this.currentTileLoc = this.loc.toTiles();

	var item = gs.currMap.getItem(this.currentTileLoc);
	if (item !== undefined){
		this.inventory.collectItem(item);
		this.lastItemCollected = item;
		this.turnsSinceItemCollected = 0;
		gs.currMap.removeItem(this.currentTileLoc);
	} else {
		this.turnsSinceItemCollected++;
		if (this.turnsSinceItemCollected > 50){
			this.turnsSinceItemCollected = 50;
		}
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
		var buildingLoc = gs.currMap.getNearbyBuildingLocation(this.currentTileLoc);
		this.turnsSinceItemCollected = 50;
		if (gs.currMap.buildingIsBase(buildingLoc)){
			wm.displayMessage(ctx, 'Press E to return to base');
		} else {
			var movingDirection = 'enter';
			if (gs.currMap !== gs.mainMap){
				movingDirection = 'exit';
			}
			wm.displayMessage(ctx, 'Press E to ' + movingDirection + ' building');
		}
	}
	if (this.turnsSinceItemCollected < 50){
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
	ctx.drawImage(gc.heatImgs[0], 0, 0, this.barWidth, this.barHeight);
	ctx.drawImage(gc.heatImgs[1], 0, 0, this.barFillLevel, this.barHeight, 0, 0, 
												this.barFillLevel, this.barHeight);
	if (this.barFillLevel < 90){
		// Dim screen
		ctx.save();
		ctx.globalAlpha= 1 - (this.barFillLevel / 90);
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, gc.canvasPixWidth, gc.canvasPixHeight);
		ctx.restore();
	}
};