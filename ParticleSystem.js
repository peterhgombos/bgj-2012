function ParticleSystem(){
    this.MAX_PARTICLES = 256*4;
    this.MAX_ATTRACTORS = 8;

    this.particles = [];
    for(var i=0;i<this.MAX_PARTICLES;i++){
        this.particles[i] = new Particle();
    }
    this.num_active_particles = 0;

    this.attractors = [];
    for(var i=0;i<this.MAX_ATTRACTORS;i++){
        this.attractors[i] = new ParticleAttractor();
    }
    this.num_active_attractors = 0;

    this.emitter = {x: 0.1, xVariance: 0.5, y:0.1, yVariance:0.5, timeToNext: 0, speed:2, dx:0.03, dy:0.03, dxVariance:0.001, dyVariance:0.001};
}

ParticleSystem.prototype.addParticle = function(x,y,dx,dy){
    if(this.num_active_particles >= this.MAX_PARTICLES) return;
    var p = this.particles[this.num_active_particles++];
    p.x = x;
    p.y = y;
    p.dx = dx||0;
    p.dy = dy||0;
}

ParticleSystem.prototype.removeParticle = function(i){
    this.copyParticle(this.particles[--this.num_active_particles], this.particles[i]);
}

ParticleSystem.prototype.copyParticle = function(from, to){
    to.x = from.x;
    to.y = from.y;
    to.w = from.w;
    to.h = from.h;
    to.dx = from.dx;
    to.dy = from.dy;
}

ParticleSystem.prototype.addAttractor = function(x,y,m){ 
    if(this.num_active_attractors >= this.MAX_ATTRACTORS) return;
    var a = this.attractors[this.num_active_attractors++];
    a.x = x;
    a.y = y;
    a.m = m;
}

ParticleSystem.prototype.removeAttractor = function(i){
    this.copyAttractor(this.attractors[--this.num_active_attractors], this.attractors[i]);
}

ParticleSystem.prototype.copyAttractor = function(from, to){
    to.x = from.x;
    to.y = from.y;
    to.m = from.m;
}

ParticleSystem.prototype.render = function(ctx){
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for(var i=0;i<this.num_active_particles;i++){
        this.particles[i].render(ctx);
    }
    ctx.restore();
    for(var i=0;i<this.num_active_attractors;i++){
        this.attractors[i].render(ctx);
    }
}

ParticleSystem.prototype.update = function(){
    this.emitter.timeToNext--;
    while(this.emitter.timeToNext < 0){
        this.emitter.timeToNext += this.emitter.speed;
        this.addParticle(this.emitter.x+(Math.random()-0.5)*this.emitter.xVariance, this.emitter.y+(Math.random()-0.5)*this.emitter.yVariance, this.emitter.dx+(Math.random()-0.5)*this.emitter.dxVariance, this.emitter.dy+(Math.random()+0.5)*this.emitter.dyVariance);
    }
    for(var i=0;i<this.num_active_attractors;i++){
        var a = this.attractors[i];
        for(var j=0;j<this.num_active_particles;j++){
            var p = this.particles[j];
            var rx = a.x-p.x;
            var ry = a.y-p.y;
            var rSquared = rx*rx+ry*ry;
            p.dx += rx/Math.abs(rx)*(0.0001*a.m/(rSquared));
            p.dy += ry/Math.abs(ry)*(0.0001*a.m/(rSquared));
        }
    }
    for(var i=0;i<this.num_active_particles;i++){
        this.particles[i].update();
        if(this.particles[i].x < -1 || this.particles[i].x > 17){
            this.removeParticle(i--);
        }
        else if(this.particles[i].y < -1 || this.particles[i].y > 10){
            this.removeParticle(i--);
        }
    }
}
