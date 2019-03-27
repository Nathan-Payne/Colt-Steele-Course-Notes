
var p1 = document.getElementById("p1");
var p2 = document.querySelector("#p2");
var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
var resetButton = document.querySelector("#reset");
var numInput = document.getElementsByTagName("input")[0];
var playingTo = document.getElementById("playingTo");
// var playingTo = document.querySelector("p span"); //selects span inside para, no need for id

var p1score = 0;
var p2score = 0;

var topScore = 5;

gameOver = false;

p1.addEventListener("click", function(){
    if (!gameOver){
        p1score += 1;
        if (p1score===topScore){
            p1Display.classList.add("winner");
            gameOver= true; 
        }
        p1Display.textContent = p1score;
    } 
});
p2.addEventListener("click", function(){
    if (!gameOver){
        p2score += 1;
        if (p2score===topScore){
            p2Display.classList.add("winner");
            gameOver= true; 
        }
        p2Display.textContent = p2score;
    } 
});

resetButton.addEventListener("click", function(){
    reset();
})

function reset(){
    p1score = 0;
    p2score = 0;
    p1Display.textContent = p1score;
    p2Display.textContent = p2score;
    p1Display.classList.remove("winner");
    p2Display.classList.remove("winner");
    gameOver=false;
};

//change events run any time the value selected changes - click not ideal for typed nums
numInput.addEventListener("change", function(){
    topScore = Number(this.value);  //this is num input
    playingTo.textContent = topScore;
    reset();
});

//================= other events ==========================

var lis = document.querySelectorAll("li");

for (var i=0; i<lis.length; i+=1){
    lis[i].addEventListener("click", function(){
        this.classList.toggle("selected");
    })
    lis[i].addEventListener("mouseover", function(){
        this.classList.add("mouseover");
    })
    lis[i].addEventListener("mouseout", function(){
        this.classList.remove("mouseover");
    })
}