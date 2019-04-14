
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2", {useNewUrlParser: true});


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
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId, //Syntax of writing Mongoose Object ID belonging to a post
            ref: "Post" //telling which schema to use
        }
    ]
});

var User = mongoose.model("User", userSchema);

//GOAL - find user + find all posts for user
//finding user Dave - then populating posts by looking up object ID's - .exec starts query
User.findOne({name: "Dave"}).populate("posts").exec(function(err, user){
    if(err) return console.error(err);
    console.log(user); //posts arr now shows full posts referenced by the ID's in user object
});




// Post.create({
//     title: "Daves wild boars PART 3",
//     content: "Gibberish hewfiuwnofunwofiwneoiwneofinwofiwnfe"   //new post
// }, (err, post) => {                         //callback once created
//     User.findOne({name: "Dave"}, (err, foundUser) =>{   //find user who made post
//         if(err) return console.error(err);  //err handling
//         foundUser.posts.push(post);         //add new post to users posts array
//         foundUser.save((err, data) =>{      //save data to user in mongoDB
//             if(err) return console.error(err);
//             console.log(data);  //console displays entire object - in mongodb only ref ID shown in posts 
//         });
//     });
// });


// User.create({
//     email: "dave@yahoo.com",
//     name: "Dave"
// });