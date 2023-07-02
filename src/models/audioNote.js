const mongoose = require("mongoose")

//create schema
const AudioNoteSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    fileName : {
        type : String,
        required : true
    },
    filePath : {
        type : String,
        required : true
    },
    duration : {
        type : String,
        required : true
    },
    ampPath : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User", //reference property 
        required : true
    }
},{timestamps : true}) //time stamp add two fieds in the schema createdAt and modifiedAt basically date and time

module.exports = mongoose.model("AudioNote",AudioNoteSchema); 