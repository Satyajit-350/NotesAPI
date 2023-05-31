const mongoose = require("mongoose")

//create schema
const NoteSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User", //reference property 
        required : true
    }
},{timestamps : true}) //time stamp add two fieds in the schema createdAt and modifiedAt basically date and time

module.exports = mongoose.model("Note",NoteSchema); 