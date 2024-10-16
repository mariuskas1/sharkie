class PoisonBar extends StatusBar{
    IMAGES = [
       "img/4. Marcadores/orange/0_ copia.png",
       "img/4. Marcadores/orange/20_ copia.png",
       "img/4. Marcadores/orange/40_ copia.png",
       "img/4. Marcadores/orange/60_ copia.png",
       "img/4. Marcadores/orange/80_ copia.png",
       "img/4. Marcadores/orange/100_ copia.png",
      
    ];


    world;
    y = 80;
    

    constructor(world){
        super();
        this.world = world;
        this.loadImages(this.IMAGES);
        this.setPoisonPercentage(0);
        this.checkIfCharacterHasPoison();
    }


    /**
     * This function sets the percentage for the poison bar.
     * 
     * @param {number} percentage - It takes in the percentage as a parameter.
     */
    setPoisonPercentage(percentage){
        this.world.poisonPercentage = percentage; 
        let path = this.IMAGES[this.resolvePoisonBarImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * This function checks if the character has poison.
     */
    checkIfCharacterHasPoison(){
        setInterval(() => {
            if(this.world.poisonPercentage > 0){
                this.world.hasCharacterPoison = true;
            } else if (this.world.poisonPercentage === 0){
                this.world.hasCharacterPoison = false;
            }
        }, 100);
    }


    /**
     * This function handles the case when a poison bottle is collected and incrementes the poison-percentage in the world class.
     */
    poisonBottleCollected(){
        this.world.poisonPercentage += 20;
        if(this.world.poisonPercentage > 100){
            this.world.poisonPercentage = 100;
        }
        this.setPoisonPercentage(this.world.poisonPercentage);
    }


    /**
     * This function sets the index-number for the poison bar imames-array according to the poison percentage in the world class.
     * 
     * @returns It returns the index number.
     */
    resolvePoisonBarImageIndex() {
            if (this.world.poisonPercentage == 0) {
                return 0;
            } else if (this.world.poisonPercentage <= 20) {
                return 1;
            } else if (this.world.poisonPercentage <= 40) {
                return 2;
            } else if (this.world.poisonPercentage <= 60) {
                return 3;
            } else if (this.world.poisonPercentage <= 80) {
                return 4;
            } else if (this.world.poisonPercentage <= 100) {
                return 5;
            }        
    }
}