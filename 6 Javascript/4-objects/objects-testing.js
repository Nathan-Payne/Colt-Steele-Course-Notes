
//objects use key value pairs to store information (like python dictionaries)
var person = {
    name: "Jonas",
    age: 24,
    occupation: "writer",
}

//empty object
var bean = {};

//accessing objects can be done by a) using square brackets (similar to python):
console.log(person["occupation"]);
// or b) dot notation - note this comes with limitations and variables cannot be used inplace of key
console.log(person.occupation);

// updates can use either notation
person["age"] += 1; 

//mock movie database
var movie_array = [
    {title:"The MATRIX", 
    rating: 5,
    watched:true},
    {title:"Baywatch", 
    rating: 3,
    watched:false},
    {title:"Shaun of the dead", 
    rating: 5,
    watched:true},
];
//printing out data from data structure based on values within (using forEach)
movie_array.forEach(obj => {
    if (obj.watched===true){
        var watch = "watched";
    } else if (obj.watched===false){
        var watch = "not seen";
    }
    console.log("You have " + watch + " \"" + obj.title + "\" - " + obj["rating"] + " stars")
});

//JS methods - adding to objects
//reasoning: can add methods with the same name to different objects (prevents them occupying same namespace/scope)
var random_obj = {
    name: "Dave",
    sibling: "Davina",
    cousin: "not Dave",
    add: function(a,b){
        return a+b;
    }
}
console.log(random_obj["add"](324,2));