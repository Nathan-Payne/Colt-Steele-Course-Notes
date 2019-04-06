
var express = require("express");
var app = express();

app.use(express.static("public")); //tells express to serve contents of public directory (where .css found)
//app.set("view engine", "ejs"); //tells express will be using .ejs files ahead of time so dont need to
                                    //type .ejs file extension every time

//res.render(name of html-ejs file) --express will look for "views" folder to find pages to render
//ejs=embbedded java script:  --need to npm install
                            //--uses <%= JAVASCRIPT HERE %> to include JS in ejs file
//data passes through res.render("file.ejs", {OBJECT}) --OBJECT links variables in .ejs to app.js 
app.get("/", function(req, res){
    res.render("home.ejs");
});

app.get("/skyrim/:Race", function(req, res){
    var skyrimRace = req.params.Race;
    res.render("skyrim.ejs", {skyrimRaceEJS: skyrimRace});
});

app.get("/posts", function(req, res){
    var posts = [
        {title: "First", author: "Bear"}, 
        {title: "Second!", author: "Floo"}, 
        {title: "Whatever guys", author: "Davina"}
    ];

    res.render("posts.ejs", {posts: posts})
});

app.listen(3000, function(){
    console.log("Server UP");
});