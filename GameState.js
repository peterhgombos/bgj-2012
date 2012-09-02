function GameState() {
}

GameState.prototype.init = function(){
    var self = this;
    this.level_data = [];
    this.background = loadImage("resources/gamebg.png");
    this.completebox = loadImage("resources/completebox.png");
    this.tutorial_1 = loadImage("resources/tutorial_1.png");
    this.levels = {};
    for(var i=1;i<16;i++){
        this.levels["1-"+i] = this.readLevel("1-"+i);
    }
    this.elements = [
        [function(){self.restart()}, {x:15, y:8.1, w:.9, h:.7}],
        [function(){sm.changeState("levelmenu")}, {x:14, y:8.1, w:.9, h:.7}]
        ];
    this.is_ready = false;
}

GameState.prototype.resume = function(message){
    //this.readLevel(message);
    this.windmills = [];
    this.message = message;
    this.level_id = (function(){a=message.split("-");return (15*(a[0]-1))+(a[1]-1)})();
    console.log("Loaded level " + this.level_id);
    this.gameMenuWindow = new GameMenuWindow(this);
    this.has_won = false;
    this.is_ready = false;
    this.levelDataLoaded(this.levels[message]);
}
GameState.prototype.restart = function() {
    sm.changeState("game", this.message);
}
GameState.prototype.levelDataLoaded = function(level_data) {
    this.level_data = level_data;
    console.log(this.level_data);
    this.ps = new ParticleSystem(this.level_data.emitter, this.level_data.attractors.slice());
    for(var i=0;i<this.level_data.windmills.length;i++){
        var wm = this.level_data.windmills[i];
        this.windmills[i] = new Windmill(wm[0],wm[1],1,1,this.ps);
    }
    this.walls = [];
    for(var i=0;i<this.level_data.walls.length; i++) {
        var w = this.level_data.walls[i];
        this.walls[i] = new Wall(w.x, w.y, w.w, w.h, this.ps);
    }
    this.gameObjectContainer = new GameObjectContainer(this.level_data.attractors);
    this.is_ready = true;
}

GameState.prototype.pause = function(){
    cdd.reset();
    if (this.gameMenuWindow && this.gameMenuWindow.visible) this.gameMenuWindow.hide();
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
        if (this.doneTimer >= 0) this.doneTimer--;
    } else {
        this.doneTimer = 50;
    }

    if (this.doneTimer == 0 && !this.has_won) {
        this.has_won = true;
        this.win();
    }
}
GameState.prototype.win = function() {
    cdd.reset();
    var activeAttractors = this.ps.getActiveAttractors();
    var attractor_score = (3*this.level_data.minimum_attractors/activeAttractors.length)|0;
    if (attractor_score < 1) attractor_score = 1;
    if (attractor_score > 3) attractor_score = 3;
    this.gameMenuWindow.show(attractor_score);
    game_data["progress"][this.level_id] = Math.max(attractor_score, game_data["progress"][this.level_id]);
    if (game_data["progress"][this.level_id+1] == -1) game_data["progress"][this.level_id+1] = 0;
    saveData(game_data);
}

GameState.prototype.render = function(ctx) {
    if (!this.is_ready) return;

    var scaler = 16*GU/1920;
    ctx.save();
    ctx.scale(scaler,scaler);
    ctx.drawImage(this.background,0,0);
    ctx.restore();
    for(var i=0;i<this.windmills.length;i++){
        this.windmills[i].render(ctx);
    }
    for(var i=0;i<this.walls.length;i++){
        this.walls[i].render(ctx);
    }


    this.gameObjectContainer.render(ctx);
    this.ps.render(ctx);
    this.gameMenuWindow.render(ctx);
    /*for(var i=0;i<this.elements.length;i++) {
        var o = this.elements[i][1];
        ctx.fillStyle = "rgba(255,0,0,0.5)";
        ctx.fillRect(o.x*GU,o.y*GU,o.w*GU,o.h*GU);
    }*/
    
    if (game_data["progress"][this.level_id] == 0 && this.level_id == 0) {
        ctx.drawImage(this.tutorial_1, 8.5*GU, 5*GU, 5*GU, 3*GU);
    }
}

GameState.prototype.readLevel = function(level) {
    var self = this;
    loaded++;
    ajax.get('levels/' + level + '.json?t=' +(1*new Date), function(data) {
        if (data.substr(0,1) != "{") {
            sm.changeState("levelmenu");
            return;
        }
        level_data = JSON.parse(data);

        level_data.walls = level_data.walls||[];
        level_data.minimum_attractors = level_data.minimum_attractors||1;
        
        //self.levelDataLoaded(level_data);
        loaded--;
        self.levels[level] = level_data;
    });
}
