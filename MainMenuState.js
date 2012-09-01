function MainMenuState(){
}

MainMenuState.prototype.init = function(){
	this.bgx = 0;
	this.bgY = 0;
	this.pbX = 0;
	this.pbY = 0;

	this.bgtile = new Image();

    this.ps = new ParticleSystem();

}

MainMenuState.prototype.pause = function(){
}

MainMenuState.prototype.resume = function(){
}

MainMenuState.prototype.render = function(ctx){
	ctx.fillStyle = 'red';
	ctx.fillRect(7*GU, 3.5*GU, 2*GU, 2*GU);
    this.ps.render(ctx);
}

MainMenuState.prototype.update = function(){
    this.ps.update();
}
