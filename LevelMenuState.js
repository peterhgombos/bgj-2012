function LevelMenuState(){
}

LevelMenuState.prototype.init = function() {
    this.numberOfLevels = 15;
    this.background = loadImage("resources/levelmenustaticbg.png");
    this.sky = loadImage("resources/skybg.png");
    this.star = loadImage("resources/star.png");
    this.elements = [];
    this.levelSprites = [];
    this.levelTiles = [];
    this.t = 0;
    for(var i=0;i<15;i++){
        this.levelSprites[i] = loadImage("resources/"+(i+1)+".png");
    }
    this.lockedTile = loadImage("resources/locked.png");
}

LevelMenuState.prototype.resume = function() {
    for (var i=0;i<this.numberOfLevels;i++) {
            this.levelTiles[i] = {x: 1.5+2.75*(i%5), y: 1.5+2.25*((i/5)|0), w:2, h:2, locked:game_data.progress[i]<0, stars:Math.max(game_data.progress[i],0)};
        if(game_data.progress[i] >= 0){
            this.elements.push([this.chooseLevel, this.levelTiles[i], i ]);
        }
    }
    this.backButtonObject = {x: 0.25, y: 0.25, w: 1.6, h: 0.6}
    this.elements.push([this.backButton,this.backButtonObject]) 
}

LevelMenuState.prototype.pause = function() {
}

LevelMenuState.prototype.update = function() {
    this.t++;
}

LevelMenuState.prototype.render = function(ctx) { 
    ctx.save();
    var scaler = 16*GU/1920;
    ctx.scale(scaler,scaler);
    ctx.globalCompositeOperation = "destination-over";
    ctx.drawImage(this.sky,-(t/4)%this.sky.width,0);
    ctx.drawImage(this.sky,-(t/4)%this.sky.width+this.sky.width,0);
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(this.background,0,0);
    ctx.restore();
    for (var i=0; i < this.levelTiles.length; i++) {
        var levelTile = this.levelTiles[i];
        ctx.save();
        var scaler = 1.5*GU/this.levelSprites[i].width;
        ctx.translate(levelTile.x*GU, levelTile.y*GU);
        ctx.scale(scaler,scaler);
        ctx.drawImage(levelTile.locked?this.lockedTile:this.levelSprites[i],0,0);
        ctx.translate(0.36*GU/scaler, 1.30*GU/scaler);
        for(var j=0;j<levelTile.stars;j++){
            ctx.drawImage(this.star,0,0);
            ctx.translate(0.3*GU/scaler, 0);
        }
        ctx.restore();
    }
}

LevelMenuState.prototype.chooseLevel = function( params ) {
    sm.changeState("game", "1-" + (params[0]+1));
}

LevelMenuState.prototype.backButton = function( params ) {
    sm.changeState('mainmenu','', 'slide-right', 15);
}
