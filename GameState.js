function GameState() {
}

GameState.prototype.init = function(){
    var self = this;
    this.level_data = [];
    this.elements = [];
    this.is_ready = false;
    this.gameObjectContainer = new GameObjectContainer(this.level_data.attractors);
    this.gameArea = {position:{x:0,y:0}, size: {w:14, h:9}};
    cdd.makeDroppable(this.gameArea, {
            "drop":function(e){
                self.ps.activateAttractor(e.draggable);
            }
    });
}

GameState.prototype.resume = function(message){
    this.readLevel(message);
}
GameState.prototype.levelDataLoaded = function(level_data) {
    this.level_data = level_data;
    this.ps = new ParticleSystem(this.level_data.emitter, this.level_data.attractors);
    this.is_ready = true;
}

GameState.prototype.pause = function(){
	// pause
}

GameState.prototype.update = function() {
    if (!this.is_ready) return;
    this.ps.update();
    this.gameObjectContainer.update();
}

GameState.prototype.render = function(ctx) {
    if (!this.is_ready) return;
    ctx.fillStyle = "yellow";
    for (var i=0; i<this.level_data.windmills.length; i++) {
        var windmill = this.level_data.windmills[i];
        ctx.fillRect((windmill[0]-.5)*GU, (windmill[1]-.5)*GU, GU, GU);
    }

    this.gameObjectContainer.render(ctx);
    this.ps.render(ctx);
}

GameState.prototype.readLevel = function(level) {
    var self = this;
    ajax.get('levels/' + level + '.json', function(data) {
		if (data.substr(0,1) != "{") return false;
        level_data = JSON.parse(data);
        self.levelDataLoaded(level_data);
    });
}
