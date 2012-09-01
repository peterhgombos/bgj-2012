function GameState() {
}

GameState.prototype.init = function(){
    this.level_data = [];
    this.elements = [];
}

GameState.prototype.resume = function(message){
    this.readLevel(message);
}
GameState.prototype.pause = function(){
	// pause
}

GameState.prototype.update = function() {
}

GameState.prototype.render = function() {
    if (this.level_data.length == 0) return;
    ctx.fillStyle = "yellow";
    for (var i=0; i<this.level_data.windmills.length; i++) {
        var windmill = this.level_data.windmills[i];
        ctx.fillRect((windmill[0]-.5)*GU, (windmill[1]-.5)*GU, GU, GU);
    }
}

GameState.prototype.readLevel = function(level) {
    var self = this;
    ajax.get('levels/' + level + '.json', function(data) {
		if (!data) return false;

        self.level_data = JSON.parse(data);
		console.log(self.level_data);
	});
}
