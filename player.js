function Player(x, y){
	// X and Y here are actual pixel coordinates, not tiles
	this.x = x;
	this.y = y;
	this.isPressingUp = false;
	this.isPressingDown = false;
	this.isPressingLeft = false;
	this.isPressingRight = false;
}

Player.prototype.updatePos = function (){
	if (this.isPressingUp) this.y -= 2;
	if (this.isPressingDown) this.y += 2;
	if (this.isPressingLeft) this.x -= 2;
	if (this.isPressingRight) this.x += 2;
}

function addKeyboardEvents(){
	document.addEventListener("keydown", function(e){
		switch(e.key){
			case "w":
			case "W":
			case "Up":
				gs.player.isPressingUp = true;
				break;
			case "s":
			case "S":
			case "Down":
				gs.player.isPressingDown = true;
				break;
			case "a":
			case "A":
			case "Left":
				gs.player.isPressingLeft = true;
				break;
			case "d":
			case "D":
			case "Right":
				gs.player.isPressingRight = true;
				break;
			default:
				break;
		}
	}, false);
	document.addEventListener("keyup", function(e){
		switch(e.key){
			case "w":
			case "W":
			case "Up":
				gs.player.isPressingUp = false;
				break;
			case "s":
			case "S":
			case "Down":
				gs.player.isPressingDown = false;
				break;
			case "a":
			case "A":
			case "Left":
				gs.player.isPressingLeft = false;
				break;
			case "d":
			case "D":
			case "Right":
				gs.player.isPressingRight = false;
				break;
			default:
				break;
		}

	}, false);
};