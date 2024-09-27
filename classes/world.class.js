class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    poisonBar = new PoisonBar();
    attackObjects = [];


    constructor(canvas, keyboard){
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.swim();
    }


    setWorld(){
        this.character.world = this;
    }


    swim(){
        setInterval(() => {
            this.checkCollisions();
            this.checkShootObject();
        }, 150);
    }


    checkShootObject(){
        if(this.keyboard.D){
            let bubble = new AttackObject(this.character.x + 220, this.character.y + 170);
            this.attackObjects.push(bubble);
        }
    }


    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
            if(this.character.isCharacterColliding(enemy)){
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }


    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.width);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.poisonBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.attackObjects);

        this.ctx.translate(-this.camera_x, 0);
        
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }


    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        })
    }


    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection){
            this.flipImageBack(mo);
        }
    }


    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo){
        this.ctx.restore();
        mo.x = mo.x * -1;
    }
}