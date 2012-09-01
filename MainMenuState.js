function MainMenuState(){
}

MainMenuState.prototype.init = function(){
    this.ps = new ParticleSystem();
	this.elements = [];
	this.elements.push([this.playButtonClicked, {x:7, y:3.5, w:2, h:2}]);
}

MainMenuState.prototype.pause = function(){
}

MainMenuState.prototype.resume = function(){

}

MainMenuState.prototype.render = function(ctx){
    ctx.fillStyle = "#7BC944";
    ctx.fillRect(0,0,16*GU,9*GU);
	ctx.fillStyle = 'red';
	ctx.fillRect(7*GU, 3.5*GU, 2*GU, 2*GU);
    this.ps.render(ctx);
}

MainMenuState.prototype.update = function(){
    this.ps.update();
	
}

MainMenuState.prototype.playButtonClicked = function(){
	sm.changeState('levelmenu');
}
