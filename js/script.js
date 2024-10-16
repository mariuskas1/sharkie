
let backgroundMusic = new TrackableAudio ("audio/background_music3.mp3");
let bossMusic = new TrackableAudio ("audio/boss_music.mp3");
let winMusic = new TrackableAudio ("audio/win2.mp3");

let storedVolume = "on";



/**
 * This function calls all functions necessary to prepare the game to load properly.
 */
function prepareGame(){
    getStoredVolume();
    clearAllIntervals();
    clearAllLevelObjectArrays();
    populateBackgroundImagesArray(); 
    populateLevelObjectArrays();
}


/**
 * This function loads the volume-setting ("muted" or "on") from the local storage.
 */
function getStoredVolume(){
    storedVolume = localStorage.getItem("storedVolume");
}


/**
 * This functions calls all functions nevessary to start the game.
 */
function startGame(){
    hideStartScreen();
    showCanvas();
    initLevel();
    init();
    checkForMutedSounds();
    playBackgroundMusic();
}


/**
 * This function checks if the saved volume setting is "muted" and mutes all sounds when the game is starting and the sound where muted previously.
 */
function checkForMutedSounds(){
    if(storedVolume === "muted") {
        TrackableAudio.allAudioObjects.forEach(element => element.muted = true);
        document.getElementById("volume-div").innerHTML = `<img src="img/volume-high-solid.svg" class="volume-img">`;
    }
}


/**
 * This function diplays the mute-button when starting the game.
 */
function showVolumeDiv(){
    document.getElementById("volume-div").classList.remove("d-none");
}


/**
 * This function hides the mute-button again when the game is over.
 */
function hideVolumeDiv(){
    document.getElementById("volume-div").classList.add("d-none");
}


/**
 * This function displays the keys for mobile devices.
 */
function showMobileKeys(){
    document.getElementById("mobile-keys").classList.remove("d-none");
    addEventListenersOnMobileKeys();
}


/**
 * This function hides the keys for mobile devices.
 */
function hideMobileKeys(){
    document.getElementById("mobile-keys").classList.add("d-none");
}


/**
 * This function displays the instructions for the game on the start screen.
 */
function showInstructions(){
    let startScreen = document.getElementById("startScreen");
    startScreen.innerHTML = "";
    startScreen.innerHTML = `
        <img class="info-img" src="img/circle-info-solid.svg" onclick="openLegalNotice()">
        <button class="instructions-btn" id="back-btn" onclick="navigateBackToStartPage()">Back</button>
        <div class="instructions-div">
            <div class="instructions-row">
                <img class="instructions-img" src="img/6.Botones/Key/arrow keys.png" >
                <img class="instructions-img inst-title" id="move-shark-img" src="img/6.Botones/Tittles/Move title.png">
            </div>
            <div class="instructions-row">
                <div class="attack-instructions-div">
                    <img class="instructions-img" id="space-img" src="img/6.Botones/Key/Space Bar key.png">
                    <img class="instructions-img" id="d-img" src="img/6.Botones/Key/D key.png" >
                </div>
                <img class="instructions-img inst-title" src="img/6.Botones/Tittles/Attack tittle.png">
            </div>
        </div>
    `;
}


/**
 * This function displays the start screen again after the instrucitons where displayed.
 */
function navigateBackToStartPage(){
    let startScreen = document.getElementById("startScreen");
    startScreen.innerHTML = "";
    startScreen.innerHTML = `
        <img class="info-img" src="img/circle-info-solid.svg" onclick="openLegalNotice()">
        <div class="start-btns-div">
            <button class="instructions-btn" onclick="showInstructions()">Instructions</button>
            <img src="img/6.Botones/Start/2.png" class="start-img" onclick="startGame()">
        </div>
    
    `;
}


/**
 * This function hides the start screen by applying another class to it with the setting "display: none".
 */
function hideStartScreen(){
    document.getElementById("startScreen").classList.add("d-none");
}


