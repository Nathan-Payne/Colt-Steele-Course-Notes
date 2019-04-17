
const mongoose = require("mongoose");
//POST - title, content 
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

//similar to return statement in function but for files - want to export Post model in this case
module.exports = mongoose.model("Post", postSchema);
