const mongoose = require("mongoose");

//create the schema
const QuoteSchema = mongoose.Schema({
    quote : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    // userId : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : "User", //reference property 
    //     required : true
    // }
})

module.exports = mongoose.model("Quote",QuoteSchema); 