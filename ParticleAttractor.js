function ParticleAttractor(x,y,m,w,h){
    this.position = {};
    this.position.x = x||0;
    this.position.y = y||0;
    this.size = {w:w||1,h:h||1};
    this.m = m||1;
}

ParticleAttractor.prototype.render = function(ctx){
    if(DEBUG){
        ctx.fillStyle = "pink";
        ctx.fillRect(this.position.x*GU,this.position.y*GU,this.size.w*GU,this.size.h*GU);
    }
}

ParticleAttractor.prototype.update = function(){

}
