const passport = require("passport"),
        mongoose = require("mongoose"),
        bodyParser = require("body-parser"),
        LocalStrategy = require("passport-local"),
        passportLocalMongoose = require("assport-local-mongoose"),
        User = require("./models/user"),
        express = require("express");


var app = express();
app.set("viewengine", "ejs");
app.use(passport.initilize());  //required anytime passport used
app.use(passport.session());    //required anytime passport used

//secret used inside of sessions to encode and decode data, other two required
app.use(require("express-session")({
    secret: "Nyquist visits the moon, it's out of this world!",
    resave: false,
    saveUninitialized: false
}));

//reads session, takes encoded data from session and unencodes it then encodes/serializes and adds back to session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect("mongodb://localhost/3000");


//================== ROUTES ======================================================
//root path
app.get("/", (req, res)=>{
    res.render("home");
});

//Secret route
app.get("/secret", (req, res)=>{
    res.render("secret");
});

//=== Auth Routes ===
app.get("/register", (req, res)=>{
    res.render("register")
});



app.listen(3000, function() {
    console.log("============authDemo SERVER UP=============")
});