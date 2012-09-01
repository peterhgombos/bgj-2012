function MainMenuState(){
}

MainMenuState.prototype.init = function(){
	this.bgx = 0;
	this.bgY = 0;
	this.pbX = 0;
	this.pbY = 0;

	this.bgtile = new Image();

}

MainMenuState.prototype.pause = function(){
}

MainMenuState.prototype.resume = function(){
}

MainMenuState.prototype.render = function(ctx){
	ctx.fillStyle = 'red';
	ctx.fillRect(3*GU, 8*GU, 4*GU, 7*GU)	
}

MainMenuState.prototype.update = function(){
}
