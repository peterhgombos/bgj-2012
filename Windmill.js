function Windmill(x, y, w, h,ps){
    this.position = {x:x||0, y:y||0};
    this.size = {w:w||0, h:h||0};
    this.color = {r:100,g:100,b:0};
    this.power = 0;
    this.bodysprite = loadImage("resources/windmill.png");
    this.bladesprite = loadImage("resources/blades.png");
    this.t = 0;

    /* global mixin */
    this.contains = contains;
    this.barsize = 0.0;

    this.GOAL_POWER = 100;

    var that = this;
    ps.addCollider(this,function(p){
            that.power < that.GOAL_POWER && that.power++;
            });
}

Windmill.prototype.render = function(ctx){
    ctx.save();
    var scaler = 0.5*GU/this.bodysprite.width;
    ctx.translate(this.position.x*GU, this.position.y*GU);
    ctx.scale(scaler, scaler);
    ctx.drawImage(this.bodysprite,this.bodysprite.width/2,this.bodysprite.height/3);
    ctx.translate(this.size.w*GU*0.5/scaler, this.size.h*GU*0.5/scaler);
    ctx.rotate(-this.t/1000);
    ctx.drawImage(this.bladesprite,-this.bladesprite.width*0.5,-this.bladesprite.height*0.5);
    ctx.restore();
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.strokeStyle  = "rgba(0,0,0,0.5)";
    ctx.fillRect(this.position.x*GU+0.25*GU, (this.position.y+this.size.h+0.25)*GU, .5*GU*this.barsize, 0.05*GU);
    ctx.strokeRect(this.position.x*GU+0.25*GU, (this.position.y+this.size.h+0.25)*GU, .5*GU, 0.05*GU);
}


Windmill.prototype.update = function(){
    this.t+=this.power*1.5;
    this.power-=3;
    this.barsize=(this.power+3)/this.GOAL_POWER;
    if(this.power < 0){
        this.power = 0;
        this.barsize = 0;
    }
    if(this.power>this.GOAL_POWER) {
        this.barsize = 1;
    }
}
