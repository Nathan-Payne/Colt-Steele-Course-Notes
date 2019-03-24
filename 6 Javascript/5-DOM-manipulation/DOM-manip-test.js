// SELECTORS
//getElementById() - takes string argument - returns ele with matching ID
var tag = document.getElementById("highlight");
console.log(tag); //returns html for li element but is also a JS object - console.dir(tag) to see

//returns HTML collection of ele's with matching class names - select one with []
var tags = document.getElementsByClassName("bolded");
console.log(tags[1]);

//getElementsByTagName() returns HTML collection of all ele's with given tag
var tags2 = document.getElementsByTagName('li');
console.log(tags2);

//querySelector() returns ONLY first ele matching given CSS-style selector - must use CSS syntax for selecting
var tag = document.querySelector("#highlight");

//querySelectorAll returns (node) list of all elements mscthing a CSS protector
var tags = document.querySelectorAll(".bolded"); 
console.log(tags);


//CLASS LIST
//classList is a read-only list containing classes for an element (not an array)
//works by defining a class in css: .custom-border {color: purple; border-color:red;}
//then adding class to selected element (based on some command?)

var tags = document.querySelectorAll(".bolded"); 
// tag[0].classList.add(".custom-border"); 
// tag[0].classList.remove(".custom-border");
// tag[0].classList.toggle(".custom-border");

//TEXT CONTENT
//returns string of all text contained in selected ele (explicitly text content)

var p = document.querySelector("p");
console.log(p.textContent);
p.textContent = "This text shall no longer be lorem thank goodness :)"; //replaces text content
console.log(p.textContent); //prints new text to console - will erase all html tags (like \strong)

//INNERHTML
//innerHTML does the same as textContent but preserves the HTML tags which may be present

//ATTRIBUTES 
var link = document.querySelector("a");
// returns attribute in selected ele as string
link.getAttribute("href");  //e.g. https://www.google.com
// setAttribute replaces previous href/attribute with new attribute stated
link.setAttribute("href", "https://www.bing.com");

//for images
var img = document.querySelector("img");
img.setAttribute("src", "dave.png"); 


