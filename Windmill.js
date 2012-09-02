function Windmill(x, y, w, h,ps){
    this.position = {x:x||0, y:y||0};
    this.size = {w:w||0, h:h||0};
    this.color = {r:100,g:100,b:0};
    this.power = 0;

    /* global mixin */
    this.contains = contains;

    this.GOAL_POWER = 100;

    var that = this;
    ps.addCollider(this,function(p){
        that.power < that.GOAL_POWER && that.power++;
    });
}

Windmill.prototype.render = function(ctx){
    this.color.g = this.power/this.GOAL_POWER*155;
    ctx.fillStyle = "rgb("+(this.color.r|0)+","+(this.color.g|0)+","+(this.color.b|0)+")";
    ctx.fillRect(this.position.x*GU, this.position.y*GU, this.size.w*GU, this.size.h*GU);
}

Windmill.prototype.update = function(){
    this.power-=3;
    if(this.power < 0){
        this.power = 0;
    }
}
