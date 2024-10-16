class Endboss extends MoveableObject {
    x = 20000;
    y = 0;
    height = 400;
    width = 400;
    endbossHasArrived = false;
    world = null;

    energy = 100;
    isEndboss = true;
    isAttacking = false;
    isPoisoned = false;
    isGettingSlapped = false;
    isDead = false;
    characterLocationY;
    characterLocationX;
    launchToX;
    newLocationY;
    locationBeforeAttack;
    animation_i = 0;
    deadAnimationPlayed = false;


    bubblePopSound = new TrackableAudio("audio/bubble_pop.mp3");
    hurtSound = new TrackableAudio ("audio/endboss_hurt.mp3");
    waterSplash = new TrackableAudio ("audio/water_splash1.mp3");
    


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

    IMAGES_ATTACK = [
        "img/2.Enemy/3 Final Enemy/Attack/1.png",
        "img/2.Enemy/3 Final Enemy/Attack/2.png",
        "img/2.Enemy/3 Final Enemy/Attack/3.png",
        "img/2.Enemy/3 Final Enemy/Attack/4.png",
        "img/2.Enemy/3 Final Enemy/Attack/5.png",
        "img/2.Enemy/3 Final Enemy/Attack/6.png",
    ];

    IMAGES_HURT = [
        "img/2.Enemy/3 Final Enemy/Hurt/1.png",
        "img/2.Enemy/3 Final Enemy/Hurt/2.png",
        "img/2.Enemy/3 Final Enemy/Hurt/3.png",
        "img/2.Enemy/3 Final Enemy/Hurt/4.png",
    ];

    IMAGES_DEAD = [
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
    ];



    constructor(){
        super().loadImage(this.IMAGES_INTRO[0]);
        this.loadImages(this.IMAGES_FLOATING);
        this.loadImages(this.IMAGES_INTRO);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }


    /**
     * This function animates the endboss according to its current state.
     */
    animate(){
        setInterval(() => {
            if (this.animation_i < 10 && this.endbossHasArrived) {
                this.playAnimation(this.IMAGES_INTRO);
            } else if (this.endbossHasArrived && !this.isAttacking && !this.isPoisoned && !this.isDead) {
                this.playAnimation(this.IMAGES_FLOATING);
            } else if (this.endbossHasArrived && this.isPoisoned){
                this.playAnimation(this.IMAGES_HURT);
            } else if(this.isAttacking){
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.endbossHasArrived && this.isDead && !this.deadAnimationPlayed){
                this.handleDyingEndboss();
            }
            this.animation_i++;
            this.checkCharacterLocationBeforeEndbossArrival();
        }, 100);
    }


    /**
     * This function handles the case when the endboss is dying.
     */
    handleDyingEndboss(){
        this.playAnimation(this.IMAGES_DEAD);
        this.loadImage(this.IMAGES_DEAD[4]);
        this.floatAway();
        setTimeout(() => {
            displayEndScreen();
        }, 3000);
        this.deadAnimationPlayed = true;
    }
    

    /**
     * This function constantly checks the character location so that the endboss is only 
     * shown when the character has passed the 8000-mark on the x-coordinate.
     */
    checkCharacterLocationBeforeEndbossArrival(){
        if (this.world){
            if(this.world.character.x > 8000 && !this.endbossHasArrived){
                this.animation_i = 0;
                this.x = 8600;
                this.endbossHasArrived = true;
                setTimeout(() => {
                    this.waterSplash.play();
                    stopBackgroundMusic();
                    setTimeout(() => {
                        this.waterSplash.pause();
                        this.waterSplash.currentTime = 0;
                    }, 1300);
                    startBossMusic();
                }, 400);
                this.startAttacking();
            }
        }  
    }
    

    /**
     * This function starts the attack interval for the endboss. It also calls the functions necessary to check
     * the character's location for the attack.
     */
    startAttacking(){
        this.checkCharacterLocation();
        this.checkGapToCharacter();
        setTimeout(() => {
            this.startAttackInterval();
        }, 1000);
        
    }


    /**
     * This function checks the gap to the character on the y-coordinate.
     */
    checkGapToCharacter() {
        setInterval(() => {
            const gapY = Math.abs(this.y - this.characterLocationY);           
            if (gapY > 270 || gapY < 170) {
                this.newLocationY = this.characterLocationY - 240;
                setTimeout(() => {
                    this.followCharacter();
                }, 300);
            }
        }, 100);
    }


    /**
     * This function makes the endboss realign its position according to the position of the character.
     */
    followCharacter() {
        const followInterval = setInterval(() => {
           if (this.y > this.newLocationY) {
                this.y -= 0.5;
            } else if (this.y < this.newLocationY) {
                this.y += 0.5;
            }

            if (this.y > 40) {
                this.y = 40;
                clearInterval(followInterval);
            }
    
            if (Math.abs(this.y - this.newLocationY) <= 5) {
                clearInterval(followInterval);
            }

            if(this.isDead){
                clearInterval(followInterval);
            }
        }, 30);  
    }
    

    /**
     * This function constantly checks the character location on the x- and y- coordinates.
     */
    checkCharacterLocation(){
        setInterval(() => {
            this.characterLocationY = this.world.character.trueY;
            this.characterLocationX = this.world.character.trueX;
        }, 25);
    }


    /**
     * This function starts the attack-interval of the endboss. It calls the launchAtCharacter function and works with a promise so that
     * it calls the withdrawFromCharacter function when the launchAtCharacter function is resolved.
     */
    startAttackInterval() {
        const attackInterval = setInterval(() => {
            if (this.isDead) {
                clearInterval(attackInterval);
                return; 
            }
            
            if(!this.isPoisoned){
                this.isAttacking = true;
                this.locationBeforeAttack = this.x;
                
                this.launchAtCharacter().then(() => {
                    this.withdrawFromCharacter();
                    this.isAttacking = false;
                })

            }
        }, 5000);
    }


    /**
     * This function makes the endboss launch at the character.
     * 
     * @returns - It returns a new Promise that resolves, when the endboss has  reached the character.
     */
    launchAtCharacter() {
        return new Promise((resolve) => {
            this.launchToX = this.characterLocationX + 130;
            this.launchToY = this.newLocationY;
    
            const launchInterval = setInterval(() => {
                let distanceX = this.x - this.launchToX;
                let distanceY = this.y - this.launchToY;
    
                if (this.isPoisoned) {
                    clearInterval(launchInterval);
                    resolve(); 
                    return;
                }
    
                if (this.x > this.launchToX) {
                    this.x -= Math.min(15, distanceX * 0.8);
                } else if (Math.abs(this.x - this.launchToX) <= 1){
                    clearInterval(launchInterval);
                    resolve(); 
                }
    
                if (this.y > this.launchToY) {
                    this.y -= Math.min(15, distanceY * 0.5);
                } else if (this.y < this.launchToY) {
                    this.y += Math.min(15, Math.abs(distanceY) * 0.5);
                }
            }, 20);
        });
    }


    /**
     * This function makes the endboss withdraw from the character.
     */
    withdrawFromCharacter() {
        const withdrawInterval = setInterval(() => {
            let distance = this.locationBeforeAttack - this.x;
            
            if (this.x < this.locationBeforeAttack) {
                this.x += Math.min(10, distance * 0.1);
            }
    
            if (Math.abs(this.locationBeforeAttack - this.x) <= 10) {
                clearInterval(withdrawInterval);
            }
        }, 25);
    }


    /**
     * This function handles the cases, when the endboss collides with the character, either poisoned or not.
     */
    characterCollision(){
        if(this.isPoisoned){
            this.pushBackMore();
        } else {
            this.pushBack();
            this.isAttacking = true;
            setTimeout(() => {
                this.isAttacking = false;
            }, 500);
        }
       
    }


    /**
     * This function pushes the endboss back a bit.
     */
    pushBack(){
        this.x += 40;
    }


    /**
     * This function handles the cases when the endboss is hit by a bubble, either poisoned or not.
     * 
     * @param {object} bubble - It takes in the bubble/attack object as a parameter.
     */
    hitByBubble(bubble){
        this.bubblePopSound.play();
        if(bubble.isPoisonBubble && !this.isDead){
            this.isPoisoned = true;
            this.gettingHitAndHurt();
            this.hurtSound.play();
            
            setTimeout(() => {
                this.isPoisoned = false;
            }, 3000);
        }
    }


    /**
     * This function handles the case when the endboss is getting slapped in either poisoned or normal state.
     */
    gettingSlapped(){
        if(this.isPoisoned && !this.isGettingSlapped){
            this.gettingSlappedWhilePoisoned();
        } else {
            this.gettingSlappedWhileNotPoisoned();
        }
    }


    /**
     * This function handles the case when is endboss gets slapped while not being poisoned.
     */
    gettingSlappedWhileNotPoisoned(){
            this.isGettingSlapped = true;
            this.gettingHitAndHurt();

            setTimeout(() => {
                this.hurtSound.play();
                this.pushBack();
            }, 400);
        
            setTimeout(() => {
                this.isGettingSlapped = false;
            }, 1000);
    }


    /**
     * This function handles the case when the endboss gets slapped while poisoned.
     */
    gettingSlappedWhilePoisoned(){
        this.isGettingSlapped = true;
        this.gettingHitAndHurt();

        setTimeout(() => {
            this.hurtSound.play();
            this.pushBackMore();
        }, 400);
       
        setTimeout(() => {
            this.isGettingSlapped = false;
        }, 1000);
    }


    /**
     * This function serves as a helper function for the endboss being hit and hurt.
     * 
     */
    gettingHitAndHurt(){
        this.hit();
        this.isHurt(); 
     }


    /**
     * This function pushes the endboss back.
     */
    pushBackMore(){
        for (let i = 0; i < 150; i++) {
            this.x += 1;
        }
    }


    /**
     * This function works as a helper function to check if the endboss is colliding with a moveable object.
     * 
     * @param {object} mo - It takes in the moveable object as a parameter.
     * @returns It returns a boolean.
     */
    isColliding(mo){
        return this.x + 20 + this.width - 80 > mo.x &&
            this.y + 140 + this.height - 220 > mo.y &&
            this.x + 20 < mo.x &&
            this.y + 140 < mo.y + mo.height
    }


    /**
     * This function makes the (dead) endboss float away.
     */
    floatAway(){
        setInterval(() => {
            this.y -= 2;
          }, 25);
    }
}

