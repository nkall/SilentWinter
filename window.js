function WindowManager (){

}

WindowManager.prototype.displayMessage = function(ctx, string) {
	var offset = 15;
	ctx.font = '20pt Helvetica';
	ctx.fillStyle = '#000000';
	ctx.fillText(string, offset, gc.canvasPixHeight - offset);
	ctx.globalAlpha=1;
};