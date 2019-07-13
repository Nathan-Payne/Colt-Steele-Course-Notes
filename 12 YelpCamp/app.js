
const express = require("express"); //JS web framework
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); //JS interface for MongoDB 
const passport = require('passport');   //authentication middleware for node.
const LocalStrategy = require('passport-local'); //plugs in to passport to provide user-password authentication (middleware)
const seedDb = require("./seeds");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user"); 

app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");
//express.static(root, [options]) - specifies dir from which to serve static assests (e.g. img/CSS/JS)
app.use(express.static(__dirname + "/public"))  //__dirname refers to directory name of app.js
                                                //convention in node + safer

//PASSPORT CONFIG       //secret used inside of sessions to encode and decode data
app.use(require("express-session")({
    secret: "Nyquist",
    resave: false,              // don't save session if unmodified
    saveUninitialized: false    // don't create session until something stored
}));
//must be after require express-session or /secret page does not redirect correctly after login
app.use(passport.initialize());  //required anytime passport used
app.use(passport.session());    //required anytime passport used

//custom middleware - function written called on every route - in this case the currentUser variable
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next(); //required or code hangs on middleware and doesnt move to next function
});

// use static authenticate method of model in LocalStrategy - essentially passportLocalMongoose has written the
passport.use(new LocalStrategy(User.authenticate()));     //- authenticate() method already, we are using instead of writing a custom function 
passport.serializeUser(User.serializeUser());   // use static serialize and deserialize of model for passport session support
passport.deserializeUser(User.deserializeUser());   //also from passport local mongoose 

//DATABASE MONGOOSE
mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, "yelp_camp connection error:"));

//seedDb();   //function from seeds.js to remove all data from database and seed afresh

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

//app.METHOD(PATH, HANDLERfunction) - express route definition (app is an instance of express)
app.get("/", (req, res) => {
    res.render("landing");
});
// INDEX ROUTE - show all campgrounds
app.get("/campgrounds", (req, res) => {
    //get all campgrounds from db then render 
    Campground.find({}, (err, Allcampgrounds) => {
        if (err) return console.error(err);
        res.render("campgrounds/index", {campgrounds: Allcampgrounds, currentUser: req.user});
    });
});
// CREATE ROUTE - add new campground to database
app.post("/campgrounds", (req, res) => {
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
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
}); //form sends POST, add form data to arr, redirect to / via GET to update to new data

//SHOW - /campgrounds/:id - GET - shows info absout one specific campground
// /:id can be anycombination of viable letters/nums so must define this GET route last
app.get("/campgrounds/:id", (req, res) =>{
    //find campground with requested ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) return console.error(err);
        //else show template with relevant info
        res.render("campgrounds/show", {campground: foundCampground});
    });
});

// ======================= COMMENTS ROUTES ==========================
app.get("/campgrounds/:id/comments/new", isLoggedin, (req, res)=>{
    Campground.findById(req.params.id, (err, campground)=>{
        if (err) return console.error(err);
        res.render("comments/new", {campground: campground});
    });
});

app.post("/campgrounds/:id/comments", isLoggedin, (req, res)=>{
    //find campground by id
    Campground.findById(req.params.id, (err, campground)=>{
        if (err){
            console.error(err);
            res.redirect("/campgrounds");
        } else {
            //create comment
            Comment.create(req.body.comment, (err, comment)=>{
                if(err) return console.error(err);
                //associate comment with campground
                campground.comments.push(comment);
                campground.save();
                //redirect to SHOW
                res.redirect(`/campgrounds/${campground._id}`);
            });
        };
    });
});

//===========AUTH ROUTES=================
//register form for new users
app.get("/register", (req, res)=>{
    res.render('register');
});

app.post("/register", (req, res)=>{
    let newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, (err, user)=>{ //register hashes password automatically before sending to db
        if (err){
            console.error(err);
            return res.render("register")
        } 
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});


//=========LOGIN ROUTES============
app.get("/login", (req, res)=>{
    res.render("login");
});

app.post("/login", passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }), (req, res)=>{}
);

//=======LOGOUT===========
app.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/campgrounds');
});


//========MIDDLEWARE======= -check if user is logged in if certain functions performed
function isLoggedin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};


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
