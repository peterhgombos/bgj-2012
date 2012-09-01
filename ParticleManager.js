function ParticleManager(){
    this.MAX_PARTICLES = 256;
    this.MAX_ATTRACTORS = 8;

    this.particles = [];
    for(var i=0;i<this.MAX_PARTICLES;i++)
        this.particles[i] = new Particle();
    }
    this.num_active_particles = 0;

    this.attractors = [];
    for(var i=0;i<this.MAX_ATTRACTORS;i++)
        this.attractors[i] = new ParticleAttractor();
    }
    this.num_active_attractors = 0;
}

ParticleManager.prototype.addParticle = function(x,y){
    if(this.num_active_particles >= this.MAX_PARTICLES) return;
    var p = this.particles[this.num_active_particles++];
    p.x = x;
    p.y = y;
    p.dx = 0;
    p.dy = 0;
}

ParticleManager.prototype.removeParticle = function(i){
    this.copyParticle(this.particles[this.num_active_particles--], this.particles[i]);
}

ParticleManager.prototype.copyParticle = function(from, to){
    to.x = from.x;
    to.y = from.y;
    to.w = from.w;
    to.h = from.h;
    to.dx = from.dx;
    to.dy = from.dy;
}

ParticleManager.prototype.addAttractor = function(x,y,r,strength){ 
    if(this.num_active_attractors >= this.MAX_ATTRACTORS) return;
    var a = this.attractors[this.num_active_attractors++];
    a.x = x;
    a.y = y;
    a.dx = 0;
    a.dy = 0;
}

ParticleManager.prototype.removeAttractor = function(i){
    this.copyAttractor(this.attractors[this.num_active_attractors--], this.attractors[i]);
}

ParticleManager.prototype.copyAttractor = function(from, to){
    to.x = from.x;
    to.y = from.y;
    to.r = from.r;
    to.strength = from.strength;
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
