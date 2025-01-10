



var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;






$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level" + level);
    
    nextSequence();
    started = true;
    }

})


$(".btn").on("click", function(){
    
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    
});



function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
   var randomNumber = Math.floor(Math.random() * 4);

   var randomChosenColor = buttonColors[randomNumber];
   gamePattern.push(randomChosenColor);
   $("#" + randomChosenColor).fadeOut();
   $("#" + randomChosenColor).fadeIn();
   playSound(randomChosenColor);

    
}

function playSound(name){
    var btnAudio = new Audio("./sounds/" + name +".mp3");
    btnAudio.play();
}

function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
        userClickedPattern = [];
        
        console.log("success matched array");
       setTimeout(nextSequence, 700);
        }
    }else{
        console.log("failure");
        var wrongAudio = new Audio("./sounds/wrong.mp3")
            wrongAudio.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}


