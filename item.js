function Item(pic, itemType, quantity){
	this.pic = pic;
	this.itemType = itemType;
	this.quantity = quantity;
	if (pic === undefined && itemType === undefined && quantity === undefined){
		this.genRandomItem();
	}
}

Item.prototype.genRandomItem = function() {
	var itemTypeIndex = Math.floor(Math.random() * gc.itemImgs.length);
	// Random quantity between 1 and 100
	var quantity = Math.floor(Math.random() * 100) + 1;
	this.pic = gc.itemImgs[itemTypeIndex];
	this.itemType = gc.itemNames[itemTypeIndex];
	this.quantity = quantity;
};

Item.prototype.drawItem = function(pixLoc, offset, ctx) {
	if (this.pic !== null){
		ctx.drawImage(this.pic, pixLoc.x + offset.x, pixLoc.y + offset.y);
	}
};

function Inventory(food, fuel, elec, scrap, parts){
	this.food = food;
	this.fuel = fuel;
	this.elec = elec;
	this.scrap = scrap;
	this.parts = parts;
}

Inventory.prototype.collectItem = function (item){
	this[item.itemType] += item.quantity;
};