
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
