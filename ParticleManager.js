function ParticleManager(){
    this.particles = [];
}

ParticleManager.prototype.render = function(ctx){
    for(var i=0;i<this.particles.length;i++){
        this.particles[i].render(ctx);
    }
}

ParticleManager.prototype.update = function(){
    for(var i=0;i<this.particles.length;i++){
        this.particles[i].update();
    }
}
