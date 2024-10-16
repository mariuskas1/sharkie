class Jellyfish extends Fish {

    IMAGES_REGULAR = [
        "img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
        "img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
        "img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
        "img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
    ];

    IMAGES_DEAD = [
        "img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png",
        "img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png",
        "img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png",
        "img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png",
    ]

    
    isJellyfish = true;
    isDead = false;
    width = 80;
    height = 150;
    speed = 0.1;
    collisionSound = new TrackableAudio("audio/electric_shock2.mp3");
    


    constructor(){
        super().loadImage(this.IMAGES_REGULAR[0]);
        this.loadImages(this.IMAGES_REGULAR);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        Fish.lastFishX = this.x;
        Fish.lastFishY = this.y;
    }


    /**
     * This function animates the jellyfish-movement.
     */
    animate() {
        this.moveLeft();
        this.moveUpAndDown();
            setInterval(() => {
                if(!this.isDead){
                    this.playAnimation(this.IMAGES_REGULAR);
                } else {
                    this.playAnimation(this.IMAGES_DEAD);
                }
            }, 200);
    }


    /**
     * This function moves the jellyfish up and down evenly.
     */
    moveUpAndDown() {
        let movingDown = true;
        setInterval(() => {
            if (!this.isDead && movingDown) {
                this.smoothMove(0.5);
                movingDown = false;
            } else if (!this.isDead && !movingDown) {
                this.smoothMove(-0.5);
                movingDown = true;
            }
        }, 1000);
    }

    
    /**
     * This function works as a helper function to move the jellyfish up and down smoothly.
     * 
     * @param {number} step - It takes in the size of steps as a parameter.
     */
    smoothMove(step) {
        let iterations = 100;  // Number of small steps
        let delay = 10;  // Milliseconds between each step
        for (let i = 0; i < iterations; i++) {
            setTimeout(() => {
                this.y += step;  // Move a small amount each time
            }, i * delay);  // Increase delay progressively
        }
    }


    /**
     * This function handles the jellyfish/character-collision.
     */
    characterCollision(){
        this.pushBack();
        this.collisionSound.play();
        setTimeout(() => {
            this.collisionSound.pause();       // Pause the sound
            this.collisionSound.currentTime = 0;  // Reset the sound to the beginning
        }, 700);
        
    }


    /**
     * This function handles the case when the jellyfish is hit by a bubble.
     */
    hitByBubble() {
        this.bubblePopSound.play();
        this.isDead = true;
        setTimeout(() => {
            this.floatAway();
        }, 1000);
    
    }


    /**
     * This function makes the jellyfish float away.
     */
    floatAway(){
        setInterval(() => {
            this.y -= 10;
        }, 50);
    }

}