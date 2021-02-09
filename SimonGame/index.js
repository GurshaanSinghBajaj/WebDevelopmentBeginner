var colorDictionary = { 
    1: "green",
    2: "red",
    3: "yellow",
    4: "blue"
};

function buttonSound(colour)
{
    switch(colour)
    {
        case "green":
            var audio = new Audio("sounds/green.mp3");
            audio.play();
            break; 

        case "yellow":
            var audio = new Audio("sounds/yellow.mp3");
            audio.play();
            break; 
        
        case "red":
            var audio = new Audio("sounds/red.mp3");
            audio.play();
            break; 

        case "blue":
            var audio = new Audio("sounds/blue.mp3");
            audio.play();
            break; 
    }
}

function buttonAnimation(colour)
{
    var buttonPressed = $("."+colour);
    buttonPressed.addClass("pressed");
    setTimeout(function(){ 
        buttonPressed.removeClass("pressed"); 
    }, 100);
}

function wrongSound()
{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
}

function wrongAnimation(colour)
{
    document.querySelector("body").style.backgroundColor = "red";
    var buttonPressed = $("."+colour);
    buttonPressed.addClass("game-over");
    setTimeout(function(){ 
        buttonPressed.removeClass("game-over"); 
        document.querySelector("body").style.backgroundColor = "#011F3F";
    }, 100);
}

function nextSequence()
{
    var newNumber = Math.floor(4*Math.random()) + 1;
    var colour = colorDictionary[newNumber];
    buttonSound(colour);
    buttonAnimation(colour);
    return colour;
}

var gameArray = [];
var gameIndex = 0;
var startGame = 0;
var level = 0;

var numberOfButtons = document.querySelectorAll("button").length;

for (var i = 0 ; i< numberOfButtons; i++)
{
    var currentButton = document.querySelectorAll("button")[i];
    currentButton.addEventListener("click", function(){
        var colour = this.id;
        if(startGame == 0)
        {
            buttonSound(colour);
            buttonAnimation(colour);
        }
        else if(gameIndex < gameArray.length && colour == gameArray[gameIndex])
        {
            buttonSound(colour);
            buttonAnimation(colour);  
            gameIndex += 1;
        }
        else 
        {
            wrongSound();
            wrongAnimation(colour);
            document.querySelector("h1").innerHTML = "Game over, Press Any Key to Restart";
            startGame = 0;
        }
        if(startGame == 1 && gameIndex == gameArray.length)
        {
            gameIndex = 0;
            level += 1;
            document.querySelector("h1").innerHTML = "Level " + level;
            setTimeout(function(){
                newColour = nextSequence();
                gameArray.push(newColour);
            },1000);
        }
    });
}

document.addEventListener("keydown", function(){
    if(startGame == 0)
    {
        startGame = 1; 
        gameArray = [];
        gameIndex = 0;
        level = 1;
        document.querySelector("h1").innerHTML = "Level " + level;
        setTimeout(function(){
            newColour = nextSequence();
            gameArray.push(newColour);
        },1000);
    }
});
