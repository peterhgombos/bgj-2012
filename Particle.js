function Particle(x,y,w,h){
    this.x = x||0;
    this.y = y||0;
    this.w = w||0.1*Math.random()*3;
    this.h = h||0.1*Math.random()*3;
    this.dx = 0;
    this.dy = 0;
}

Particle.prototype.render = function(ctx){
    /* draw a rectangle for now */
    ctx.fillStyle = "rgb(150,150,229)";
    ctx.fillRect(this.x*GU,this.y*GU,this.w*GU, this.h*GU);
}

Particle.prototype.update = function(){
    this.x += this.dx;
    this.y += this.dy;
    var speed = Math.sqrt(this.dx*this.dx + this.dy*this.dy);
    if(speed > this.MAX_SPEED){
        console.log("SCALING!");
        var scaler = this.MAX_SPEED/speed;
        this.dx *= scaler;
        this.dy *= scaler;
    }
}

Particle.prototype.MAX_SPEED = 1;
