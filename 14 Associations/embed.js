
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo", {useNewUrlParser: true});


//POST - title, content 
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

//models are independent to start with

//USER - email. name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema] //this associates postSchema with userSchema
});                     //creates an array of posts

var User = mongoose.model("User", userSchema);

//====================================
// var newUser = new User({
//     email: "vegeta@planetvegeta.com",
//     name: "Prince Vegeta"
// });

// add to users using push to add posts to the array
// newUser.posts.push({
//     title:"I am the prince of all saiyans",
//     content: "I am a super-saiyan!"
// });

// newUser.save((err, user) => {
//     if (err) return console.error(err);
//     console.log(user);
// });


// var newPost = new Post({
//     title: "Blockchain and Brexit",
//     content: "What a mess..."
// });

// newPost.save((err, post) => {
//     if (err) return console.error(err);
//     console.log(post);
// });


User.findOne({name: "Prince Vegeta"}, (err, user) => {
    // if(err) return console.error(err);
    user.posts.push({
        title: "Average saiyan...",
        content: "You're not dealing with an average saiyan warrior any more Frieza."
    });
    user.save((err, user) => {
        if(err) return console.error(err);
        console.log(user);
    });
});