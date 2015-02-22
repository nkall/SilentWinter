/*
 *  Player data, plus updating and drawing.
 */

function Player(x, y){
	// X and Y here are actual pixel coordinates, not tiles
	this.loc = new Coord(x,y);

	// Length/width of player's body, in pixels
	this.body_size = 16;

	// True if that directional key is currently being held down
	this.isPressingUp = false;
	this.isPressingDown = false;
	this.isPressingLeft = false;
	this.isPressingRight = false;

	this.moveSpeed = 2;
}

// Moves the player based on keypresses
Player.prototype.updatePos = function (mapPixWidth, mapPixHeight){
	// Update based on keypresses
	if (this.isPressingUp){ this.loc.y -= this.moveSpeed;}
	if (this.isPressingDown){ this.loc.y += this.moveSpeed; }
	if (this.isPressingLeft){ this.loc.x -= this.moveSpeed; }
	if (this.isPressingRight){ this.loc.x += this.moveSpeed; }

	// Reset position if walking off map
	if (this.loc.x < 0){ this.loc.x += mapPixWidth; }
	if (this.loc.x > gc.mapPixWidth){ this.loc.x -= mapPixWidth; }
	if (this.loc.y < 0){ this.loc.y += mapPixHeight; }
	if (this.loc.y > gc.mapPixHeight){ this.loc.y -= mapPixHeight; }
}

Player.prototype.drawPlayer = function (ctx){
	ctx.drawImage(gc.playerImg, (gc.canvasPixWidth - 
		this.body_size) / 2, (gc.canvasPixHeight - 
		this.body_size) / 2);
}