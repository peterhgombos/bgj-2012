function MainMenuState(){
}

MainMenuState.prototype.init = function(){
    this.background = loadImage("resources/mainstaticbg.png");
    this.sky = loadImage("resources/skybg.png");
    this.blades = loadImage("resources/blades.png");
    this.elements = [];
    this.playButton = {x:1.4, y:3.6, w:3.4, h:1.5};
	this.elements.push([this.playButtonClicked, this.playButton ]);
    this.t = 0;
}

MainMenuState.prototype.pause = function(){
}

MainMenuState.prototype.resume = function(){

}

MainMenuState.prototype.render = function(ctx){
    ctx.save();
    var scaler = 16*GU/1920;
    ctx.scale(scaler, scaler);
    ctx.globalCompositeOperation = "destination-over";
    ctx.drawImage(this.sky,-(t/4)%this.sky.width,0);
    ctx.drawImage(this.sky,-(t/4)%this.sky.width+this.sky.width,0);
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(this.background,0,0);
    ctx.translate(13.2*GU/scaler,3.0*GU/scaler);
    ctx.rotate(-this.t/300);
    ctx.drawImage(this.blades,-this.blades.width/2,-this.blades.height/2);
    ctx.restore();
}

MainMenuState.prototype.update = function(){
    this.t++;
}

MainMenuState.prototype.playButtonClicked = function(){
	sm.changeState('levelmenu','', 'slide-left', 15);
}
