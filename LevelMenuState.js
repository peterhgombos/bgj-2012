function LevelMenuState(){
}

LevelMenuState.prototype.init = function() {
    this.numberOfLevels = 15;
    this.elements = [];
    this.levelTiles = [];
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
    for (var i=0; i < this.levelTiles.length; i++) {
        var levelTile = this.levelTiles[i];
        ctx.fillStyle = 'grey';
        ctx.fillRect(levelTile.x*GU, levelTile.y*GU, levelTile.w*GU, levelTile.h*GU);
        ctx.fillStyle = 'white';
        ctx.font =  (GU)+"px Arial";
        ctx.textBaseline = 'hanging';
        ctx.textAlign = 'center';
        ctx.fillText(i+1, (levelTile.x+levelTile.w/2)*GU, (levelTile.y+levelTile.h/10)*GU);
    }
    ctx.fillStyle = 'grey';
    ctx.fillRect(this.backButtonObject.x*GU, this.backButtonObject.y*GU, this.backButtonObject.w*GU, this.backButtonObject.h*GU);
}

LevelMenuState.prototype.chooseLevel = function( params ) {
    alert("You chose level " + (params[0]+1) + "!");
    sm.changeState("game", "1-" + params[0]);
}

LevelMenuState.prototype.backButton = function( params ) {
    sm.changeState('mainmenu');
}
