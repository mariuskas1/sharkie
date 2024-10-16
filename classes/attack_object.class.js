class AttackObject extends MoveableObject{
    speedX = 10;
    height = 50;
    width = 50;
    character;
    


    constructor(x, y, character){
        super().loadImage("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
        this.character = character;
        this.x = x;
        this.y = y;
        this.shoot()
       
    }


    /**
     * This function makes the attack object/bubble move as if it had been shot, according to the current direction of the character.
     */
    shoot(){
        if(!this.character.otherDirection){
            setInterval (() => {
                this.x += this.speedX;
            }, 25);
        } else if(this.character.otherDirection){
            setInterval (() => {
                this.x -= this.speedX;
            }, 25);
        }
    }
}