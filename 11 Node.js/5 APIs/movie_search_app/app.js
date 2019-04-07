
const express = require("express");
const app = express();
const request = require("request");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("search");
});

app.get("/results", (req, res) => {
    var searchTerm = req.query.search;
    var url = `https://www.omdbapi.com/?s=${searchTerm}&apikey=thewdb`
    request(url, (err, response, body) => {
        if(!err && response.statusCode ==200){
            const parsedData = JSON.parse(body);
            res.render("results", {data:parsedData});
        };
    });
});

app.listen(3000, function(){
    console.log("--MOVIE Server UP--");
});