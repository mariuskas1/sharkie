class Level {
    enemies;
    backgroundObjects;
    coins;
    poisonBottles;
    level_end_x = 10800;
    
    constructor(enemies, backgroundObjects, coins, poisonBottles){
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.poisonBottles = poisonBottles;
    }
}