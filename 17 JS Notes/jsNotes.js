
//Intermediate JS Notes

//'this' - reserved keyword, an object in JS, determined by how a function is called (execution context)
//--value in global context (of browser) is the window object - setting global variables can be done via
//    this.person = "Dave"
//    console.log(person) = Dave

//--value inside declared object is closest parent object
    var person = {
        firstName: 'Dave',
        sayHi: function(){
            return "Hi " + this.firstName
        },
        determineContext: function() {
            return this === person
        }
    }
person.sayHi() // Hi Dave
person.determineContext() // true

//--value of 'this' is set as first param of .call .bind .apply methods (these can only be used by functions)
// call and apply invoke the function immediately - bind allows us to set and store a value of this to be invoked later
// An object can be passed as the first argument to call or apply and this will be bound to it.
var obj = {a: 'Custom'};
// This property is set on the global object
var a = 'Global';
function whatsThis() {
  return this.a;  // The value of this is dependent on how the function is called
}
whatsThis();          // 'Global'
whatsThis.call(obj);  // 'Custom'
whatsThis.apply(obj); // 'Custom'

//bind - easy to lose track of the value of 'this' when using asyncrhonus as it is context dependent and 
//a function in an object using 'this' executed after its declaration will be in global scope, bind is used
//to bind declared object to function permanently - bind is unalterable and returns function itself
var goku = {
    firstName: 'goku',
    sayAah: function(){
        setTimeout(function(){
            console.log("Aah i'm " + this.firstName)
        }.bind(this), 1000)
    } //wihout .bind(this) calling goku.sayAah() returns "Aah i'm undefined"
}

//--"new" keyword creates an object out of thin air - 'this' refers to the new object 'new' creates
function Person(firstName, lastName){
    this.firstName = firstName //'this' refers to global scope
    this.lastName = lastName
} 
var vegeta = new Person("Prince", "Vegeta"); //new forces this to be object in local scope
vegeta.firstName //"Prince"


//============ OOP ===================
//JS has no classes so functions/objects replace - constructor functions act as blueprints for objects
function Tent(compartments, poles, height){ //capitalise function name indicates constructor function
    this.compartments = compartments; 
    this.poles = poles;
    this.height = height;
}
//properties attached to the keyword 'this' which will refer to an object the function will create
var myTent = new Tent(2, 4, 1000)
myTent.poles //4

// 'new' keyword creates empty obj --sets this to be that obj --adds implicitly 'return this' to funct
//--adds "__proto__" property to obj linking prototype property to empty obj

//--prototype object created from constructor functions
//constructor function 
function Person(name){
    this.name = name;
}
//object created from Person constructor
var jojo = new Person("Jojo");
//all objects created from person constructor have access to "isCool" property via .__proto__ link to Person.prototype object
Person.prototype.isCool = true;
jojo.isCool; //true 

//--every object in JS also has a .__proto__ method linking to the "Object.prototype" methods available to all JS objects
//e.g. var arr =[]   //arr.__proto__ links to array.prototype object and can use the methods available to all arrays
//and arr.prototype.__proto__ === Object.prototype therefore arr also has access to all Object methods built into JS
//this is known as __proto__ chain              //(Object.prototype.__proto__ === null)

//========Refactoring for efficiency=======
function HumanInefficient(name){
    this.name = name;
    this.sayHello = function(){
        return "Hello " + this.name;
    }
}
//creating many "Human" objects using the new keyword redefines the function every time despite it being the same
//for each new Human.. replace the above snippet with:
function Human(name){
    this.name = name;
}
Human.prototype.sayHello = function(){
    return "Hello " + this.name;
}
//this places the function in the shared prototype pool of methods and functions, it is only defined once but is 
//accessible to all Human objects created via new.

//=========TESTING==========
function Vehicle(make, model, year){
    this.make = make;
    this.model = model;
    this.year = year;
    this.isRunning = false;
}
Vehicle.prototype.turnOn = function(){
    this.isRunning = true;
}
Vehicle.prototype.turnOff = function(){
    this.isRunning = false;
}
Vehicle.prototype.honk = function(){
    if(this.isRunning){
        return "Beep"
    }
}


//==========CLOSURES==============
//Closures exist when an inner function makes use of data defined in an outer function which has returned, if outer
//data not used in the inner function then it is just nested function
//Private Variables == variables which cannot be modified externally
function counter(){
    var count = 0;
    return function(){
        return ++count
    }
}
//note inner function has no name - this is anonymous function (exist in python too)
//count cannot be called outside of function - it is an example of a private variable
var c = counter()   //c is a function definition
c() // 1
c() // 2
