var random1 = Math.random();
var random2 = Math.random();

random1 = Math.floor(random1*6)+1;
random2 = Math.floor(random2*6)+1;

document.querySelector(".player-one").setAttribute("src","images/dice" + random1 + ".png");
document.querySelector(".player-two").setAttribute("src","images/dice" + random2 + ".png");

if(random1 > random2)
{
    document.querySelector("h1").innerHTML = "🏆 Player 1 Wins!"; 
}
else if(random2 > random1)
{
    document.querySelector("h1").innerHTML = "Player 2 Wins!🏆";
}
else
{
    document.querySelector("h1").innerHTML = "Draw!";
}