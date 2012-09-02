function GameMenuWindow(game) {
    var self = this;
    this.visible = false;
    this.buttons = [
        [this.gotoLevelMenu, {image: "level-menu.png", x:5.25, y:5, w:1.5,h:1}],
        [function(){self.restartLevel()}, {image: "restart.png", x:7.25, y:5, w:1.5, h:1}],
        [function(){self.nextLevel()}, {image: "next-level.png", x:9.25, y:5, w:1.5, h:1}]
        ];
    this.game = game;
    console.log(this.game);
    this.game.elements.push.apply(this.game.elements, this.buttons);
}

GameMenuWindow.prototype.show = function() {
    this.visible = true;
}
GameMenuWindow.prototype.hide = function() {
    this.visible = false;
}

GameMenuWindow.prototype.update = function() {
}

GameMenuWindow.prototype.render = function(ctx) {
    if (!this.visible) return;
    ctx.fillStyle = "blue";
    ctx.fillRect(5*GU, 3*GU, 6*GU, 3.5*GU);
    ctx.fillStyle = "green";
    for ( var i=0; i < this.buttons.length; i++ ) {
        var button = this.buttons[i][1];
        ctx.fillRect(button.x*GU, button.y*GU, button.w*GU, button.h*GU);
    }
}

GameMenuWindow.prototype.gotoLevelMenu = function() {
    sm.changeState("levelmenu");
}

GameMenuWindow.prototype.restartLevel = function() {
    console.log(this.game);
    this.game.restart();
}

GameMenuWindow.prototype.nextLevel = function() {
    var new_message = this.game.message.split("-");
    if (new_message[1] < 15) new_message[1]++;
    else { new_message[0]++; new_message[1]=1; }

    sm.changeState("game", new_message.join("-"));
}
