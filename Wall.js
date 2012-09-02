function Wall(x, y, w, h,ps){
    this.position = {x:x||0, y:y||0};
    this.size = {w:w||0, h:h||0};
    this.t = 0;

    /* global mixin */
    this.contains = contains;


    var that = this;
    ps.addCollider(this,function(p){
        return true;
    });
}

Wall.prototype.render = function(ctx){
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x*GU, this.position.y*GU, this.size.w*GU, this.size.h*GU);
}

Wall.prototype.update = function(){
}
