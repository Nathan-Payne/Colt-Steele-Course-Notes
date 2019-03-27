//Process - add event listener to selected elements (e.g. hover on h1 / click on <button>)
//element.addEventListener(type, functionToCall);
var button = document.querySelector("button");
button.addEventListener("click", function() {
    console.log("Button CLICKED!!");
});

//selecting parent element and adding event listener one line
document.querySelector("ul").addEventListener("click", function(){
    console.log("Clicked UL");
});

//adding event listeners to all li's within parent element
//inside listener "this" refers to element selected by listener (lis[i] in this case)
var lis = document.querySelectorAll("li");
for (var i=0; i<lis.length; i++){
    lis[i].addEventListener("click", function(){
        this.style.color = "red";
    })
}

//button to toggle background color
var bg = document.getElementById("background-button");
var body = document.getElementsByTagName("body")[0];

bg.addEventListener("click", function(){
    //document.body.style.background = "purple";
    body.classList.toggle("purple-bg"); //IMPORTANT: DO NOT NEED .PURPLE-BG --> JUST NAME OF CLASS
});
//can also use if else statements with document.body.style.background = "purple" and a boolean variable