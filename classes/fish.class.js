class Fish extends MoveableObject {
    x = 600 + Math.random()*400;
    y = 80 + Math.random()*300;
    
    IMAGES_SWIMMING = [
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png",
    ];
    

    constructor(){
        super().loadImage(this.IMAGES_SWIMMING[0]);
        this.loadImages(this.IMAGES_SWIMMING);
        this.animate();
        this.speed = 0.15 + Math.random()*0.5;
    }


    animate() {
        this.moveLeft();

        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMMING);
        }, 100)
    }


}






