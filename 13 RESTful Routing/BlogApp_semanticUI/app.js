
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
    var Blog = mongoose.model("Blog", blogSchema);
});

//============RESTful Routes==============

app.listen(3000, function() {
    console.log("============BLOG_APP SERVER UP=============")
});