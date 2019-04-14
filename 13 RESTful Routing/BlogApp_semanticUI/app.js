//Git commit notes:
// Add edit, update, delete routes to complete RESTful blog, styled section
// using semanticUI, use expressSanitzer + <%- %> ejs syntax to allow html
// markup in blog body (but no scripts)


const express = require("express"),
app = express(),
methodOverride = require("method-override"),
bodyParser = require("body-parser"),
mongoose = require("mongoose");
expressSanitizer = require("express-sanitizer");

//APP CONFIG
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressSanitizer()); //must go after body-parser
app.use(methodOverride("_method")); //HTML5 forms do not support PUT or DELETE requests
//method-override looks for ?_method=PUT in query-string and overrides req type from form

//MONGOOSE DATABASE
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false. Prevents DeprecationWarning.
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/restful_blog_app", {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, "BlogApp connection error:"));
db.once('open', function() {
    //SCHEMA SETUP
    var blogSchema = new mongoose.Schema({
        title: String,
        image: String, //e.g. placeholder image use format below
        body: String,
        created: {type: Date, default: Date.now}
    });
    Blog = mongoose.model("Blog", blogSchema);
});

//============RESTful Routes==============

app.get("/", (req, res) => {
    res.redirect("/blogs");
});
//INDEX ROUTE
app.get("/blogs", (req, res) => { 
    Blog.find({}, (err, blogs) => {
        if(err) return console.error(err);
        res.render("index", {blogs: blogs});
    });
});

//NEW ROUTE
app.get("/blogs/new", (req, res) => {
    res.render("new");
});

//CREATE ROUTE
app.post("/blogs", (req,res) => {
    //create blog    // Blog.create(data, callback){}   //data is from form using body-parser
    req.body.blog.body = req.sanitize(req.body.blog.body);//req.body.blog is from form - .body gets content from text area
    Blog.create(req.body.blog, (err, newBlog) => {      //callback is for error + ifWorked
        if (err){
            res.render("new");
            console.error(err);
        };
        res.redirect("/blogs");
    });                                                   
    //redirect to index
});

//SHOW ROUTE
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err) return res.redirect("/blogs");
        res.render("show", {blog: foundBlog});
    });
});

//EDIT ROUTE
app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err) return res.redirect("/blogs");
        res.render("edit", {blog: foundBlog});
    });
});

//UPDATE ROUTE
app.put("/blogs/:id", (req, res) => {
    var id = req.params.id; //gets param :id from address
    var newData = req.body.blog;    //gets blog object to be used as update
    console.log(req.body.blog);
    req.body.blog.body = req.sanitize(req.body.blog.body); //removes script tags
    console.log(req.body.blog);
    Blog.findByIdAndUpdate(id, newData, (err, updatedBlog) => {
        if(err) return res.redirect("/blogs");
        res.redirect("/blogs/" + id);
    });
});

//DELETE ROUTE
app.delete("/blogs/:id", (req, res) =>{
    var id = req.params.id;
    Blog.findByIdAndRemove(id, (err) => { //one argument - no data to work with here
        if (err){
            console.error(err);
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        };
    });
});

app.listen(3000, function() {
    console.log("============BLOG_APP SERVER UP=============")
});