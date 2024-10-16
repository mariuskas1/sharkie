class PoisonBubble extends AttackObject {

    speedX = 10;
    height = 60;
    width = 60;
    character;
    isPoisonBubble = true;


    constructor(x, y, character){
        super(x, y, character);
        this.loadImage("img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png");
        this.character = character;
        this.x = x;
        this.y = y;
        this.shoot()
    }


}