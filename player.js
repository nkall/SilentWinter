/*
 *  Player data, plus updating and drawing.
 */

function Player(x, y){
	// X and Y here are actual pixel coordinates, not tiles
	this.x = x;
	this.y = y;
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
	if (this.isPressingUp){ this.y -= this.moveSpeed;}
	if (this.isPressingDown){ this.y += this.moveSpeed; }
	if (this.isPressingLeft){ this.x -= this.moveSpeed; }
	if (this.isPressingRight){ this.x += this.moveSpeed; }

	// Reset position if walking off map
	if (this.x < 0){ this.x += mapPixWidth; }
	if (this.x > gc.mapPixWidth){ this.x -= mapPixWidth; }
	if (this.y < 0){ this.y += mapPixHeight; }
	if (this.y > gc.mapPixHeight){ this.y -= mapPixHeight; }
}

Player.prototype.drawPlayer = function (ctx){
	ctx.drawImage(gc.playerImg, (gc.canvasPixWidth - 
		this.body_size) / 2, (gc.canvasPixHeight - 
		this.body_size) / 2);
}