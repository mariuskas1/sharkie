class Fish extends MoveableObject {
    
    IMAGES_SWIMMING = [
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png",
    ];

    IMAGES_TRANSITION = [
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png",
    ]

    IMAGES_BUBBLESWIM = [
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim1.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim3.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim4.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim5.png",
    ]

    IMAGES_DIE = [
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.3.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png",
    ]

    IMAGES_BUBBLEDIE = [
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.3.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png",
    ]
    

    static lastFishX = 600 
    gapXToNextFish = 400 + Math.random()*200;
    y_Coordinates = [200, 100, 80, 220, 100, 80, 200, 50, 150];
    static y_index = 0
    

    x = Fish.lastFishX + this.gapXToNextFish;
    y = this.generateY();

    isNormalFish = true;
    isBubble = false;
    isDead = false;
    bubblePopSound = new TrackableAudio("audio/bubble_pop.mp3");


    constructor(){
        super().loadImage(this.IMAGES_SWIMMING[0]);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_TRANSITION);
        this.loadImages(this.IMAGES_BUBBLESWIM);
        this.loadImages(this.IMAGES_DIE);
        this.animate();
        this.speed = 0.15 + Math.random()*0.4;
        Fish.lastFishX = this.x;
        Fish.lastFishY = this.y;
    }


    /**
     * This function generates an y-coordinate for the next instance of the fish class.
     * 
     * @returns - It returns the y-coordinate.
     */
    generateY(){
        let newY = this.y_Coordinates[Fish.y_index];
        Fish.y_index++;
        if (Fish.y_index === 6){
            Fish.y_index = 0;
        }
        return newY;
    }



    /**
     * This function animates the movement of the fish.
     */
    animate() {
            this.moveLeft();
            setInterval(() => {
                if (!this.isBubble && !this.isDead) {
                    this.playAnimation(this.IMAGES_SWIMMING);
                } else if(this.isBubble && !this.isDead) {
                    this.playAnimation(this.IMAGES_BUBBLESWIM);
                }
            }, 100);
    }


    /**
     * This function handles the case when a fish is hit by a bubble.
     */
    hitByBubble(){
        this.playAnimation(this.IMAGES_TRANSITION);
        this.isBubble = true;
        this.bubblePopSound.play();
    }


    /**
     * This function handles the case when a fish is getting fin-slapped by the character.
     */
    gettingSlapped(){
        if(!this.isJellyfish){
            this.isDead = true;
        
            if(this.isBubble){
                this.playAnimation(this.IMAGES_BUBBLEDIE);
            } else {
                this.playAnimation(this.IMAGES_DIE);
            }
            this.floatAway();
        }
    }


    /**
     * This function makes the fish float away.
     */
    floatAway(){
        setInterval(() => {
            this.x -= 25;
            this.y -= 25;
        }, 100);
    }


    /**
     * This function handles the case when a fish collides with the character.
     */
    characterCollision(){
        this.pushBack();
        this.playAnimation(this.IMAGES_TRANSITION);
        this.isBubble = true;
    }


    /**
     * This function pushes the fish back.
     * 
     */
    pushBack(){
        this.x += 50;
    }


    /**
     * This function resets the stativ lastFishX-variable.
     */
    static resetLastFishPosition(){
        Fish.lastFishX = 600;
    }
}








