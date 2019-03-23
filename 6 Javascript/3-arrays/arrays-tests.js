//basic array
var color = ['blue', 'red', 'orange'];
// indexed like python
color[1]; //'red'
//append arrays using unassigned indicies - can reassign similar to python
color[3] = 'cyan';
console.log(color[3]);
//arrays can mix data types (like python lists) and have the length property:
console.log(color.length);

//array methods (built in)

//push (python append) adds value to end of array, returns length of array after push
color.push('purple');
//color = ["blue", "red", "orange", "cyan", "purple"]

color.pop(); //returns popped item ("purple" here)
//color = ["blue", "red", "orange", "cyan"]
console.log(color);

//unshift adds item to beginning of array
color.unshift('black');
console.log(color);

//shift removes item from array beginning
var stored = color.shift();          //returns removed element
console.log(color, "\n" + stored + " was removed");

//indexOf() finds index of item in array
console.log("index of test: " + color.indexOf("cyan"));
console.log("index not present test: " + color.indexOf("superman"));

//slice (indicies are non-inclusive (like python slice [:]))
var lesscolor = color.slice(1,3);
console.log("sliced:" + lesscolor);
console.log("original:" + color);         //does not alter orginial
// .slice() copies entire array

//iteration
//using indicies
for(var i=0; i<color.length; i++) {
    console.log(color[i]);
};

//using forEach + function / anonymous function. Syntax: arr.forEach(someFunction)
color.forEach(function(typeofcolor){
    console.log(typeofcolor);
});

function printAllArray(item){
    console.log(item);
};
color.forEach(printAllArray);       //do not add parens to function - forEach will call we dont have to

//splice arr.splice(index_to_start_at, how_many_to_delete_after)