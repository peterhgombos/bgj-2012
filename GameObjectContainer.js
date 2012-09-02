function GameObjectContainer(attractors) {
    this.attractors = attractors;
    this.position = {x:14, y:0};
    this.size = {w:2, h:9};
    cdd.makeDroppable(this, {
        "drop":function(e){
            sm.activeState.ps.deactivateAttractor(e.draggable);
        }
    });

}


GameObjectContainer.prototype.render = function(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(14*GU, 0, 2*GU, 9*GU);
}
GameObjectContainer.prototype.update = function() {
}
