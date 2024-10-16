class Coin extends MoveableObject{

    IMAGES = [
        "img/4. Marcadores/1. Coins/1.png",
        "img/4. Marcadores/1. Coins/2.png",
        "img/4. Marcadores/1. Coins/3.png",
        "img/4. Marcadores/1. Coins/4.png",
    ];


    static lastCoinX = 200 + Math.random()*400;
    gapToNextCoin = 200 + Math.random()*400;

    collectSound = new TrackableAudio ("audio/collect_coin.mp3");
    width = 50;
    height = 50;
    x = Coin.lastCoinX + this.gapToNextCoin;
    y = 50 + Math.random()*280;
    isCollected = false;


    constructor(){
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.animate();
        Coin.lastCoinX = this.x;
    }


    /**
     * This function animates the coins.
     */
    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 180);
    }


    /**
     * This function handles the case when a coin is collected and plays a collect-sound.
     */
    collect(){
        this.collectSound.play();
        setInterval(() => {
            this.y -= 20;
        }, 50);
    }
}