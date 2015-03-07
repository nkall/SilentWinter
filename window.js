function WindowManager (){
	this.possibleGameModes = ["Scavenge", "Inventory", "Base", "Upgrade", "Dialog"];
	this.gameMode = this.possibleGameModes[0];

	this.buttons = new Array();
}

WindowManager.prototype.displayMessage = function(ctx, string) {
	var offset = 15;
	ctx.save();
	ctx.font = '20pt Helvetica';
	ctx.fillStyle = '#000000';
	ctx.fillText(string, offset, gc.canvasPixHeight - offset);
	ctx.restore();
};

WindowManager.prototype.displayTitle = function(ctx, string) {
	var offset = 50;
	ctx.save();
	ctx.font = '30pt Helvetica';
	ctx.fillStyle = '#FFFFFF';
	ctx.textAlign = 'center';
	ctx.fillText(string, gc.canvasPixWidth / 2, offset);
	ctx.restore();
};

WindowManager.prototype.drawInventoryContents = function (ctx){
	var imgSize = 96;
	var xPosition = 32;
	var textXPosition = 256;
	var yPosition = 32;
	var yPosIncrement = imgSize;
	for (var i = 0; i < gc.itemImgs.length; i++) {
		ctx.save();
		ctx.drawImage(gc.itemImgs[i], xPosition, yPosition, imgSize, imgSize);

		ctx.font = '20pt Helvetica';
		ctx.fillStyle = '#FFFFFF';
		ctx.fillText(gs.player.inventory[gc.itemNames[i]], textXPosition, yPosition + imgSize / 2);
		ctx.restore();
		yPosition += yPosIncrement;
	};
}

WindowManager.prototype.handleMousePress = function (loc){

};

WindowManager.prototype.setupBaseMenu = function (ctx){
	this.buttons[this.buttons.length] = new Button(new Coord(5,5), gc.uiElementImgs[1], "No");
};

WindowManager.prototype.drawBaseMenu = function (ctx){
	ctx.drawImage(gc.uiElementImgs[0], 0, 0);
	for (var i = 0; i < this.buttons.length; i++){
		this.buttons[0].drawButton(ctx);
	}
};

WindowManager.prototype.drawInventory = function (ctx){
	// Dim screen
	ctx.save();
	ctx.globalAlpha=0.8;
	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, gc.canvasPixWidth, gc.canvasPixHeight);
	ctx.restore();

	// Display inventory title
	this.displayTitle(ctx, 'Inventory');
	this.drawInventoryContents(ctx);
};

WindowManager.prototype.drawScavenge = function(ctx) {
	gs.frame.drawFrame(ctx);
	gs.player.drawPlayer(ctx);
};


WindowManager.prototype.update = function (){
	switch (this.gameMode){
		case "Scavenge":
			gs.player.update();
			gs.frame.updateFrame(gs.player.loc.x, gs.player.loc.y);
			break;
		case "Base":
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
			this.drawScavenge(ctx);
			break;
		case "Inventory":
			this.drawScavenge(ctx);
			this.drawInventory(ctx);
			break;
		case "Base":
			this.drawBaseMenu(ctx);
			break;
		case "Upgrade":
			break;
		case "Dialog":
			break;
	}
};

function Button(loc, img, txt){
	this.loc = loc;
	this.img = img;
	this.txt = txt;
}

Button.prototype.drawButton = function(ctx) {
	ctx.drawImage(this.img, this.loc.x, this.loc.y);
};

Button.prototype.detectClick = function(loc) {
	
};