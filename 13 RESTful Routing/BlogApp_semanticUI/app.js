
const express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose");

//APP CONFIG
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");
app.use(express.static("public"));

//MONGOOSE DATABASE
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



app.listen(3000, function() {
    console.log("============BLOG_APP SERVER UP=============")
});