
const request = require("request");
request("https://jsonplaceholder.typicode.com/users/1", (error, response, body) => {
    if(!error && response.statusCode== 200){
        const parsedData = JSON.parse(body);
        console.log(`${parsedData["name"]} lives in ${parsedData["address"]["city"]}`);
    };  //^^ ES6 template literal.. const not var is also ES6 syntax.. => arrow funct also ES6
});

// request("http://www.google.com", function(error, response, body){
//     if(error){
//         console.log("Something wrong");
//         console.log(error);
//     } else {
//         if(response.statusCode==200){
//             console.log(body); //everything worked - html sent back
//         };
//     };
// });
//error holds any potential error - e.g. use to check connection 
//body is returned as a string from some sources, use typeof ____ to check
//data type and if string use var parsedData = JSON.parse(body)
//to return data string into a JS object

//&apikey=thewdb