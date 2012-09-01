function LevelMenuState(){
}

LevelMenuState.prototype.init = function() {
    this.numberOfLevels = 15;
    //this.background = loadImage("resources/levelmenubg.png");
    this.elements = [];
    this.levelSprites = [];
    this.levelTiles = [];
    for(var i=0;i<15;i++){
        this.levelSprites[i] = loadImage("resources/"+(i+1)+".png");
    }
}

LevelMenuState.prototype.resume = function() {
    for (var i=0;i<this.numberOfLevels;i++) {
        this.levelTiles[i] = {x: 1.5+2.75*(i%5), y: 1.5+2.25*((i/5)|0), w:2, h:1.5, locked:true, stars:0};
        this.elements.push([this.chooseLevel, this.levelTiles[i], i ]);
    }
    this.backButtonObject = {x: 0.5, y: 0.5, w: 1.5, h: 0.5}
    this.elements.push([this.backButton,this.backButtonObject]) 
}

LevelMenuState.prototype.pause = function() {
}

LevelMenuState.prototype.update = function() {
}

LevelMenuState.prototype.render = function(ctx) { 
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,16*GU, 9*GU);
    for (var i=0; i < this.levelTiles.length; i++) {
        var levelTile = this.levelTiles[i];
        ctx.save();
        var scaler = GU/this.levelSprites[i].width;
        ctx.translate(levelTile.x*GU, levelTile.y*GU);
        ctx.scale(scaler,scaler);
        ctx.drawImage(this.levelSprites[i],0,0);
        ctx.restore();
    }
    ctx.fillStyle = 'grey';
    ctx.fillRect(this.backButtonObject.x*GU, this.backButtonObject.y*GU, this.backButtonObject.w*GU, this.backButtonObject.h*GU);
}

LevelMenuState.prototype.chooseLevel = function( params ) {
    alert("You chose level " + (params[0]+1) + "!");
    sm.changeState("game", "1-" + (params[0]+1));
}

LevelMenuState.prototype.backButton = function( params ) {
    sm.changeState('mainmenu');
}
