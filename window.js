function WindowManager (){
	this.possibleGameModes = ["Scavenge", "Inventory", "Upgrade", "Dialog"];
	this.gameMode = this.possibleGameModes[0];
}

WindowManager.prototype.displayMessage = function(ctx, string) {
	var offset = 15;
	ctx.font = '20pt Helvetica';
	ctx.fillStyle = '#000000';
	ctx.fillText(string, offset, gc.canvasPixHeight - offset);
	ctx.globalAlpha=1;
};


WindowManager.prototype.update = function (){
	switch (this.gameMode){
		case "Scavenge":
			gs.player.update();
			gs.frame.updateFrame(gs.player.loc.x, gs.player.loc.y);
			break;
		case "Inventory":
			break;
		case "Upgrade":
			break;
		case "Dialog":
			break;
	}
};

WindowManager.prototype.draw = function (ctx){
	switch (this.gameMode){
		case "Scavenge":
			gs.frame.drawFrame(ctx);
			gs.player.drawPlayer(ctx);
			break;
		case "Inventory":
			break;
		case "Upgrade":
			break;
		case "Dialog":
			break;
	}
};