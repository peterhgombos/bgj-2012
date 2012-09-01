function Particle(x,y){
    this.x = x||0;
    this.y = y||0;
    this.w = 0.1;
    this.h = 0.1;
    this.dx = 0;
    this.dy = 0;
}

Particle.prototype.render = function(ctx){
    /* draw a rectangle for now */
    ctx.fillStyle = "white";
    ctx.fillRect(this.x*GU,this.y*GU,(this.x+this.w)*GU, (this.y+this.h)*GU);
}

Particle.prototype.update = function(){
    this.x += this.dx;
    this.y += this.dy;
}
