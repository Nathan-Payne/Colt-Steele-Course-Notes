
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose); //takes npm package pLM, adds methods from package to UserSchema

module.exports = mongoose.model("User", UserSchema);