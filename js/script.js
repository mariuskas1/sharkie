let backgroundMusic = new Audio ("audio/background_music3.mp3");


function startGame(){
    hideStartScreen();
    showCanvas();
    populateBackgroundImagesArray(); 
    initLevel();
    init();
    // playBackgroundMusic();
}


function hideStartScreen(){
    document.getElementById("startScreen").classList.add("d-none");
}


function showCanvas(){
    document.getElementById("canvas").classList.remove("d-none");
}



function playBackgroundMusic(){
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.1;
    backgroundMusic.play();
}


function displayGameOverScreen(){
    clearAllIntervals();
    document.getElementById("canvas").classList.add("d-none");
    document.getElementById("gameOverScreen").classList.remove("d-none");
}


function tryAgain(){
    document.getElementById("gameOverScreen").classList.add("d-none");
    showCanvas();
    populateBackgroundImagesArray(); 
    initLevel();
    init();
};


function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  };