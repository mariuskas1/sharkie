class Endboss extends MoveableObject {
    x = 4000;
    y = -50;
    height = 400;
    width = 400;
    endbossHasArrived = false;

    IMAGES_FLOATING = [
        "img/2.Enemy/3 Final Enemy/2.floating/1.png",
        "img/2.Enemy/3 Final Enemy/2.floating/2.png",
        "img/2.Enemy/3 Final Enemy/2.floating/3.png",
        "img/2.Enemy/3 Final Enemy/2.floating/4.png",
        "img/2.Enemy/3 Final Enemy/2.floating/5.png",
        "img/2.Enemy/3 Final Enemy/2.floating/6.png",
        "img/2.Enemy/3 Final Enemy/2.floating/7.png",
        "img/2.Enemy/3 Final Enemy/2.floating/8.png",
        "img/2.Enemy/3 Final Enemy/2.floating/9.png",
        "img/2.Enemy/3 Final Enemy/2.floating/10.png",
        "img/2.Enemy/3 Final Enemy/2.floating/11.png",
        "img/2.Enemy/3 Final Enemy/2.floating/12.png",
        "img/2.Enemy/3 Final Enemy/2.floating/13.png",
    ];

    IMAGES_INTRO = [
        "img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
    ];



    constructor(){
        super().loadImage(this.IMAGES_INTRO[0]);
        this.loadImages(this.IMAGES_FLOATING);
        this.loadImages(this.IMAGES_INTRO);
        this.animate();
    }


    animate(){
        let i = 0;
        setInterval(() => {
            if (i < 10 && this.endbossHasArrived) {
                this.playAnimation(this.IMAGES_INTRO);
            } else if (this.endbossHasArrived) {
                this.playAnimation(this.IMAGES_FLOATING);
            }

            i++;
            
            if(world.character.x > 1000 && !this.endbossHasArrived){
                i = 0;
                this.x = 1700;
                this.endbossHasArrived = true;
            }
        }, 150);
    }

}