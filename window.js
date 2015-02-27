function WindowManager (){

}

WindowManager.prototype.displayMessage = function(ctx, string) {
	var offset = 15;
	ctx.font = '30pt Helvetica';
	ctx.fillStyle = '#000000';
	ctx.fillText(string, offset, gc.canvasPixHeight - offset);
};