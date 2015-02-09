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
}

// Moves the player based on keypresses
Player.prototype.updatePos = function (){
	// Update based on keypresses
	if (this.isPressingUp){ this.y -= 2;}
	if (this.isPressingDown){ this.y += 2; }
	if (this.isPressingLeft){ this.x -= 2; }
	if (this.isPressingRight){ this.x += 2; }

	// Reset position if walking off map
	if (this.x < 0){ this.x += gs.c.mapPixWidth; }
	if (this.x > gs.c.mapPixHeight){ this.x -= gs.c.mapPixHeight; }
	if (this.y < 0){ this.y += gs.c.mapPixHeight; }
	if (this.y > gs.c.mapPixHeight){ this.y -= gs.c.mapPixHeight; }
}

Player.prototype.drawPlayer = function (ctx){
	ctx.drawImage(gs.c.playerImg, (gs.c.canvasPixWidth - 
		this.body_size) / 2, (gs.c.canvasPixHeight - 
		this.body_size) / 2);
}