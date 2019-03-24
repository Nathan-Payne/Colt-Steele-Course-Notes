//SELECT
var h1 = document.getElementsByTagName("h1");
//MANIPULATE
h1[0].style.color = "blue";
h1[0].style.border = "10px inset cyan";

var para = document.getElementsByTagName("p");
para[0].style.textShadow = "1px -1px 1px grey";

var p = document.querySelector("p");
console.log(p.classList);   //contains nothing
p.classList.add("big");
p.classList.remove("big");
p.classList.toggle("big");
//p.classList.toggle("big");