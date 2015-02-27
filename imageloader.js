
// Preloads all necessary images for the game
GameConstants.prototype.loadAllImages = function (callbackFn) {
	// These should be updated as image file names change
	var playerImgName = 'player.png';
	var tileImgNames = ['terrain0.png', 'terrain1.png', 'terrain2.png'];
	var obstacleImgNames = ['obstacle0.png', 'obstacle1.png', 'obstacle2.png'];
	var buildingImgNames = ['building0.png', 'building1.png', 'building2.png'];
	var itemImgNames = ['item0.png', 'item1.png', 'item2.png', 'item3.png', 'item4.png'];
	var heatImgNames = ['heat0.png', 'heat1.png'];
	var interiorWallNames = ['interior_wall0.png'];
	var interiorFloorNames = ['interior_floor0.png'];

	// Keep count of loaded images to make sure each is loaded before being
	// displayed. Otherwise, this would be callback hell, since image loading
	// is asynchronous.
	var loadCount = 0
	var loadLimit = 1 + tileImgNames.length + obstacleImgNames.length +
			buildingImgNames.length + itemImgNames.length + heatImgNames.length +
			interiorWallNames.length + interiorFloorNames.length;

	// Load player image
	this.playerImg = new Image();
	this.playerImg.src = 'bin/' + playerImgName;
	this.playerImg.onload = function (){
		loadCount++;
		if (loadCount === loadLimit){
			callbackFn();
		}
	};

	// Load tile images
	for (var i = 0; i < tileImgNames.length; i++){
		this.tileImgs[i] = new Image();
		this.tileImgs[i].src = 'bin/' + tileImgNames[i];
		this.tileImgs[i].onload = function (){
			loadCount++;
			if (loadCount === loadLimit){
				callbackFn();
			}
		};
	}

	// Load obstacle images
	for (var i = 0; i < obstacleImgNames.length; i++){
		this.obstacleImgs[i] = new Image();
		this.obstacleImgs[i].src = 'bin/' + obstacleImgNames[i];
		this.obstacleImgs[i].onload = function (){
			loadCount++;
			if (loadCount === loadLimit){
				callbackFn();
			}
		};
	}

	// Load building images
	for (var i = 0; i < buildingImgNames.length; i++){
		this.buildingImgs[i] = new Image();
		this.buildingImgs[i].src = 'bin/' + buildingImgNames[i];
		this.buildingImgs[i].onload = function (){
			loadCount++;
			if (loadCount === loadLimit){
				callbackFn();
			}
		};
	}

	// Load item images
	for (var i = 0; i < itemImgNames.length; i++){
		this.itemImgs[i] = new Image();
		this.itemImgs[i].src = 'bin/' + itemImgNames[i];
		this.itemImgs[i].onload = function (){
			loadCount++;
			if (loadCount === loadLimit){
				callbackFn();
			}
		};
	}

	// Load heat bar
		for (var i = 0; i < heatImgNames.length; i++){
		this.heatImgs[i] = new Image();
		this.heatImgs[i].src = 'bin/' + heatImgNames[i];
		this.heatImgs[i].onload = function (){
			loadCount++;
			if (loadCount === loadLimit){
				callbackFn();
			}
		};
	}

	// Load interior walls
	for (var i = 0; i < interiorWallNames.length; i++){
		this.interiorWallImgs[i] = new Image();
		this.interiorWallImgs[i].src = 'bin/' + interiorWallNames[i];
		this.interiorWallImgs[i].onload = function (){
			loadCount++;
			if (loadCount === loadLimit){
				callbackFn();
			}
		};
	}

	// Load interior floor
	for (var i = 0; i < interiorFloorNames.length; i++){
		this.interiorFloorImgs[i] = new Image();
		this.interiorFloorImgs[i].src = 'bin/' + interiorFloorNames[i];
		this.interiorFloorImgs[i].onload = function (){
			loadCount++;
			if (loadCount === loadLimit){
				callbackFn();
			}
		};
	}
};