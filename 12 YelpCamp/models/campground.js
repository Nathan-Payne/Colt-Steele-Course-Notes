const mongoose = require("mongoose");
//SCHEMA setup
var campgroundSchema = new mongoose.Schema({
    name: String, 
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [             //comments property should be an array of database Id's
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
}); //can't var Campground... here due to scope, declaring within function means it is not
//seen in global scope - used when get request to /campgrounds made **was a problem when in .once() callback
module.exports = mongoose.model("Campground", campgroundSchema); 