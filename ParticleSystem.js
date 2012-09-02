function ParticleSystem(emitter, attractors){
    this.MAX_PARTICLES = 256*4;
    this.MAX_ATTRACTORS = attractors.length;

    this.particles = [];
    for(var i=0;i<this.MAX_PARTICLES;i++){
        this.particles[i] = new Particle();
    }
    this.num_active_particles = 0;


    attractors.sort(function(a,b){return b-a});
    this.attractors = [];
    list_x_offset = 0; list_y_offset = 0;
    for(var i=0;i<this.MAX_ATTRACTORS;i++){
        if (list_x_offset + attractors[i] > 1.6 || (i>0 && attractors[i] != attractors[i-1])) {
            list_x_offset = 0;
            list_y_offset += attractors[i-1] + .2;
        }
        this.attractors[i] = new ParticleAttractor(
                (14.2 + list_x_offset),
                (1 + list_y_offset),
                attractors[i]*650,
                attractors[i],
                attractors[i]
                );
        cdd.makeDraggable(this.attractors[i]);
        list_x_offset += attractors[i] + .2;
    }
    this.num_active_attractors = 0;

    this.emitter = emitter; 
    this.emitter.timeToNext = 0;
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
    to.opacity = from.opacity;
}

ParticleSystem.prototype.activateAttractor = function(a) {
    for (var i=0; i < this.attractors.length; i++) {
        if ( this.attractors[i] == a ) {
            this.attractors[i].active = true;
        }
    }
}
ParticleSystem.prototype.deactivateAttractor = function(a) {
    for (var i=0; i < this.attractors.length; i++) {
        if ( this.attractors[i] == a ) {
            this.attractors[i].active = false;
        }
    }
}

ParticleSystem.prototype.render = function(ctx){
    ctx.save();
    //ctx.globalCompositeOperation = "lighter";
    for(var i=0;i<this.num_active_particles;i++){
        this.particles[i].render(ctx);
    }
    ctx.restore();
    for(var i=0;i<this.attractors.length;i++){
        this.attractors[i].render(ctx);
    }
}

ParticleSystem.prototype.update = function(){
    this.emitter.timeToNext--;
    while(this.emitter.timeToNext < 0){
        this.emitter.timeToNext += this.emitter.speed;
        this.addParticle(this.emitter.x+(Math.random()-0.5)*this.emitter.xVariance, this.emitter.y+(Math.random()-0.5)*this.emitter.yVariance, this.emitter.dx+(Math.random()-0.5)*this.emitter.dxVariance, this.emitter.dy+(Math.random()+0.5)*this.emitter.dyVariance);
    }
    for(var i=0;i<this.attractors.length;i++){
        if (!this.attractors[i].active) continue;
        var a = this.attractors[i];
        for(var j=0;j<this.num_active_particles;j++){
            var p = this.particles[j];
            var rx = a.position.x-p.x;
            var ry = a.position.y-p.y;
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
        else if(this.particles[i].opacity <= 0){
            this.removeParticle(i--);
        }
    }
}
