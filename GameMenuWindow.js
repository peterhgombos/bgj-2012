function GameMenuWindow(game) {
    var self = this;
    this.visible = false;
    this.buttons = [
        [this.gotoLevelMenu, {image: "level-menu.png", x:6, y:5.2, w:1.2,h:0.9}],
        [function(){self.restartLevel()}, {image: "restart.png", x:7.55, y:5.2, w:1.2, h:0.9}],
        [function(){self.nextLevel()}, {image: "next-level.png", x:9.1, y:5.2, w:1.2, h:0.9}]
        ];
    this.game = game;
}

GameMenuWindow.prototype.show = function(number_of_stars) {
    this.visible = true;
    this.number_of_stars = number_of_stars;
}
GameMenuWindow.prototype.hide = function() {
    this.visible = false;
}

GameMenuWindow.prototype.update = function() {
}

GameMenuWindow.prototype.render = function(ctx) {
    if (!this.visible) return;
        ctx.save();
        var scaler = 6*GU/this.game.completebox.width;
        ctx.scale(scaler, scaler);
        ctx.translate(5*GU/scaler,2.9*GU/scaler);
        ctx.drawImage(this.game.completebox,0,0);
        ctx.restore();
        for(var i=0;i<this.number_of_stars;i++) {
            ctx.drawImage(star,(6.65+i)*GU,4.2*GU, .7*GU, .7*GU);
        }
}

GameMenuWindow.prototype.gotoLevelMenu = function() {
    sm.changeState("levelmenu");
}

GameMenuWindow.prototype.restartLevel = function() {
    this.game.restart();
}

GameMenuWindow.prototype.nextLevel = function() {
    var new_message = this.game.message.split("-");
    if (new_message[1] < 15) new_message[1]++;
    else { new_message[0]++; new_message[1]=1; }

    sm.changeState("game", new_message.join("-"));
}
