const Campground = require("../models/campground");
const Comment = require("../models/comment");

//Middleware for all routes goes here
let middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    //AUTHORISATION: is user logged in?
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground)=>{
            if(err) {
                console.error(err);
                res.redirect('back');
            } else {
                //logged in - is author id same as user id - foundCampground.author.id is a mongoose object, req.user._id is a string
                //.equals is a mogoose method allowing mogooseObj to string comparison
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect('back');
                };
            };
        });
    } else {
        res.redirect('back');
    };
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment)=>{
            if(err) {
                console.error(err);
                res.redirect('back');
            } else {
                //logged in - is author id same as user id - foundComment.author.id is a mongoose object, req.user.comment_id is a string
                //.equals is a mogoose method allowing mogooseObj to string comparison
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect('back');
                };
            };
        });
    } else {
        res.redirect('back');
    };
};

// -check if user is logged in if certain functions performed
middlewareObj.isLoggedin = function isLoggedin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};


module.exports = middlewareObj