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
    this.gameMenuWindow = new GameMenuWindow(this);
}

GameState.prototype.resume = function(message){
    this.readLevel(message);
    this.message = message;
}
GameState.prototype.restart = function() {
    sm.changeState("game", this.message);
}
GameState.prototype.levelDataLoaded = function(level_data) {
    this.level_data = level_data;
    this.ps = new ParticleSystem(this.level_data.emitter, this.level_data.attractors);
    this.windmills = [];
    for(var i=0;i<this.level_data.windmills.length;i++){
        var wm = this.level_data.windmills[i];
        this.windmills[i] = new Windmill(wm[0],wm[1],1,1,this.ps);
    }
    this.is_ready = true;
}

GameState.prototype.pause = function(){
    this.gameMenuWindow.hide();
}

GameState.prototype.update = function() {
    if (!this.is_ready) return;
    this.ps.update();
    this.gameObjectContainer.update();
    this.gameMenuWindow.update();

    var completed = 0;
    for(var i=0;i<this.windmills.length;i++){
        this.windmills[i].update();
        completed += this.windmills[i].power > this.windmills[i].GOAL_POWER-10;
    }
    if(completed == this.windmills.length){
        /* TODO: do stuff when we win */
        this.gameMenuWindow.show();
        console.log("showing gamemenuwindow");
    }
}

GameState.prototype.render = function(ctx) {
    if (!this.is_ready) return;

    for(var i=0;i<this.windmills.length;i++){
        this.windmills[i].render(ctx);
    }

    this.gameObjectContainer.render(ctx);
    this.ps.render(ctx);
    this.gameMenuWindow.render(ctx);
}

GameState.prototype.readLevel = function(level) {
    var self = this;
    ajax.get('levels/' + level + '.json', function(data) {
		if (data.substr(0,1) != "{") return false;
        level_data = JSON.parse(data);
        self.levelDataLoaded(level_data);
    });
}
