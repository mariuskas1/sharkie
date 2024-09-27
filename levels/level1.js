let levelEnd_x = 7200;
let backgroundImages = [];

const backgroundImagesFirstHalf = (x) => [
    new BackgroundObject("img/3. Background/Layers/5. Water/L1.png", x, 0),
    new BackgroundObject("img/3. Background/Layers/1. Light/1.png", x, 0),
    new BackgroundObject("img/3. Background/Layers/4.Fondo 2/L1.png", x, 0),
    new BackgroundObject("img/3. Background/Layers/3.Fondo 1/L1.png", x, 0),
    new BackgroundObject("img/3. Background/Layers/2. Floor/L1.png", x, 0),
];

const backgroundImagesSecondHalf = (x) => [
    new BackgroundObject("img/3. Background/Layers/5. Water/L2.png", x, 0),
    new BackgroundObject("img/3. Background/Layers/1. Light/2.png", x, 0),
    new BackgroundObject("img/3. Background/Layers/4.Fondo 2/L2.png", x, 0),
    new BackgroundObject("img/3. Background/Layers/3.Fondo 1/L2.png", x, 0),
    new BackgroundObject("img/3. Background/Layers/2. Floor/L2.png", x, 0),
];


function populateBackgroundImagesArray() {
    let background_x = 0;

    while (background_x < levelEnd_x) {
        backgroundImages.push(...backgroundImagesFirstHalf(background_x));
        background_x += 720;

        backgroundImages.push(...backgroundImagesSecondHalf(background_x));
        background_x += 720;
    }
}


let level1;

function initLevel() {
    level1 = new Level(
        [
            new Fish(),
            new Fish(),
            new Fish(),
            new Endboss()
        ],
        backgroundImages 
    );
}





