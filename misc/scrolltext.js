$(document).ready(function(){
	var canvas = $("#canvas")[0];
	var context = canvas.getContext("2d");

	context.font="16px Verdana";

	var text = "This is a demonstration of the scrolling text functionality."

	var currLength = 0;
	setInterval( function(){
		if (currLength < text.length){
			currLength++;
		}
		context.rect(0,0,600,375);
		context.fillStyle="black";
		context.fill();
		context.fillStyle="white";
		context.fillText(text.substr(0, currLength), 50, 50);
	}, 100);
});
	
