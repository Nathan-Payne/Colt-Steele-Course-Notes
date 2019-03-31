
var numSquares = 6;
var colors = generateRandomColors(numSquares);

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var msg = document.getElementById("msg");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

var goalColor = pickColor();

colorDisplay.textContent = goalColor;

for (var i=0; i<squares.length; i+=1){
    //add initial colors to all squares
    squares[i].style.backgroundColor = colors[i];
    //add event listeners for clicks on squares
    squares[i].addEventListener("click", function(){
        //get color of clicked square
        var clickedColor = (this.style.backgroundColor);
        //compare square color to goalcolor
        if (clickedColor===goalColor) {
            msg.textContent = "Correct!"
            //button text to play again?
            resetButton.textContent = "Play Again?"
            changeColors(goalColor);
        } else {
            this.style.backgroundColor = "#232323";
            msg.textContent = "Try again!"
        }
    })
}

for (var i=0; i<modeButtons.length; i+=1){
    modeButtons[i].addEventListener("click", function(){
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        this.classList.add("selected");

        // ternary operator
        this.textContent==="Easy" ? numSquares=3: numSquares=6;
        //means the same as comments below
        // if(this.textContent==="Easy"){
        //     numSquares=3;
        // } else {
        //     numSquares=6
        // }
        reset();
    });
};

resetButton.addEventListener("click", function(){
    reset();
});

function reset() {
    //generate new colors
    colors = generateRandomColors(numSquares);
    //pick new color from array
    goalColor = pickColor();
    colorDisplay.textContent = goalColor; //updates displayed color
    //change square colors
    for (var i=0; i<squares.length; i+=1){
        if(colors[i]){
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].display = "none"
        }
    }
    //change span text 
    msg.textContent = "";
    //chnage h1 background
    h1.style.backgroundColor = "steelblue";
    //change button text back on reset
    resetButton.textContent = "New Colors"
}

// easymode.addEventListener("click", function(){
//     easymode.classList.add("selected");
//     hardmode.classList.remove("selected");
//     numSquares = 3;
//     colors = generateRandomColors(numSquares);
//     goalColor = pickColor();
//     colorDisplay.textContent = goalColor;
//     for (var i=0; i<=squares.length; i+=1){
//         if (colors[i]){
//             squares[i].style.backgroundColor = colors[i];
//         } else {
//             squares[i].style.display = "none";
//         }
//     }
// })
// hardmode.addEventListener("click", function(){
//     hardmode.classList.add("selected");
//     easymode.classList.remove("selected");
//     numSquares = 6;
//     colors = generateRandomColors(numSquares);
//     goalColor = pickColor();
//     colorDisplay.textContent = goalColor;
//     for (var i=0; i<=squares.length; i+=1){
//         squares[i].style.backgroundColor = colors[i];
//         squares[i].style.display = "block";
//     }
// })


function changeColors(winningcolor){
    for (var i=0; i<squares.length; i+=1){
        squares[i].style.backgroundColor = winningcolor;
    }
    h1.style.backgroundColor = winningcolor;
}

function pickColor(){
    //randomises color chosen from array
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num){
    //make array
    var arr = [];
    //add num random rgb's to array
    for (i=0; i<num; i+=1){
        //generate random color and push to arr
        arr.push(randomColor());
    }
    //return array
    return arr;
}

function randomColor(){
    //pick r from 0-255
    var r = Math.floor(Math.random()*256)
    //pick g fomr 0-255
    var g = Math.floor(Math.random()*256)
    //pick b
    var b = Math.floor(Math.random()*256)

    return "rgb(" + r + ", " + g + ", " + b + ")";
}