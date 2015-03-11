
// Preloads all necessary images for the game
GameConstants.prototype.loadAllImages = function (callbackFn) {
	// These should be updated as image file names change
	var playerImgName = 'player.png';
	var tileImgNames = ['terrain0.png', 'terrain1.png', 'terrain2.png', 'terrain3.png', 
						'terrain4.png', 'terrain5.png'];
	var obstacleImgNames = ['obstacle0.png', 'obstacle1.png', 'obstacle2.png'];
	var buildingImgNames = ['building0.png', 'building1.png', 'building2.png'];
	var itemImgNames = ['item0.png', 'item1.png', 'item2.png', 'item3.png', 'item4.png'];
	var heatImgNames = ['heat0.png', 'heat1.png'];
	var interiorWallNames = ['interior_wall0.png'];
	var interiorFloorNames = ['interior_floor0.png'];
	var uiElementNames = ['ui0.png', 'ui1.png', 'ui2.png', 'ui3.png'];
	var baseImgName = 'base.png';
	var baseUpgradeNames = ['base_living1.png', 'base_living2.png', 'base_generators1.png',
							'base_generators2.png', 'base_greenhouse1.png', 'base_greenhouse2.png'];
	var peopleImgNames = ['person0.png', 'person1.png', 'person2.png'];

	// Keep count of loaded images to make sure each is loaded before being
	// displayed. Otherwise, this would be callback hell, since image loading
	// is asynchronous.
	var loadCount = 0;
	var loadLimit = 2 + tileImgNames.length + obstacleImgNames.length +
			buildingImgNames.length + itemImgNames.length + heatImgNames.length +
			interiorWallNames.length + interiorFloorNames.length + uiElementNames.length +
			baseUpgradeNames.length + peopleImgNames.length;

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

	// Load menu background and buttons
	for (var i = 0; i < uiElementNames.length; i++){
		this.uiElementImgs[i] = new Image();
		this.uiElementImgs[i].src = 'bin/' + uiElementNames[i];
		this.uiElementImgs[i].onload = function (){
			loadCount++;
			if (loadCount === loadLimit){
				callbackFn();
			}
		};
	}
	
	// Load main base image
	this.baseImg = new Image();
	this.baseImg.src = 'bin/' + baseImgName;
	this.baseImg.onload = function (){
		loadCount++;
		if (loadCount === loadLimit){
			callbackFn();
		}
	};

	// Load upgraded base overlay images
	for (var i = 0; i < baseUpgradeNames.length; i++){
		this.baseUpgradeImgs[i] = new Image();
		this.baseUpgradeImgs[i].src = 'bin/' + baseUpgradeNames[i];
		this.baseUpgradeImgs[i].onload = function (){
			loadCount++;
			if (loadCount === loadLimit){
				callbackFn();
			}
		};
	}

	// Load people images
	for (var i = 0; i < peopleImgNames.length; i++){
		this.peopleImgs[i] = new Image();
		this.peopleImgs[i].src = 'bin/' + peopleImgNames[i];
		this.peopleImgs[i].onload = function (){
			loadCount++;
			if (loadCount === loadLimit){
				callbackFn();
			}
		};
	}
};