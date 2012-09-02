function ParticleSystem(emitter, attractors){
    this.MAX_PARTICLES = 256*4;
    this.MAX_ATTRACTORS = attractors.length;

    /* pool of particles */
    this.particles = [];
    for(var i=0;i<this.MAX_PARTICLES;i++){
        this.particles[i] = new Particle();
    }
    this.num_active_particles = 0;


    /* list of external objects with position and size that collide with particles */
    this.colliders = [];

    this.cdd = new CanvasDragDrop(canvas);

    /* pool of attractors */
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

    /* load emitter from level or something */
    this.emitter = emitter; 
    this.emitter.timeToNext = 0;
    if (this.emitter.direction !== undefined) {
        var rad = this.emitter.direction/180*Math.PI;
        this.emitter.dy = .085*Math.sin(rad);
        this.emitter.dx = .085*Math.cos(rad);
    }
}

ParticleSystem.prototype.addCollider = function(collider, callback){
    this.colliders.push({collider:collider, callback:callback});
}

ParticleSystem.prototype.removeCollider = function(collider){
    for(var i=0;i<this.colliders.length;i++){
        if(collider === this.colliders[i].collider){
            this.colliders.remove(i); 
            break;
        }
    }
}

ParticleSystem.prototype.addParticle = function(x,y,dx,dy){
    if(this.num_active_particles >= this.MAX_PARTICLES) return;
    var p = this.particles[this.num_active_particles++];
    p.position.x = x;
    p.position.y = y;
    p.speed.dx = dx||0;
    p.speed.dy = dy||0;
}

ParticleSystem.prototype.removeParticle = function(i){
    this.copyParticle(this.particles[--this.num_active_particles], this.particles[i]);
}

ParticleSystem.prototype.copyParticle = function(from, to){
    to.position.x = from.position.x;
    to.position.y = from.position.y;
    to.size.w = from.size.w;
    to.size.h = from.size.h;
    to.speed.dx = from.speed.dx;
    to.speed.dy = from.speed.dy;
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
            var rx = a.position.x-p.position.x;
            var ry = a.position.y-p.position.y;
            var rSquared = rx*rx+ry*ry;
            p.speed.dx += rx/Math.abs(rx)*(0.0001*a.m/(rSquared));
            p.speed.dy += ry/Math.abs(ry)*(0.0001*a.m/(rSquared));
        }
    }
    for(var i=0;i<this.num_active_particles;i++){
        this.particles[i].update();
        for(var j=0;j<this.colliders.length;j++){
            if(this.colliders[j].collider.contains(this.particles[i])){
                if(this.colliders[j].callback(this.particles[i])){
                    /* hackily move the particle off-screen instead of deleting because it will get deleted later, yo */
                    this.particles[i].position.x = -1000;
                }
                break;
            }
        }
        if(this.particles[i].position.x < -1 || this.particles[i].position.x > 17){
            this.removeParticle(i--);
        }
        else if(this.particles[i].position.y < -1 || this.particles[i].position.y > 10){
            this.removeParticle(i--);
        }
        else if(this.particles[i].opacity <= 0){
            this.removeParticle(i--);
        }
    }
}
