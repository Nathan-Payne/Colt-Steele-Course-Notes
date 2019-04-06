
var express = require("express");
var app = express();

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

app.listen(3000, function(){
    console.log("Server UP");
});