$(window).load(function(){
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");

	gs.constant.loadAllImages(function (imgList){
		console.log("yo");
	});
});
