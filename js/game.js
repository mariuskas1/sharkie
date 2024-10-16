
let canvas;
let world;
let keyboard = new Keyboard();
let gameIsRunning = false;



/**
 * This function initializes the game, creates a new instance of the world-class and deletes all previous instances of it.
 */
function init(){
    gameIsRunning = true;
    canvas = document.getElementById("canvas");

    if (typeof world !== 'undefined' && world !== null) {
        world = null; // Remove previous instance of World
    }

    world = new World(canvas, keyboard);
    addEventListenersOnDesktopKeys();
}



/**
 * This function adds event-listeners for the keys on the desktop version.
 */
function addEventListenersOnDesktopKeys() {
    addDesktopKeyListeners('keydown', true);
    addDesktopKeyListeners('keyup', false);
}


/**
 * This function works as a helper function for the addEventListnersOnDesktopKeys-function.
 * 
 * @param {string} eventType - It takes in the eventType as a parameter.
 * @param {boolean} state  - It takes in the state of the key as a parameter.
 */
function addDesktopKeyListeners(eventType, state) {
    document.addEventListener(eventType, (e) => {
        switch (e.code) {
            case 'ArrowRight':
                handleDesktopKeyPress('RIGHT', state);
                break;
            case 'ArrowLeft':
                handleDesktopKeyPress('LEFT', state);
                break;
            case 'ArrowUp':
                handleDesktopKeyPress('UP', state);
                break;
            case 'ArrowDown':
                handleDesktopKeyPress('DOWN', state);
                break;
            case 'Space':
                handleDesktopKeyPress('SPACE', state);
                break;
            case 'KeyD':
                handleDesktopKeyPress('D', state);
                break;
        }
    });
}


/**
 * This function works as a helper function for the addEventListnersOnDesktopKeys-function.
 * 
 * @param {string} key - It takes in the key as a parameter.
 * @param {boolean} state - It takes in the state of the key as a parameter.
 * @returns 
 */
function handleDesktopKeyPress(key, state) {
    if (world.isPlayerHit || world.character.isDead) return;
    keyboard[key] = state;
}


/**
 * This function adds event listeners to the keys for mobile devices.
 */
function addEventListenersOnMobileKeys() {
    addTouchListeners("mobile-arrow-up", "UP");
    addTouchListeners("mobile-arrow-left", "LEFT");
    addTouchListeners("mobile-arrow-down", "DOWN");
    addTouchListeners("mobile-arrow-right", "RIGHT");
    addTouchListeners("mobile-d-key", "D");
    addTouchListeners("mobile-space-bar", "SPACE");
}


/**
 * This function works as a helper function for the addEventListnersOnMobileKeysFunction.
 * 
 * @param {string} id - It takes in the id of the key element as a parameter.
 * @param {string} key - It takes in the key that should be applied to the element as a parameter.
 */
function addTouchListeners(id, key) {
    document.getElementById(id).addEventListener("touchstart", (e) => {
        e.preventDefault();
        handleMobileTouch(key, true);
    });
    document.getElementById(id).addEventListener("touchend", (e) => {
        e.preventDefault();
        handleMobileTouch(key, false);
    });
}


/**
 * This function works as a helper function for the addEventListenersOnMobileKeys-function.
 * 
 * @param {string} key - It takes in the key an event listener should be applied to as a parameter.
 * @param {boolean} state  - It takes in the state that shosuld be assigned to each key as a parameter.
 * @returns - It returns undefined if the player is hit or the character is dead so that one cannot move him in those cases.
 */
function handleMobileTouch(key, state) {
    if (world.isPlayerHit || world.character.isDead) return;
    keyboard[key] = state;
}



















