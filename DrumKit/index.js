function makeSound(letterPressed)
{
    switch(letterPressed)
    {
        case "w":
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
            break;

        case "a":
            var audio = new Audio("sounds/tom-2.mp3");
            audio.play();
            break;

        case "s":
            var audio = new Audio("sounds/tom-3.mp3");
            audio.play();
            break;

        case "d":
            var audio = new Audio("sounds/tom-4.mp3");
            audio.play();
            break;

        case "j":
            var audio = new Audio("sounds/snare.mp3");
            audio.play();
            break;

        case "k":
            var audio = new Audio("sounds/crash.mp3");
            audio.play();
            break;

        case "l":
            var audio = new Audio("sounds/kick-bass.mp3");
            audio.play();
            break;

        default:
            console.log("Error");
    }
}

function animation(letterPressed)
{
    var button = document.querySelector("."+letterPressed);
    button.classList.add("pressed");
    setTimeout(function(){
        button.classList.remove("pressed");
    },100);
}

var numberOfButton = document.querySelectorAll("button").length;

for (var i = 0; i < numberOfButton; i++)
{
    var presentButton = document.querySelectorAll("button")[i];

    presentButton.addEventListener("click",function(){
        var buttonPressed = this.textContent;
        makeSound(buttonPressed);
        animation(buttonPressed);
    });
}

document.addEventListener("keydown",function(event){
    makeSound(event.key);
    animation(event.key);
});