
const mongoose = require("mongoose");

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

module.exports = mongoose.model("User", userSchema);