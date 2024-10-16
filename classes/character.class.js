class Character extends MoveableObject {
  width = 300;
  height = 300;
  x = 40;
  y = 150;
  world;
  speed = 5;
  swimmingSound = new TrackableAudio("audio/swim.mp3");
  slapSound = new TrackableAudio("audio/slap_attack.mp3");
  slapImpactSound = new TrackableAudio ("audio/slap1.mp3");
  
  bubbleSound = new TrackableAudio("audio/bubble_sound.mp3");
  hurtSound = new TrackableAudio("audio/hurt2.mp3");

  gameOverSound = new TrackableAudio("audio/playerDeath2.mp3");
  gameOverSoundPlayed = false;
  gameOverScreenDisplayed = false;

  hasAttacked = false;
  isDead = false;
  isShocked = false;
  isPoisoned = false;

  trueX = this.x + 60;
  trueY = this.y + 140;
  trueWidth = this.width - 118;
  trueHeight = this.height - 210;

  IMAGES_SWIMMING = [
    "img/1.Sharkie/3.Swim/1.png",
    "img/1.Sharkie/3.Swim/2.png",
    "img/1.Sharkie/3.Swim/3.png",
    "img/1.Sharkie/3.Swim/4.png",
    "img/1.Sharkie/3.Swim/5.png",
    "img/1.Sharkie/3.Swim/6.png",
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

  IMAGES_ELECTRIC = [
    "img/1.Sharkie/5.Hurt/2.Electric shock/1.png",
    "img/1.Sharkie/5.Hurt/2.Electric shock/2.png",
    "img/1.Sharkie/5.Hurt/2.Electric shock/3.png",
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
  ];

  IMAGES_ATTACK = [
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png",
  ];

  IMAGES_SLAP = [
    "img/1.Sharkie/4.Attack/Fin slap/1.png",
    "img/1.Sharkie/4.Attack/Fin slap/2.png",
    "img/1.Sharkie/4.Attack/Fin slap/3.png",
    "img/1.Sharkie/4.Attack/Fin slap/4.png",
    "img/1.Sharkie/4.Attack/Fin slap/5.png",
    "img/1.Sharkie/4.Attack/Fin slap/6.png",
    "img/1.Sharkie/4.Attack/Fin slap/7.png",
    "img/1.Sharkie/4.Attack/Fin slap/8.png",
  ];

  constructor() {
    super().loadImage("img/1.Sharkie/3.Swim/1.png");
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_SLAP);
    this.loadImages(this.IMAGES_ELECTRIC);
    this.checkBorderCollision();
    this.animate();

    this.swimmingSound.volume = 0.1;
  }


  /**
   * This function animates the character and handles the case when arrow-keys are pressed on the keyboard so that he can be moved.
   */
  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
      }
      if (this.world.keyboard.UP) {
        this.moveUp();
      }
      if (this.world.keyboard.DOWN) {
        this.moveDown();
      }
      this.world.camera_x = -this.x;
    }, 1000 / 40);

    this.setSoundAndAnimation();
  }


  /**
   * This function checks if the character is colliding with the borders of the game.
   */
  checkBorderCollision() {
    setInterval(() => {
      this.checkGroundCollision();
      this.checkTopBorderCollision();
    }, 50);
  }


  /**
   * This function handles the case when the character gets too low on the map so that he gets damage.
   */
  checkGroundCollision() {
    if (this.y >= 225) {
      this.world.characterHit();
      this.isPoisoned = true;
      this.hurtSound.play();

      this.hit();
      this.isHurt();

      this.y -= 40;
      this.trueY -= 40;

      setTimeout(() => {
        this.isPoisoned = false;
      }, 500);
    }
  }


 /**
   * This function handles the case when the character gets too high on the map so that he gets damage.
   */
  checkTopBorderCollision() {
    if (this.y <= -150 && !this.isDead) {
        this.hurtSound.play();
        this.y += 40;
        this.trueY += 40;
    }
  }


  /**
   * This function makes the character move left.
   */
  moveLeft() {
    this.x -= this.speed;
    this.trueX -= this.speed;
    this.otherDirection = true;
  }


  /**
   * This function makes the character move right.
   */
  moveRight() {
    this.x += this.speed;
    this.trueX += this.speed;
    this.otherDirection = false;
  }


  /**
   * This function makes the character move up.
   */
  moveUp() {
    this.y -= this.speed;
    this.trueY -= this.speed;
  }

  /**
   * This function makes the character move down.
   */
  moveDown() {
    this.y += this.speed;
    this.trueY += this.speed;
  }


  /**
   * This function works as a helper function to check if the character is colliding with a moveable object.
   * 
   * @param {object} mo - It takes in the moveable object as a parameter.
   * @returns It returns a boolean.
   */
  isCharacterColliding(mo) {
    return (
      this.trueX + this.trueWidth > mo.x &&
      this.trueY + this.trueHeight > mo.y &&
      this.trueX < mo.x &&
      this.trueY < mo.y + mo.height
    );
  }


  /**
   * This function works as a helper function to check if the character is near to a moveable object.
   * 
   * @param {*} mo - It takes in the moveable object as a parameter.
   * @returns It returns a boolean.
   */
  isCharacterNearTo(mo) {
    return (
      this.trueX + this.trueWidth > mo.x - 40 &&
      this.trueY + this.trueHeight > mo.y &&
      this.trueX < mo.x - 40 &&
      this.trueY < mo.y + mo.height
    );
  }


  /**
   * This function works as a helper function to check if the character is near to the endboss.
   * 
   * @param {*} mo - It takes in the endboss as a parameter.
   * @returns It returns a boolean.
   */
  isCharacterNearToEndboss(mo){
    return (
      this.trueX + this.trueWidth > mo.x - 40 &&
      this.trueY + this.trueHeight > mo.y + 140 &&
      this.trueX < mo.x - 40 &&
      this.trueY < mo.y + 140 + mo.height - 220
    );
  }


  /**
   * This function sets the sound and animation images according to the character's current state.
   */
  setSoundAndAnimation() {
    setInterval(() => {
      if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP ||this.world.keyboard.DOWN) && !this.hasAttacked) {
        this.playAnimation(this.IMAGES_SWIMMING);
        this.swimmingSound.play();
      } else if (this.isPoisoned) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isShocked) {
        this.playAnimation(this.IMAGES_ELECTRIC);
      } else if (this.hasAttacked) {
        this.playAnimation(this.IMAGES_SLAP);
      } else if (this.characterIsDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.loadImage(this.IMAGES_DEAD[11]);
        this.isDead = true;
        this.gameOver();
        
      } else {
        this.playAnimation(this.IMAGES_IDLE);
      }
    }, 95);
  }


  /**
   * This function handles the case when the character has died.
   */
  gameOver() {
    stopBossMusic();
    stopBackgroundMusic();
    if(!this.gameOverSoundPlayed){
      this.gameOverSound.play();
      this.gameOverSoundPlayed = true;
    }
    this.floatingOut();
    
    if(!this.gameOverScreenDisplayed){
      setTimeout(displayGameOverScreen, 3000);
      this.gameOverScreenDisplayed = true;
    }
  }


  /**
   * This function makes the (dead) character float away.
   */
  floatingOut() {
    setInterval(() => {
      this.y -= 2;
    }, 100);
  }


  /**
   * This function handles the case when the character makes a bubble-attack.
   */
  bubbleAttack() {
    this.bubbleSound.play();
    this.playAnimation(this.IMAGES_ATTACK);
  }


  /**
  * This function handles the case when the character makes a fin-slap-attack.
  */
  slapAttack() {
    if (!this.hasAttacked) {
      this.hasAttacked = true;
      this.slapSound.play();

      setTimeout(() => {
        this.slapImpactSound.play();
      }, 200);

      setTimeout(() => {
        this.hasAttacked = false;
      }, 500);
    }
  }


  /**
   * This function handles the case when the character collides with the poisoned endboss so that he does not get dammage.
   */
  collisionWithPoisonedEndboss(){
    this.hurtSound.play();
    this.pushBackSmall();
    
  }


  /**
   * This function handles the case when the character is hit by a fish/enemy.
   */
  hitByFish() {
    this.isPoisoned = true;
    this.hurtSound.play();
    this.hit();
    this.isHurt();
    this.pushBack();
    setTimeout(() => {
      this.isPoisoned = false;
    }, 500);
  }


  /**
   * This function handles the case when the character is hit by a jellyfish.
   */
  hitByJellyfish() {
    this.isShocked = true;
    this.hit();
    this.isHurt();
    this.pushBack();
    setTimeout(() => {
      this.isShocked = false;
    }, 500);
  }


  /**
   * This function pushes the character back.
   */
  pushBack() {
    this.x -= 50;
    this.trueX -= 50;
  }


  /**
   * This function pushes the character back a bit.
   */
  pushBackSmall(){
    this.x -= 20;
    this.trueX -= 20;
  }
}
