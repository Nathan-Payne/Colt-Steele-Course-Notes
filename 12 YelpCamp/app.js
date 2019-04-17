
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const seedDb = require("./seeds");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
// const User = require("./models/user");

app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");

//DATABASE MONGOOSE
mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, "yelp_camp connection error:"));

seedDb();   //function from seeds.js to remove all data from database and seed afresh

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
// INDEX ROUTE - show all campgrounds
app.get("/campgrounds", (req, res) => {
    //get all campgrounds from db then render 
    Campground.find({}, (err, Allcampgrounds) => {
        if (err) return console.error(err);
        res.render("index", {campgrounds: Allcampgrounds});
    });
});
// CREATE ROUTE - add new campground to database
app.post("/campgrounds", (req, res) => {
    //get data from form - add to campgrounds mongoDB
    const name = req.body.name;
    const image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name, image:image, description:desc};
    //create new Campground and save to DB
    Campground.create(newCampground, (err, campground) =>{
        if(err) return console.error(err);
        //else redirect to campgrounds page
        res.redirect("/campgrounds"); //default redirect is GET
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", (req, res) => {
    res.render("new");
}); //form sends POST, add form data to arr, redirect to / via GET to update to new data

//SHOW - /campgrounds/:id - GET - shows info absout one specific campground
// /:id can be anycombination of viable letters/nums so must define this GET route last
app.get("/campgrounds/:id", (req, res) =>{
    //find campground with requested ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) return console.error(err);
        //else show template with relevant info
        console.log(foundCampground);
        res.render("show", {campground: foundCampground});
    });
});


app.listen(3000, () => {
    console.log("============== YelpServer UP ==============")
});


//================END======================== below are old code snippets for reference








//old seed data
// db.once('open', () => {
//     Campground.create({
//         name:"Cream Creek", 
//         image:"https://farm4.staticflickr.com/3130/2770459706_3aed20703e.jpg",
//         description: "Aggressive puppies attacked us during our stay here. Avoid the creek if you value your ankles.."
//     }, function(err, campground){
//         if(err) return console.error(err);
//         console.log(campground + "added to MongoDB!");
//     });
// });
