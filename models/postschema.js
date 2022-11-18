//---------------------------------//
//          DEPENDENCIES           //
//---------------------------------//
const mongoose = require('mongoose')

//---------------------------------//
//              SCHEMA           //
//---------------------------------//
const postSchema = new mongoose.Schema({
    album: {type:String, required:true ,unique:true},
    artist: String,
    link: String,
    rating: {type: Number, min:0, max:10},
    review: String,
    tags: [String], 

});

const postCollection = mongoose.model('Post', postSchema)
module.exports = postCollection