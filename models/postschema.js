//---------------------------------//
//          DEPENDENCIES           //
//---------------------------------//
const mongoose = require('mongoose')

//---------------------------------//
//              SCHEMA           //
//---------------------------------//
const postSchema =  mongoose.Schema({
    album: {type:String, required:true ,unique:true},
    artist: String,
    image: String,
    link: String,
    rating: {type: Number, min:0, max:10},
    review: String,
    tags: [String], 

});

const postCollection = mongoose.model('Post', postSchema)
module.exports = postCollection