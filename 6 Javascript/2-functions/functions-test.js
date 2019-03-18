function noArgs() {
    console.log("Cats have paws");
}
noArgs();

function multiplyPrint(x, y) {
    console.log(x*y);
}
multiplyPrint(33, 3);

//returns - looks similar to python
function multiply(x, y) {
    return (x*y);
}
console.log(multiply(
    multiply(3,2), multiply(2,2)
    ));

//capitalise function
function capitalise(text){
    if (typeof text === "number"){
        return "can not capitalise a number"
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
}
var name = "nathan";
console.log(capitalise(name));

//true if even
function isEven (x) {
    if (x%2===0){   //<<Boolean statement don't need return true
        return true
    }
    return false
}
console.log(isEven(5));

//factorial
function factorial(x){
    var total = 1;
    for (var i=x; i>0; i-=1){
        total = i*total
    }
    return total
}
console.log(factorial(4));

function kebabToSnake(text){
    var new_text=text.replace(/-/g, "_");   //the /xxxx/ notation is a regex
    return new_text
}
console.log(kebabToSnake("i-am-a-party-pooper"))

//higher order functions
var total2 = 2
function times2By2(){
    total2 *= 2
    console.log(total2)
}
setInterval(times2By2, 3500)

