class MoveableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    energy = 100;
    lastHit = 0;

 

    /**
     * This function checks if a moveable object is colliding with another object.
     * 
     * @param {*} mo - It takes in the other moveable object as a parameter.
     * @returns It returns a boolean.
     */
    isColliding(mo){
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }

   
    /**
     * This function handles the case when an object is hit and decreases its energy.
     */
    hit(){
        this.energy -= 20;
        if(this.energy < 0){
            this.energy = 0;
        } else{
            this.lastHit = new Date().getTime();
        }
    }


     /**
     * This function handles the case when an object is hurt and makes sure it cannot be hit too often.
     */
    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        
        return timePassed < 1;
    }


    /**
     * This function works as a helper function to check if the character is dead.
     * 
     * @returns - It returns a boolean.
     */
    characterIsDead(){
        return this.energy == 0;
    }


    /**
     * This function moves an moveable object to the left evenly.
     */
    moveLeft(){
        setInterval(()=> {
            this.x -= this.speed;
        }, 1000/60);
    }


    /**
     * This function plays an animation that consist of several images.
     * 
     * @param {array} images - It takes in an array of images as a parameter.
     */
    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    
}