
var express = require("express");
var app = express();
//body-parser used to make req.body a JS object so form data can be obtained
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));//see body-parser docs
app.set("view engine", "ejs");

var friends = ["Bear", "Gimli", "Gandalf", "Frodo", "Sam"];

app.get("/", function(req, res){
    res.render("home"); //template for home.ejs
});

app.post("/addfriend", function(req, res){
    var newFriend = req.body.newfriend; //newfriend from name property on input html tag
    friends.push(newFriend);
    res.redirect("/friends");
});

app.get("/friends", function(req, res){
    res.render("friends", {friends:friends});
});




app.listen(3000, function(){
    console.log("Server UP");
});