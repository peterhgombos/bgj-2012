function CreditsState(){
}

CreditsState.prototype.init = function(){
    this.background = loadImage("resources/creditsbg.png");
    this.sky = loadImage("resources/skybg.png");
    this.elements = [];
    this.backButtonObject = {x: 0.25, y: 0.25, w: 1.6, h: 0.6}
	this.elements.push([this.backButtonClicked, this.backButtonObject]);
    this.t = 0;
}

CreditsState.prototype.pause = function(){
}

CreditsState.prototype.resume = function(){

}

CreditsState.prototype.render = function(ctx){
    ctx.save();
    var scaler = 16*GU/1920;
    ctx.scale(scaler, scaler);
    ctx.globalCompositeOperation = "destination-over";
    ctx.drawImage(this.sky,-(t/4)%this.sky.width,0);
    ctx.drawImage(this.sky,-(t/4)%this.sky.width+this.sky.width,0);
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(this.background,0,0);
    ctx.restore();
}

CreditsState.prototype.update = function(){
    this.t++;
}

CreditsState.prototype.backButtonClicked = function(){
	sm.changeState('mainmenu','', 'slide-left', 15);
}
