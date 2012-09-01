function MainMenuState(){
}

MainMenuState.prototype.init = function(){
	this.elements = [];
	this.elements.push([this.playButtonClicked, {x:7, y:3.5, w:2, h:2}]);
}

MainMenuState.prototype.pause = function(){
}

MainMenuState.prototype.resume = function(){

}

MainMenuState.prototype.render = function(ctx){
	ctx.fillStyle = 'red';
	ctx.fillRect(7*GU, 3.5*GU, 2*GU, 2*GU)	
}

MainMenuState.prototype.update = function(){
	
}

MainMenuState.prototype.playButtonClicked = function(){
	sm.changeState('levelmenu');
}
