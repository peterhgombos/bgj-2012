function ReadLevel() {
}

ReadLevel.prototype.init = function() {
	level_data = {"windmills": [[1,1],[2,2],[3,3]]};
}

ReadLevel.prototype.render = function(ctx) {
	//Add code for reading json files
	//Have added a thought of file for proof of concept
	var x = 0;
	var y = 0;
	var img = new Image();
	img.src = "/tiles.JPG";
	ctx.drawImage(img,10,10);
}
