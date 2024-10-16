class CoinBar extends StatusBar{
    IMAGES = [
       "img/4. Marcadores/orange/0_  copia 2.png",
       "img/4. Marcadores/orange/20_  copia.png",
       "img/4. Marcadores/orange/40_  copia 2.png",
       "img/4. Marcadores/orange/60_  copia 2.png",
       "img/4. Marcadores/orange/80_  copia 2.png",
       "img/4. Marcadores/orange/100_ copia 2.png"
    ];

    percentageCoins = 0;
    y = 40;


    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }


   /**
    * This function handles the case when a coin is collected and increments the coin percentage.
    */
    coinCollected(){
        this.percentageCoins += 20;
        this.setPercentage(this.percentageCoins);
    }

}