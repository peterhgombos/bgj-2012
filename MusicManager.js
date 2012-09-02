function MusicManager(){
    this.music = new Audio();
    this.loaded = false;
    var that = this;
    loaded++;
    this.music.addEventListener("ended", function(){
        this.currentTime=0;
        this.play();
    }, false);
    this.music.addEventListener("loadeddata", function(){that.loaded||loaded--; that.loaded = true;this.play()});
    this.music.addEventListener("canplay", function(){that.loaded||loaded--; that.loaded = true;this.play()});
    this.music.volume = 1;
    if(this.music.canPlayType("mp3")){
        this.music.src = "resources/music/windwillmusic.mp3";
    }else{
        this.music.src = "resources/music/windwillmusic.ogg";
    }

    document.body.appendChild(this.music);
}

