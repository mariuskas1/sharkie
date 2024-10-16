class StatusBar extends DrawableObject{
    IMAGES = [
        "img/4. Marcadores/orange/0_  copia.png",
        "img/4. Marcadores/orange/20_ copia 2.png",
        "img/4. Marcadores/orange/40_  copia.png",
        "img/4. Marcadores/orange/60_  copia.png",
        "img/4. Marcadores/orange/80_  copia.png",
        "img/4. Marcadores/orange/100_  copia.png",
    ];

    percentage = 100;
    x = 20;
    y = 0;
    width = 220;
    height = 60;


    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }


    /**
     * This function sets the percentage of the status bar.
     * 
     * @param {number} percentage - It takes in the percentages as a parameter.
     */
    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    

    /**
     * This function sets the index for the status-bar-images-array according to the status bar percentage.
     * 
     * @returns It returns the index-number for the status-bar-images-array.
     */
    resolveImageIndex(){
        if(this.percentage == 100){
            return 5;
        } else if (this.percentage >= 80){
            return 4;
        } else if (this.percentage >= 60){
            return 3;
        } else if (this.percentage >= 40){
            return 2;
        } else if (this.percentage >= 20){
            return 1;
        } else {
            return 0;
        }
    }

}