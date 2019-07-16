const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

// INDEX ROUTE - show all campgrounds
router.get("/", (req, res) => {
    //get all campgrounds from db then render 
    Campground.find({}, (err, Allcampgrounds) => {
        if (err) return console.error(err);
        res.render("campgrounds/index", {campgrounds: Allcampgrounds, currentUser: req.user});
    });
});
// CREATE ROUTE - add new campground to database
router.post("/", isLoggedin, (req, res) => {
    //get data from form - add to campgrounds mongoDB
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    var newCampground = {name:name, image:image, description:desc};
    //create new Campground and save to DB
    Campground.create(newCampground, (err, campground) =>{
        if(err) return console.error(err);
        //else redirect to campgrounds page
        res.redirect("/campgrounds"); //default redirect is GET
    });
});

//NEW - show form to create new campground
router.get("/new", isLoggedin, (req, res) => {
    res.render("campgrounds/new");
}); //form sends POST, add form data to arr, redirect to / via GET to update to new data

//SHOW - /campgrounds/:id - GET - shows info absout one specific campground
// /:id can be anycombination of viable letters/nums so must define this GET route last
router.get("/:id", (req, res) =>{
    //find campground with requested ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) return console.error(err);
        //else show template with relevant info
        res.render("campgrounds/show", {campground: foundCampground});
    });
});

//========MIDDLEWARE======= -check if user is logged in if certain functions performed
function isLoggedin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};

module.exports = router;
