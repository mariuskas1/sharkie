class AttackObject extends MoveableObject{
    speedX = 10;
    height = 50;
    width = 50;


    constructor(x, y){
        super().loadImage("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
        this.x = x;
        this.y = y;
        this.shoot()
    }


    shoot(){
        setInterval (() => {
            this.x += this.speedX;
        }, 25);
    }
}