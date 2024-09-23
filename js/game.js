let canvas;
let ctx;
let character = new MoveableObject();

function init(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    character.src = "../img/1.Sharkie/3.Swim/1.png";

    console.log("My charaacter is", character);

    
}