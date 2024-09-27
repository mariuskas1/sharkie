class Character extends MoveableObject {
    width = 300;
    height = 300;
    x = 40;
    y = 150;
    world;
    speed = 5;
    swimmingSound;

    trueX = this.x + 60;
    trueY = this.y + 140;
    trueWidth = this.width - 118;
    trueHeight = this.height -210;


    IMAGES_SWIMMING = [
        "img/1.Sharkie/3.Swim/1.png",
        "img/1.Sharkie/3.Swim/2.png",
        "img/1.Sharkie/3.Swim/3.png",
        "img/1.Sharkie/3.Swim/4.png",
        "img/1.Sharkie/3.Swim/5.png",
        "img/1.Sharkie/3.Swim/6.png"
    ];

    IMAGES_DEAD = [
        "img/1.Sharkie/6.dead/1.Poisoned/1.png",
        "img/1.Sharkie/6.dead/1.Poisoned/2.png",
        "img/1.Sharkie/6.dead/1.Poisoned/3.png",
        "img/1.Sharkie/6.dead/1.Poisoned/4.png",
        "img/1.Sharkie/6.dead/1.Poisoned/5.png",
        "img/1.Sharkie/6.dead/1.Poisoned/6.png",
        "img/1.Sharkie/6.dead/1.Poisoned/7.png",
        "img/1.Sharkie/6.dead/1.Poisoned/8.png",
        "img/1.Sharkie/6.dead/1.Poisoned/9.png",
        "img/1.Sharkie/6.dead/1.Poisoned/10.png",
        "img/1.Sharkie/6.dead/1.Poisoned/11.png",
        "img/1.Sharkie/6.dead/1.Poisoned/12.png",
    ];

    IMAGES_HURT = [
        "img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
        "img/1.Sharkie/5.Hurt/1.Poisoned/2.png",
        "img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
        "img/1.Sharkie/5.Hurt/1.Poisoned/4.png",
    ];

    IMAGES_IDLE = [
        "img/1.Sharkie/1.IDLE/1.png",
        "img/1.Sharkie/1.IDLE/2.png",
        "img/1.Sharkie/1.IDLE/3.png",
        "img/1.Sharkie/1.IDLE/4.png",
        "img/1.Sharkie/1.IDLE/5.png",
        "img/1.Sharkie/1.IDLE/6.png",
        "img/1.Sharkie/1.IDLE/7.png",
        "img/1.Sharkie/1.IDLE/8.png",
        "img/1.Sharkie/1.IDLE/9.png",
        "img/1.Sharkie/1.IDLE/10.png",
        "img/1.Sharkie/1.IDLE/11.png",
        "img/1.Sharkie/1.IDLE/12.png",
        "img/1.Sharkie/1.IDLE/13.png",
        "img/1.Sharkie/1.IDLE/14.png",
        "img/1.Sharkie/1.IDLE/15.png",
        "img/1.Sharkie/1.IDLE/16.png",
        "img/1.Sharkie/1.IDLE/17.png",
        "img/1.Sharkie/1.IDLE/18.png",
    ]
    
   
    constructor(){
        super().loadImage("img/1.Sharkie/3.Swim/1.png");
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.animate();

        this.swimming_sound = new Audio("../audio/swim.mp3");
        this.swimming_sound.volume = 0.1;
    }
   

    animate(){
        setInterval(() => {
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){
                this.moveRight();
            }
            if(this.world.keyboard.LEFT && this.x > 0 ){
                this.moveLeft();
            }
            if(this.world.keyboard.UP){
                this.moveUp();
            }
            if(this.world.keyboard.DOWN){
                this.moveDown();
            }
            this.world.camera_x = -this.x;
        }, 1000/40);
        this.setSoundAndAnimation();
    }   


    moveLeft(){
        this.x -= this.speed;
        this.trueX -= this.speed;
        this.otherDirection = true;
    }

    moveRight(){
        this.x += this.speed;
        this.trueX += this.speed;
        this.otherDirection = false;
    }

    moveUp(){
        this.y -= this.speed;
        this.trueY -= this.speed;
    }

    moveDown(){
        this.y += this.speed;
        this.trueY += this.speed;
    }


    isCharacterColliding(mo){
        return this.trueX + this.trueWidth > mo.x &&
        this.trueY + this.trueHeight > mo.y &&
        this.trueX < mo.x &&
        this.trueY < mo.y + mo.height
    }


    setSoundAndAnimation(){
        setInterval(() => {
            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN){
             this.playAnimation(this.IMAGES_SWIMMING);
             this.swimming_sound.play();
            } else if (this.isHurt()){
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isDead()){
                this.playAnimation(this.IMAGES_DEAD);
                this.loadImage(this.IMAGES_DEAD[11]);
                this.gameOver();
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 100); 
    }


    gameOver(){
        this.floatingOut();
        setTimeout(displayGameOverScreen, 4000);
    }

    
    floatingOut(){
            setInterval(() => {
                this.y -= 2;
            }, 100);
            
    }


}


