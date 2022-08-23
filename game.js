var buttonColors =['red','blue','green','yellow'];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
$(document).keydown(function(){
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started=true;
    }
});
$(".btn").click(function(){
    userChosenColor=this.id;
    userClickedPattern.push(userChosenColor);
    //console.log(userClickedPattern);
    makeSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function makeSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("Success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(()=>{
                nextSequence();
            },1000);
        }
    }
    else {
        makeSound("wrong");
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");
        },200);
        startOver();
    }
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);
    var randomNum=Math.floor(Math.random()* 4);
    var randomChosenColor=buttonColors[randomNum];
    gamePattern.push(buttonColors[randomNum]);
    $("#"+randomChosenColor).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
    makeSound(randomChosenColor);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}



