const mongoose = require("mongoose")

//create schema
const UserSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    token : {
        type : String,
        default: ''
    }
},{timestamps : true}) //time stamp add two fieds in the schema createdAt and modifiedAt basically date and time

module.exports = mongoose.model("User",UserSchema); 

//whenever we waht to save the user we will use this model