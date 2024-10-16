class EndbossHealthBar extends StatusBar {

    IMAGES = [
        "img/4. Marcadores/green/Life/0_  copia 3.png",
        "img/4. Marcadores/green/Life/20_ copia 4.png",
        "img/4. Marcadores/green/Life/40_  copia 3.png",
        "img/4. Marcadores/green/Life/60_  copia 3.png",
        "img/4. Marcadores/green/Life/80_  copia 3.png",
        "img/4. Marcadores/green/Life/100_  copia 2.png"
    ];

    percentage = 100;
    x = 320;
    y = -100;
    width = 320;
    height = 80;
    


    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }
  
}