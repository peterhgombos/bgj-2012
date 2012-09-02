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
    /*
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x*GU, this.position.y*GU, this.size.w*GU, this.size.h*GU);
    */

    ctx.save();
    /* top */
    var y=this.position.y;
    ctx.drawImage(this.treestopleft,this.position.x*GU-this.treesleft.width,y*GU);
    for(var x=this.position.x;x<this.position.x+this.size.w-this.treestop.width/GU;x+=this.treestop.width/GU){
        ctx.drawImage(this.treestop,x*GU,y*GU);
    }
    ctx.drawImage(this.treestopright,x*GU,y*GU);

    /* middle */

    for(var y=this.position.y+this.treestop.height/GU;y<this.position.y+this.size.h-this.treestile.height/GU;y+=this.treestile.height/GU){
        ctx.drawImage(this.treesleft,this.position.x*GU-this.treesleft.width,y*GU);
        for(var x=this.position.x;x<this.position.x+this.size.w-this.treestile.width/GU;x+=this.treestile.width/GU){
            ctx.drawImage(this.treestile,x*GU,y*GU);
        }
        ctx.drawImage(this.treesright,x*GU,y*GU);
    }

    /* bottom  */
    for(var x=this.position.x;x<this.position.x+this.size.w;x+=this.treesbot.width/GU){
        ctx.drawImage(this.treescorner, GU*(x-this.treescorner.width/GU), y*GU);
        ctx.drawImage(this.treesbot,x*GU, y*GU);
    }
    ctx.restore();
}

Wall.prototype.update = function(){
}
