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
    console.log(this.elements);
}

LevelMenuState.prototype.pause = function() {
}

LevelMenuState.prototype.update = function() {
}
LevelMenuState.prototype.render = function(ctx) { 
    for (var i=0; i < this.levelTiles.length; i++) {
        var levelTile = this.levelTiles[i];
        ctx.fillStyle = 'blue';
        ctx.fillRect(levelTile.x*GU, levelTile.y*GU, levelTile.w*GU, levelTile.h*GU);
    }
}

LevelMenuState.prototype.chooseLevel = function( params ) {
    alert("You chose level " + (params[0]+1) + "!");
    sm.changeState("game", "1-" + params[0]);
}
