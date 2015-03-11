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

WindowManager.prototype.handleMousePress = function (ctx, loc){
	for (var i = 0; i < this.buttons.length; i++){
		if (this.buttons[i].isColliding(loc)){
			this.activateButton(ctx, this.buttons[i]);
		}
	}
};

WindowManager.prototype.activateButton = function (ctx, button){
	if (button.txt == "Ok"){
		gs.player = new Player(gs.mainMap.mapPixSize.x / 2, 
								gs.mainMap.mapPixSize.y / 2);
		this.gameMode = "Scavenge";
	} else if (button.txt == "Next Season"){
		this.gameMode = "Dialog";
		var dialogData = this.prepareDialog();
		this.drawDialog(ctx, dialogData)
	} else if (button.txt == "Manage Base"){
		this.gameMode = "Upgrade";
	}
};

WindowManager.prototype.drawDialog = function (ctx, dialogData){
	ctx.drawImage(gc.uiElementImgs[3], 0, 0);
	this.drawPerson(ctx, 0);
	populationGain = dialogData[0];
	text = "";
	if (populationGain === 0){
		text = "Harsh winter storms meant that there were no visitors.";
	} else if (populationGain < 0){
		text = ("The winter was devastating, with " + (-populationGain).toString() + 
								" people dead from " + dialogData[1] + ".");
	} else if (populationGain === 1){
		text = "A lone wanderer came across your outpost, seeking refuge.";
	} else if (populationGain < 10){
		text = "A family of " + populationGain.toString() + " arrived at the bunker, seeking shelter.";
	} else {
		text = ("A small displaced village of " + populationGain.toString() +" people arrived at your outpost.");
	}

	ctx.save();
	ctx.font = '16pt Helvetica';
	ctx.fillStyle = '#FFFFFF';
	ctx.fillText(text, 350, 225);
	ctx.restore();

	this.buttons[0].drawButton(ctx);
};

WindowManager.prototype.prepareDialog = function (){
	gs.base.updateBaseSupplies();
	console.log(gs.base.inventory)
	var populationGain = 0;
	var causeOfDeath = null;
	if (gs.base.inventory.food < 0 && gs.base.inventory.fuel < 0){
		populationGain += gs.base.inventory.food + gs.base.inventory.fuel;
		causeOfDeath = "hunger and cold";
	} else if (gs.base.inventory.fuel < 0){
		populationGain += gs.base.inventory.fuel
		causeOfDeath = "hypothermia";
	} else if (gs.base.inventory.food < 0){
		populationGain += gs.base.inventory.food
		causeOfDeath = "starvation";
	} else {
		populationGain = Math.floor(Math.random() * 23);
	}
	gs.base.population += populationGain;
	if (gs.base.population < 1){
		populationGain -= gs.base.population - 2;
		gs.base.population = 1;
	}

	this.buttons = new Array();
	this.buttons[this.buttons.length] = new Button(new Coord(475,400), 
					gc.uiElementImgs[1], "Ok", new Coord(300, 75));
	return [populationGain, causeOfDeath]
};

WindowManager.prototype.setupBaseMenu = function (){
	gs.base.addToInventory(gs.player.inventory);
	this.buttons = new Array();
	this.buttons[this.buttons.length] = new Button(new Coord(550,240), 
					gc.uiElementImgs[1], "Manage Base", new Coord(400, 100));
	this.buttons[this.buttons.length] = new Button(new Coord(550,365), 
					gc.uiElementImgs[1], "Next Season", new Coord(400, 100));
};

WindowManager.prototype.drawBaseMenu = function (ctx){
	ctx.drawImage(gc.uiElementImgs[0], 0, 0);
	for (var i = 0; i < this.buttons.length; i++){
		this.buttons[i].drawButton(ctx);
	}
	gs.base.drawBase(ctx);
	this.drawPerson(ctx, 2);
};

WindowManager.prototype.drawPerson = function (ctx, index){
	ctx.drawImage(gc.peopleImgs[index], 0, 212);
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

function Button(loc, img, txt, imgSize){
	this.loc = loc;
	this.img = img;
	this.txt = txt;
	this.imgSize = imgSize;
}

Button.prototype.isColliding = function(loc) {
	if (loc.x >= this.loc.x && loc.x <= this.loc.x + this.imgSize.x && 
		loc.y >= this.loc.y && loc.y <= this.loc.y + this.imgSize.y){
		return true;
	}
}

Button.prototype.drawButton = function(ctx) {
	ctx.save();
	ctx.drawImage(this.img, this.loc.x, this.loc.y, this.imgSize.x, this.imgSize.y);
	ctx.font = '30pt Helvetica';
	ctx.fillStyle = '#0000000';
	ctx.textAlign = 'center';
	ctx.fillText(this.txt, this.loc.x + this.imgSize.x / 2, this.loc.y + this.imgSize.y / 2 + 10);

	ctx.restore();
};

Button.prototype.detectClick = function(loc) {
	
};