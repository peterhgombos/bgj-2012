function MainMenuState(){
}

MainMenuState.prototype.init = function(){
    this.background = loadImage("resources/mainmenubg.png");
    this.elements = [];
	this.elements.push([this.playButtonClicked, {x:7, y:6.5, w:2, h:2}]);
}

MainMenuState.prototype.pause = function(){
}

MainMenuState.prototype.resume = function(){

}

MainMenuState.prototype.render = function(ctx){
    ctx.save();
    var scaler = 16*GU/1920;
    ctx.scale(scaler, scaler);
    ctx.drawImage(this.background,0,0);
    ctx.restore();
	ctx.fillStyle = 'red';
	ctx.fillRect(7*GU, 6.5*GU, 2*GU, 2*GU);
}

MainMenuState.prototype.update = function(){
}

MainMenuState.prototype.playButtonClicked = function(){
	sm.changeState('levelmenu');
}
