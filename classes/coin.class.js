class Coin extends DrawableObject{

    IMAGES = [
        "img/4. Marcadores/1. Coins/1.png",
        "img/4. Marcadores/1. Coins/2.png",
        "img/4. Marcadores/1. Coins/3.png",
        "img/4. Marcadores/1. Coins/4.png",
    ];


    x = 200;
    y = 200;


    constructor(){
        super();
        this.loadImages(this.IMAGES);
    }
}