let levelEnd_x = 10800;
let backgroundImages = [];
let coins = [];
let poisonBottles = [];
let enemies = [];
let level1;


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


/**
 * This function populates the backgroundImages-array.
 */
function populateBackgroundImagesArray() {
    backgroundImages = [];
    let background_x = -720;

    while (background_x < levelEnd_x) {
        backgroundImages.push(...backgroundImagesFirstHalf(background_x));
        background_x += 720;

        backgroundImages.push(...backgroundImagesSecondHalf(background_x));
        background_x += 720;
    }
}


/**
 * This function calls all functions necessary to populate all level-object-arrays.
 */
function populateLevelObjectArrays(){
    populateCoinsArray();
    populatePoisonBottlesArray();
    populateEnemiesArray();
}


/**
 * This function populates the coins-array.
 */
function populateCoinsArray(){
    for (let i = 0; i < 5; i++) {
        const coin = new Coin();
        coins.push(coin); 
    }
}


/**
 * This function populates the poison-bottle-array.
 */
function populatePoisonBottlesArray() {
    for (let i = 0; i < 10; i++) {
        const poisonBottle = new PoisonBottle();
        poisonBottles.push(poisonBottle); 
    }
}


/**
 * This function populates the enemies-array, so that the endboss is always the last enemy.
 */
function populateEnemiesArray(){
    for (let i = 0; i < 4; i++) {
        for (let i = 0; i < 3; i++) {
            enemies.push(new Fish());
        }
        enemies.push(new Jellyfish());
    }
    enemies.push(new Endboss());
}


/**
 * This function initializes a new level and deletes all previous instances of the level-class saved to the level1-variable.
 */
function initLevel() {
    if (typeof level1 !== 'undefined' && level1 !== null) {
        level1 = null;  // Remove the reference to the previous instance
    }

    level1 = new Level(
        enemies,
        backgroundImages,
        coins,
        poisonBottles
    );
}





