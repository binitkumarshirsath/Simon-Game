var gamePattern = [];

var userClickedPattern = [];

var buttonColor = ["red","blue","green","yellow"];

// Press any key start 
var hasGameStarted = false;


$(document).on("keydown",function(){
    if(hasGameStarted == false){
        nextSequence();
        hasGameStarted = true;
    }
})


var level = 0;

function nextSequence (){

    userClickedPattern = [];

    var random = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColor[random];

    gamePattern.push(randomChosenColor);
    
    $('#'+randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    $("h1").text("Level "+level)

    level++;
}



$(".btn").on("click",function(event){

   var userChosenColour = $(this).attr("id");

   userClickedPattern.push(userChosenColour);

   playSound(userChosenColour);

   animatePress(userChosenColour);

   checkAnswer(userClickedPattern.length-1);
})

// Check Answer 

function checkAnswer (currentLevel){
    
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
       
        if(gamePattern.length == userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");

        $("body").addClass("game-over");

        setInterval(() => {

            $("body").removeClass("game-over");

        }, 400);

        $("h1").text("Game Over ! Press any key to restart");
        startOver();
    }
}

// Play Sound 
function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");

    audio.play();
}

// Animate Press 
function animatePress(currentColor){

    $('#'+currentColor).addClass("pressed");

    setTimeout(() => {

        $('#'+currentColor).removeClass("pressed");

    }, 100);
}




function startOver(){
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    hasGameStarted = false;
}
