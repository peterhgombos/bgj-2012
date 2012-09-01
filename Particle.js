function Particle(x,y,w,h){
    this.x = x||0;
    this.y = y||0;
    this.w = w||0.1*Math.random()*3;
    this.h = h||0.1*Math.random()*3;
    this.dx = 0;
    this.dy = 0;
    this.opacity = 1;
}

Particle.prototype.render = function(ctx){
    /* draw a rectangle for now */
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.strokeStyle = "#43B0B2";
    ctx.strokeStyle = "rgb(167,236,238)";
    ctx.beginPath();
    ctx.moveTo(this.x*GU,this.y*GU);
    var dx = this.dx*10;
    var dy = this.dy*10;
    var length = Math.sqrt(dx*dx+dy*dy);
    if(length > 0.5){
        var scaler = 0.5/length;
        dx *= scaler;
        dy *= scaler;
    }
    ctx.lineTo((this.x+dx)*GU,(this.y+dy)*GU);
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.globalAlpha = this.opacity*0.05;
    var scaler = this.sprite.width*GU*0.00002;
    ctx.translate(this.x*GU,this.y*GU);
    ctx.scale(scaler,scaler);
    ctx.drawImage(this.sprite, -this.sprite.width/2,-this.sprite.height/2);
    ctx.restore();
}

Particle.prototype.update = function(){
    this.x += this.dx;
    this.y += this.dy;
    var speed = Math.sqrt(this.dx*this.dx + this.dy*this.dy);
    if(speed > this.MAX_SPEED){
        var scaler = this.MAX_SPEED/speed;
        this.dx *= scaler;
        this.dy *= scaler;
    }else if(speed < this.MIN_SPEED){
        this.opacity -= 0.01; 
    }
}

Particle.prototype.MAX_SPEED = 1;
Particle.prototype.MIN_SPEED = 0.07;
