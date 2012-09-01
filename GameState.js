function GameState() {
}

GameState.prototype.init = function(){
	// yo
}

GameState.prototype.resume = function(message){
	ajax.get('levels/' + message + '.json', function(data) {
		level_data = JSON.parse(data);
		console.log(level_data);
	});
}
GameState.prototype.pause = function(){
	// pause
}
