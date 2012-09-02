function ParticleAttractor(x,y,m,w,h){
    this.position = {};
    this.position.x = x||0;
    this.position.y = y||0;
    this.size = {w:w||1,h:h||1};
    this.m = m||1;
    this.active = false;
}

ParticleAttractor.prototype.render = function(ctx){
    var scaler = 16*GU/1920 *0.5*this.size.w;
    ctx.save();
    ctx.translate(this.position.x*GU, this.position.y*GU);
    ctx.scale(scaler,scaler);
    ctx.drawImage(this.active?this.onsprite:this.offsprite,0,0);
    ctx.restore();
}

ParticleAttractor.prototype.update = function(){

}