/**
 * This function displays the canvas on which the game is displayed.
 */
function showCanvas(){
    document.getElementById("canvas").classList.remove("d-none");
    showVolumeDiv();
    showMobileKeys();
}


/**
 * This function hides the canvas on which the game is displayed.
 */
function hideCanvas(){
    document.getElementById("canvas").classList.add("d-none");
    hideVolumeDiv();
    hideMobileKeys();
}


/**
 * This function starts the background music.
 */
function playBackgroundMusic(){
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3;
    backgroundMusic.play();
}


/**
 * This function stops the background music.
 */
function stopBackgroundMusic() {
    backgroundMusic.pause(); 
    backgroundMusic.currentTime = 0; 
}


/**
 * This function starts the boss music for the final enemy.
 */
function startBossMusic(){
    bossMusic.loop = true;
    bossMusic.volume = 0.5;
    bossMusic.play();
}


/**
 * This function stops the boss music.
 */
function stopBossMusic(){
    bossMusic.pause(); 
    bossMusic.currentTime = 0; 
}


/**
 * This function displays the end screen, when the last enemy has been defeated.
 */
function displayEndScreen(){
    clearAllIntervals();
    gameIsRunning = false;
    hideCanvas();
    document.getElementById("endScreen").classList.remove("d-none");
    stopBossMusic();
    startWinMusic();

    setTimeout(() => {
        document.getElementById("start-game-again-btn").classList.remove("d-none");
    }, 3000);
}


/**
 * This functions plays the celebration sound.
 */
function startWinMusic(){
    winMusic.play();
}


/**
 * This function displays the game-over-screen when the player died.
 */
function displayGameOverScreen(){
    clearAllIntervals();
    clearAllLevelObjectArrays();
    gameIsRunning = false;
    hideCanvas();
    document.getElementById("gameOverScreen").classList.remove("d-none");
}


/**
 * This function starts the game again after the game was won.
 */
function startGameAgain(){
    resetWinMusic();
    document.getElementById("endScreen").classList.add("d-none");
    document.getElementById("start-game-again-btn").classList.add("d-none");
    clearAllLevelObjectArrays();
    Fish.resetLastFishPosition();
    showCanvas();
    populateLevelObjectArrays();
    initLevel();
    init();
    playBackgroundMusic();
}


/**
 * This function resets the winning sound to its initial state.
 */
function resetWinMusic(){
    winMusic.pause();
    winMusic.currentTime = 0;
}


/**
 * This function starts the game again after the player died.
 */
function tryAgain(){
    Fish.resetLastFishPosition();
    populateLevelObjectArrays();
    initLevel();
    init();    
    document.getElementById("gameOverScreen").classList.add("d-none");
    showCanvas();
    playBackgroundMusic();

};


/**
 * This function clears all level object arrays.
 */
function clearAllLevelObjectArrays(){
    enemies = [];
    coins = [];
    poisonBottles = [];
}


/**
 * This function clears all intervals.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  };


/**
* This function sets the volume to either "on" or "mute" when the mute-button is clicked.
*/
function toggleVolume(){
    if(storedVolume === "on"){
        document.getElementById("volume-div").innerHTML = `<img src="img/volume-high-solid.svg" class="volume-img">`;
        TrackableAudio.allAudioObjects.forEach(element => element.muted = true);
        storedVolume = "muted";
    } else {
        document.getElementById("volume-div").innerHTML = `<img src="img/volume-xmark-solid.svg" class="volume-img"></img>`;
        TrackableAudio.allAudioObjects.forEach(element => element.muted = false);
        storedVolume = "on";
    }
    localStorage.setItem("storedVolume", storedVolume);
}


/**
 * This function opens a new tab with the legal notices.
 */
function openLegalNotice() {
    window.open('legal_notice.html', '_blank');
  }


/**
 * This function redirects the user to the home screen.
 */
function redirectToHomeScreen(){
    window.location.href = 'index.html';
}
