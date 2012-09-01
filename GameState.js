function GameState() {
}

GameState.prototype.init = function(){
    this.level_data = [];
    this.elements = [];
    this.is_ready = false;
}

GameState.prototype.resume = function(message){
    this.readLevel(message);
}
GameState.prototype.levelDataLoaded = function(level_data) {
    this.level_data = level_data;
    this.ps = new ParticleSystem(this.level_data.emitter);
    this.windmills = [];
    for(var i=0;i<this.level_data.windmills.length;i++){
        var wm = this.level_data.windmills[i];
        this.windmills[i] = new Windmill(wm[0],wm[1],1,1,this.ps);
    }
    this.is_ready = true;
}

GameState.prototype.pause = function(){
	// pause
}

GameState.prototype.update = function() {
    if (!this.is_ready) return;
    this.ps.update();

    var completed = 0;
    for(var i=0;i<this.windmills.length;i++){
        this.windmills[i].update();
        completed += this.windmills[i].power > this.windmills[i].GOAL_POWER-10;
    }
    if(completed == this.windmills.length){
        /* TODO: do stuff when we win */
        sm.changeState("levelmenu");
    }
}

GameState.prototype.render = function(ctx) {
    if (!this.is_ready) return;

    for(var i=0;i<this.windmills.length;i++){
        this.windmills[i].render(ctx);
    }

    this.ps.render(ctx);
}

GameState.prototype.readLevel = function(level) {
    var self = this;
    ajax.get('levels/' + level + '.json', function(data) {
		if (data.substr(0,1) != "{") return false;
        self.levelDataLoaded(JSON.parse(data));
    });
}
