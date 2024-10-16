class World {

    character = null;
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    poisonBar = new PoisonBar(this);
    endbossBar = new EndbossHealthBar();
    attackObjects = [];
    isPlayerHit = false;
    hasCharacterPoison = false;
    poisonPercentage = 0;
    endboss = this.level.enemies[this.level.enemies.length -1];
   


    constructor(canvas, keyboard){
        this.cleanupPreviousWorldInstances();
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.character = new Character();
        this.keyboard = keyboard;
        this.poisonPercentage = 0;
        this.draw();
        this.setWorld();
        this.swim();
    }



    /**
     * This function deletes all previous instances of the world class.
     */
    cleanupPreviousWorldInstances() {
        if (window.world) {
            window.world.character = null; // Remove the reference to the old character instance
            window.world = null; // Remove the reference to the old world instance
        }
    }


    /**
     * This function passes this instance of the world object to the current instances of the character and endboss objects.
     */
    setWorld(){
        this.character.world = this;
        this.endboss.world = this;
    }


    /**
     * This function calls other functions check for in-game-collisions etc.
     */
    swim(){
        setInterval(() => {
            this.checkCollisions();
            this.checkShootObject();
            this.checkForSlapAttack();
            this.checkIfEndbossHasArrived();
        }, 150);
    }


    /**
     * This function checks, if the endboss has arrived and if yes, displays the endboss-health-bar.
     */
    checkIfEndbossHasArrived(){
        if(this.endboss.endbossHasArrived){
            setTimeout(() => {
                this.endbossBar.y = -10;
            }, 1500);
            this.checkEndbossHealth();
        }
    }


    /**
     * This function checks the endboss health and sets the percentage of the endboss-health-bar.
     */
    checkEndbossHealth() {
        setInterval(() => {
            if (this.endboss.energy === 100) {
                this.setEndbossPercentage(100);
            } else if (this.endboss.energy >= 80) {
                this.setEndbossPercentage(80);
            } else if (this.endboss.energy >= 60) {
                this.setEndbossPercentage(60);
            } else if (this.endboss.energy >= 40) {
                this.setEndbossPercentage(40);
            } else if (this.endboss.energy >= 20) {
                this.setEndbossPercentage(20);
            } else if(this.endboss.energy === 0 && !this.endboss.isDead){
                this.setEndbossPercentage(0);
                this.endboss.isDead = true;
            }
        }, 20);
    }

 
    /**
     * This function sets the health-percentage of the endboss inside the endbossBar-class.
     * 
     * @param {number} percentage 
     */
    setEndbossPercentage(percentage){
        this.endbossBar.percentage = percentage;
        this.endbossBar.setPercentage(percentage);
    }


    /**
     * This function creates a new bubble/shoot-object if the d-key is pressed.
     */
    checkShootObject() {
        if (this.keyboard.D) {
            this.character.bubbleAttack();
            let offsetX = this.character.otherDirection ? 20 : 220;
            let bubble;
    
            if (this.hasCharacterPoison) {
                bubble = new PoisonBubble(this.character.x + offsetX, this.character.y + 170, this.character);
                this.poisonPercentage -= 20;
                if (this.poisonPercentage < 0) {
                    this.poisonPercentage = 0;
                }
                this.poisonBar.setPercentage(this.poisonPercentage);
            } else {
                bubble = new AttackObject(this.character.x + offsetX, this.character.y + 170, this.character);
            }
            this.attackObjects.push(bubble);
        }
    }


    /**
     * This function calls all functinos necessary to display the slap-attack.
     */
    checkForSlapAttack(){
        if(this.keyboard.SPACE){
            this.character.slapAttack();
            this.level.enemies.forEach((enemy) => {
                if(this.character.isCharacterNearTo(enemy)){
                    if(!enemy.isEndboss){
                        enemy.gettingSlapped();
                    } else if (enemy.isEndboss){
                        if(this.character.isCharacterNearToEndboss(enemy)){
                            enemy.gettingSlapped();
                        }
                    }
                };
            })
        }
    }


    /**
     * This function checks for collisions of the character with enemies or collectable objects.
     */
    checkCollisions(){
        this.checkCharacterEnemyCollision();
        this.checkCharacterCoinCollision();
        this.checkCharacterPoisonCollision();
        this.checkEnemyBubbleCollision();
    }


    /**
     * This function checks if an enemy is hit by a bubble/shoot object.
     */
    checkEnemyBubbleCollision(){
        this.level.enemies.forEach((enemy) => {
            for (let i = this.attackObjects.length - 1; i >= 0; i--) {
                const bubble = this.attackObjects[i];
                if(enemy.isColliding(bubble)){
                    enemy.hitByBubble(bubble);
                    this.attackObjects.splice(i, 1);
                }
            }
        })
    }


    /**
     * This function checks if the character collides with an enemy.
     */
    checkCharacterEnemyCollision() {
        this.level.enemies.forEach((enemy) => {
            const characterCollidesWithEnemy = this.character.isCharacterColliding(enemy);
            const canCollide = !this.isPlayerHit && !this.character.isDead && !enemy.isDead && !this.character.hasAttacked;
    
            if (characterCollidesWithEnemy && canCollide) {
                if (!enemy.isPoisoned && enemy.isBubble && !enemy.isGettingSlapped && this.isCharacterCollidingBubbleFish(enemy)) {
                    this.characterFishCollision(enemy);
                } else if (enemy.isJellyfish && this.isCharacterCollidingJellyfish(enemy)) {
                    this.characterJellyfishCollision(enemy);
                } else if(enemy.isNormalFish && !enemy.isBubble && this.isCharacterCollidingNormalFish(enemy)){
                    this.characterFishCollision(enemy);
                } else if (enemy.isEndboss && this.isCharacterCollidingEndboss(enemy)) { 
                    this.handleEndbossCollision(enemy);
                }
            }
        });
    }

    
    /**
     * This function handles the character/endboss-collision and calls other functions depending on whether the endboss is poisoned or not.
     * 
     * @param {object} enemy - It takes in the enemy/endboss-object as a parameter.
     */
    handleEndbossCollision(enemy){
        if (enemy.isPoisoned) {
            this.characterAndPoisonedEndbossCollision(enemy);
        } else {
            this.characterFishCollision(enemy);
        }
    }


    /**
     * This function handles the character-fish-collision for when the fish is blown up.
     * 
     * @param {object} enemy - It takes in the enemy/fish-object as a parameter.
     */
    characterFishCollision(enemy){
        this.character.hitByFish();
        this.characterHit();
        enemy.characterCollision();
    }


    /**
     * This function handles the character-jellyfish-collision.
     * 
     * @param {object} enemy - It takes in the enemy/jellyfish-object as a parameter.
     */
    characterJellyfishCollision(enemy){
            this.character.hitByJellyfish();
            this.characterHit();
            enemy.characterCollision();
    }


    /**
     * This function handles the character-fish-collision for when the fish is in its normal state.
     * 
     * @param {object} enemy - It takes in the enemy/fish-object as a parameter.
     */
    characterNormalFishCollision(enemy){
        if(this.isCharacterCollidingNormalFish(enemy)){
            this.characterFishCollision(enemy);
        }
    }


    /**
     * This function handles the character/poisoned-endboss-collision.
     * 
     * @param {object} enemy - It takes in the enemy/endboss-object as a parameter.
     */
    characterAndPoisonedEndbossCollision(enemy){
        enemy.characterCollision();
        this.character.collisionWithPoisonedEndboss();
    }

  
    /**
     * This function checks if the character is actually colliding with the endboss.
     * 
     * @param {object} endboss - It takes in the endboss-object as a parameter.
     * @returns - It return a boolean.
     */
    isCharacterCollidingEndboss(endboss){
        return (
            this.character.trueX + this.character.trueWidth > endboss.x + 20 &&
            this.character.trueY + this.character.trueHeight > endboss.y+140 &&
            this.character.trueX < endboss.x + 20 &&
            this.character.trueY < endboss.y +140 + endboss.height-220
          );
    }


    /**
     * This function checks if the character is actually colliding with the jellyfish.
     * 
     * @param {object} endboss - It takes in the jellyfish-object as a parameter.
     * @returns - It return a boolean.
     */
    isCharacterCollidingJellyfish(mo){
        return (
            this.character.trueX + this.character.trueWidth > mo.x + 5 &&
            this.character.trueY + this.character.trueHeight > mo.y + 20 &&
            this.character.trueX < mo.x + 5 &&
            this.character.trueY < mo.y + mo.height - 40
          );
    }


    /**
     * This function checks if the character is actually colliding with the fish in it normal state.
     * 
     * @param {object} endboss - It takes in the fish-object as a parameter.
     * @returns - It return a boolean.
     */
    isCharacterCollidingNormalFish(mo){
        return (
            this.character.trueX + this.character.trueWidth > mo.x + 10 &&
            this.character.trueY + this.character.trueHeight > mo.y &&
            this.character.trueX < mo.x + 10 &&
            this.character.trueY < mo.y + mo.height - 25
          );
    }
   

    /**
     * This function checks if the character is actually colliding with the fish in its blown-up state.
     * 
     * @param {object} endboss - It takes in the endboss-object as a parameter.
     * @returns - It return a boolean.
     */
    isCharacterCollidingBubbleFish(mo){
        return (
            this.character.trueX + this.character.trueWidth > mo.x + 10 &&
            this.character.trueY + this.character.trueHeight > mo.y &&
            this.character.trueX < mo.x + 10 &&
            this.character.trueY < mo.y + mo.height - 15
          );
    }
    

    /**
     * This functions handles the case when the character is hit/collides with an enemy.
     */
    characterHit(){
        this.isPlayerHit = true;
        this.deactivateKeyboard();
        this.statusBar.setPercentage(this.character.energy);
        setTimeout(() => {
            this.isPlayerHit = false;
        }, 500);
    }


    /**
     * This function handles the case when the character collides with a coin.
     */
    checkCharacterCoinCollision(){
        this.level.coins.forEach((coin) => {
            if(!coin.isCollected && this.character.isCharacterColliding(coin)){
                coin.collect();
                this.coinBar.coinCollected();
                coin.isCollected = true;
            }
        })
    }


    /**
     * This function handles the case when the character collides with a poison bottle.
     */
    checkCharacterPoisonCollision(){
        this.level.poisonBottles = this.level.poisonBottles.filter((bottle) => {
            if(this.character.isCharacterColliding(bottle)) {
                bottle.collect();
                this.poisonBar.poisonBottleCollected();
                return false;
            }
            return true;
        })
    }


    /**
     * This function adds all game-objects to the game-canvas.
     */
    draw(){
        if(gameIsRunning){
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.width);

            this.ctx.translate(this.camera_x, 0);
            this.addObjectsToMap(this.level.backgroundObjects);

            this.ctx.translate(-this.camera_x, 0);
            this.addToMap(this.statusBar);
            this.addToMap(this.coinBar);
            this.addToMap(this.poisonBar);
            this.addToMap(this.endbossBar);
            
            this.ctx.translate(this.camera_x, 0);

            this.addToMap(this.character);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.attackObjects);
            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.level.poisonBottles);

            this.ctx.translate(-this.camera_x, 0);
            
            let self = this;
            requestAnimationFrame(function(){
                self.draw();
            });
        }
    }


    /**
     * This function works as a helper-function for the draw-function to add all game-objects to the canvas/map.
     * 
     * @param {array} objects - It takes in the arrays with the game objects.
     */
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        })
    }


    /**
     * This function add the character to the map and mirrors him vertically if the direction changes.
     * 
     * @param {object} - It takes in the character-object as a parameter.
     */
    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo);
        }
        mo.draw(this.ctx)
        if(mo.otherDirection){
            this.flipImageBack(mo);
        }
    }


    /**
     * This function mirrors the image of the character vertically if the direction changes.
     * 
     * @param {object} - It takes in the character object as a parameter.
     */
    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


     /**
     * This function mirrors the image of the character vertically if the direction changes.
     * 
     * @param {object} - It takes in the character object as a parameter.
     */
    flipImageBack(mo){
        this.ctx.restore();
        mo.x = mo.x * -1;
    }


    /**
     * This function deactivates the keyboard.
     */
    deactivateKeyboard(){
        this.keyboard.LEFT = false;
        this.keyboard.RIGHT = false;
        this.keyboard.UP = false;
        this.keyboard.DOWN = false;
        this.keyboard.SPACE = false;
        this.keyboard.D = false;
    }


}