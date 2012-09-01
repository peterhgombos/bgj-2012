function ParticleAttractor(x,y,m){
    this.x = x||0;
    this.y = y||0;
    this.m = m||1;
}

ParticleAttractor.prototype.render = function(ctx){
    if(DEBUG){
        ctx.fillStyle = "pink";
        ctx.fillRect(this.x*GU,this.y*GU,0.1*GU,0.1*GU);
    }
}

ParticleAttractor.prototype.update = function(){

}
