function Base(){
	this.inventory = new Inventory(50,50,0,0,0);
	this.population = 1;
	this.img = gc.baseImg;
	this.livingImgs = [gc.baseUpgradeImgs[0], gc.baseUpgradeImgs[1]];
	this.generatorImgs = [gc.baseUpgradeImgs[2], gc.baseUpgradeImgs[3]];
	this.greenhouseImgs = [gc.baseUpgradeImgs[4], gc.baseUpgradeImgs[5]];

	this.livingLvl = 0;
	this.generatorLvl = 0;
	this.greenhouseLvl = 0;
}

Base.prototype.drawBase = function(ctx) {
	ctx.drawImage(this.img, 100, 30);
	if (this.livingLvl > 0) {
		ctx.drawImage(this.livingImgs[this.livingLvl - 1], 100, 30);
	}
	if (this.generatorLvl > 0) {
		ctx.drawImage(this.generatorImgs[this.generatorLvl - 1], 100, 30);
	}
	if (this.greenhouseLvl > 0) {
		ctx.drawImage(this.greenhouseImgs[this.greenhouseLvl - 1], 100, 30);
	}
};

Base.prototype.updateBaseSupplies = function (){
	this.inventory.food -= this.population;
	this.inventory.fuel -= this.population;
	if (this.generatorLvl === 0){
		this.inventory.fuel += 5;
	} else if (this.generatorLvl === 1){
		this.inventory.fuel += 25;
	} else if (this.generatorLvl === 2){
		this.inventory.fuel += 50;
	}

	if (this.greenhouseLvl === 0){
		this.inventory.food += 5;
	} else if (this.greenhouseLvl === 1){
		this.inventory.food += 25;
	} else if (this.greenhouseLvl === 2){
		this.inventory.food += 50;
	}
	if (this.population < 15){
		this.livingLvl = 0;
	} else if (this.population < 30){
		this.livingLvl = 1;
	} else {
		this.livingLvl = 2;
	}
};

Base.prototype.addToInventory = function(otherInventory) {
	this.inventory.food += otherInventory.food;
	this.inventory.fuel += otherInventory.fuel;
	this.inventory.elec += otherInventory.elec;
	this.inventory.scrap += otherInventory.scrap;
	this.inventory.parts += otherInventory.parts;
};