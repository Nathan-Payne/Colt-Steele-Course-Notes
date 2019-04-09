
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");

//DATABASE MONGOOSE
mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true});
var db = mongoose.connection;
var Campground; 
db.on('error', console.error.bind(console, "yelp_camp connection error:"));
db.once('open', () => {
    //SCHEMA setup
    var campgroundSchema = new mongoose.Schema({
        name: String,
        image: String
    }); //can't var Campground... here due to scope, declaring within function means it is not
    //seen in global scope - used when get request to /campgrounds made
    Campground = mongoose.model("Campground", campgroundSchema); 

    // Campground.create({
    //     name:"Cream Creek", 
    //     image:"https://farm4.staticflickr.com/3130/2770459706_3aed20703e.jpg"
    // }, function(err, campground){
    //     if(err) return console.error(err);
    //     console.log(campground + "added to MongoDB!");
    // });

});

// var campgrounds = [
//     {name:"Milo Mount", image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
//     {name:"Cream Creek", image:"https://farm4.staticflickr.com/3130/2770459706_3aed20703e.jpg"},
//     {name:"Biscuit Boulder", image:"https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
//     {name:"Oreo Ooolong", image:"https://farm9.staticflickr.com/8471/8137270056_21d5be6f52.jpg"},
//     {name:"Jammy Lake and Creek", image:"https://farm8.staticflickr.com/7285/8737935921_47343b7a5d.jpg"},
//     {name:"Daves Dive", image:"https://farm7.staticflickr.com/6188/6106475454_cf4dab4d64.jpg"},{name:"Milo Mount", image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
//     {name:"Whatever Wakii", image:"https://farm7.staticflickr.com/6082/6142484013_74e3f473b9.jpg"},
//     {name:"Creek Paddle Dam", image:"https://farm8.staticflickr.com/7457/9586944536_9c61259490.jpg"},
// ];

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    //get all campgrounds from db then render 
    Campground.find({}, (err, Allcampgrounds) => {
        if (err) return console.error(err);
        res.render("campgrounds", {campgrounds: Allcampgrounds});
    });
});

app.post("/campgrounds", (req, res) => {
    //get data from form - add to campgrounds arr
    const name = req.body.name;
    const image = req.body.image;
    var newCampground = {name:name, image:image};
    campgrounds.push(newCampground);
    //redirect to campgrounds page
    res.redirect("/campgrounds"); //default redirect is GET
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
}); //form sends POST, add form data to arr, redirect to / via GET to update to new data

app.listen(3000, () => {
    console.log("============== YelpServer UP ==============")
});