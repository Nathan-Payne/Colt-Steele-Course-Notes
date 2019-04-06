//===========================================
//package.json file contains list of dependancies required for app.js
//npm install express --save <"--save" adds express as a dependancy inside of package.jsonautomatically
//use npm init to generate a new package.json file for a project
//npm i -g nodemon >auto restarts server using nodemon package
//==============================================
var express = require("express");
var app = express();
var port = 3000;

//--Routes--
// "/" - "Hi there!"
app.get("/", function(request, response){
    response.send("Hi there!");
});
// "/bye" - "Goodbye"
app.get("/bye", function(req, res){
    res.send("Goodbye!");
});
// "/dog" - "MEOW"
app.get("/dog", function(req, res){
    res.send("MEOW");
});

app.get("/r/:subredditName", function(req, res){
    console.log(req.params);
    var subreddit = req.params.subredditName;
    res.send("Subreddit entered is " + subreddit +"! Yaay!");
});

app.get("/r/:subredditName/comments/:id/:title", function(req, res){
    res.send("Generic Reddit Comment Address");
});

//* catch all for non-existant addresses - ensure last route in app.js (order matters)
app.get("*", function(req, res){
    res.send("DOES NOT EXIST - app.get('*')");
});

//Tell express to listen for requests (start server)
app.listen(port, function(){
    console.log("Server Started on Port " + port + "...");
});