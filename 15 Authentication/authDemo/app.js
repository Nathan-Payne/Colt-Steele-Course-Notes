
const   mongoose = require("mongoose"),
        passport = require("passport"),
        bodyParser = require("body-parser"),
        LocalStrategy = require("passport-local"),
        passportLocalMongoose = require("passport-local-mongoose"),
        User = require("./models/user"),
        express = require("express");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

//secret used inside of sessions to encode and decode data, other two required
app.use(require("express-session")({
    secret: "Nyquist visits the moon, it's out of this world!",
    resave: false,
    saveUninitialized: false
}));
//must be after require express-session or /secret page does not redirect correctly after login
app.use(passport.initialize());  //required anytime passport used
app.use(passport.session());    //required anytime passport used

//createsnew LocalStrategy using User.authenticate method coming from passportLocalMongoose (user.js) - 
//reads session, takes encoded data from session and unencodes it then encodes/serializes and adds back to session
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect("mongodb://localhost/auth_demo_app", {useNewUrlParser: true});


//================== ROUTES ======================================================
//root path
app.get("/", (req, res)=>{
    res.render("home");
});

//Secret route
app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

//=== Auth Routes ===
app.get("/register", (req, res)=>{
    res.render("register")
});
//user sign up
app.post("/register", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    //do not want to store unhashed data in database, hence password not added to User model
    User.register(new User({username: username}), password, function(err, user){
        if(err){
            console.error(err);
            return res.render('register');
        }
        //authenticate 'takes care of everything in the session?' 
        //- logs user in, stores correct info, runs serializeUser() method
        //'local' directs authenticate to use local strategy (not 'facebook' or 'twitter')
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    });
});

//LOGIN routes
app.get('/login', (req, res)=>{
    res.render('login');
});
//login logic - passport.authenticate is middleware - code which runs before final route callback
//authenticate automatically parses username/password from POST and compares to database version
//object indicates what to do on success and failure
app.post('/login', passport.authenticate("local", {
    successRedirect: '/secret',
    failureRedirect: '/login'
}), (req, res)=>{});

app.get('/logout', (req, res)=>{
    req.logout();   //destroys user data in session = no longer tracked as logged in
    res.redirect("/");
});

//cuurently /secret is accessible whether logged in or not, use a middleware function to check if user is logged
//in before showing page. Standard form is to have 3 arguments including "next" - next thing which needs to be
//called- when used in GET request it refers to the callback funct. Used in app.get('/secret') route..
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

app.listen(3000, function() {
    console.log("============authDemo SERVER UP=============")
});