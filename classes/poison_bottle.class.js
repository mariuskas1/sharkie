class PoisonBottle extends MoveableObject {
    IMAGES = [
        "img/4. Marcadores/Posión/Animada/1.png",
        "img/4. Marcadores/Posión/Animada/2.png",
        "img/4. Marcadores/Posión/Animada/3.png",
        "img/4. Marcadores/Posión/Animada/4.png",
        "img/4. Marcadores/Posión/Animada/5.png",
        "img/4. Marcadores/Posión/Animada/6.png",
        "img/4. Marcadores/Posión/Animada/7.png",
        "img/4. Marcadores/Posión/Animada/8.png",
    ]

  
    static lastBottleX = 400 + Math.random()*400;
    gapToNextBottle = 800 + Math.random()*400;

   
    collectSound = new TrackableAudio ("audio/collect_poison2.mp3");
    width = 70;
    height = 80;
    x = PoisonBottle.lastBottleX + this.gapToNextBottle;
    y = 350 + Math.random()*40;
    isCollected = false;

    
    constructor(){
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.animate();
        PoisonBottle.lastBottleX = this.x;
    }


    /**
     * This funcion animates the poison bottles.
     */
    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 180);
    }


    /**
     * This function handles the collection of a poison bottle.
     */
    collect(){
        this.collectSound.play();
    }
}