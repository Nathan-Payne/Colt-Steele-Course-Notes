
var express = require("express");
var app = express();
var port = 3000;

var noises = {
    pig: "Oink",
    cow: "Moo",
    dog: "Woof Woof"
};

app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res){
    var animal = req.params.animal.toLowerCase();
    if(noises[req.params.animal]){
        res.send("The " + animal + " says " + noises[animal]);
    } else {
        res.send("Not sure what this animal does...");
    };
});

app.get("/repeat/:text/:num", function(req, res){
    var num = req.params.num;
    var text = req.params.text;
    var total_text = [];
    for(var i=0; i < num; i++){
        total_text+=(text + " ");
    };
    res.send(total_text);
});

app.get("*", function(req, res){
    res.send("Sorry no page here. Check your address");
});

app.listen(port, function(){
    console.log("Server Started on Port " + port + "...");
});
