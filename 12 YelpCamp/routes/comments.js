const express = require("express");
const router = express.Router({mergeParams: true}); //"merge params from campgrounds and comments together..."
                                          //required due to /campgrounds/:id/comments being shifted to app.js
const Campground = require("../models/campground");
const Comment = require("../models/comment");

// Comments New
router.get("/new", isLoggedin, (req, res)=>{
    Campground.findById(req.params.id, (err, campground)=>{
        if (err) return console.error(err);
        res.render("comments/new", {campground: campground});
    });
});
//comments create
router.post("/", isLoggedin, (req, res)=>{
    //find campground by id
    Campground.findById(req.params.id, (err, campground)=>{
        if (err){
            console.error(err);
            res.redirect("/campgrounds");
        } else {
            //create comment
            Comment.create(req.body.comment, (err, comment)=>{
                if(err) return console.error(err);
                // add username and id to comment -save comment -associate comment with campground
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                comment.save();

                campground.comments.push(comment);
                campground.save();
                //redirect to SHOW
                res.redirect(`/campgrounds/${campground._id}`);
            });
        };
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