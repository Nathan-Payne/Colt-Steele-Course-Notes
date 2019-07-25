const express = require("express");
const router = express.Router({mergeParams: true}); //"merge params from campgrounds and comments together..."
                                          //required due to /campgrounds/:id/comments being shifted to app.js
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware"); //index.js files automatically required when parent folder required

// Comments New
router.get("/new", middleware.isLoggedin, (req, res)=>{
    Campground.findById(req.params.id, (err, campground)=>{
        if (err) return console.error(err);
        res.render("comments/new", {campground: campground});
    });
});
//comments create
router.post("/", middleware.isLoggedin, (req, res)=>{
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

//======SHOW COMMENT EDIT FORM=============
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res)=>{
    Comment.findById(req.params.comment_id, (err, foundComment)=>{
        if(err){
            res.redirect('back');
        } else {
            //this assumes we only need campground_id and no other information about the campground in the comment edit.ejs
            res.render('comments/edit', {campground_id: req.params.id, comment: foundComment}); 
        };
    });
});

//=============COMMENT EDIT UPDATE===========
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res)=>{
    //findbyidandupdate requires 3 things - id to update, data to update, callback (what to do next)
    //data is comment[text] object defined in comments/edit.ejs 
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment)=>{
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        };
    });
});

//=========COMMENT DESTROY ROUTE===============
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res)=>{
    Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
        if(err){
            res.redirect('back');
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        };
    });
});


module.exports = router;