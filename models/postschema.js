//---------------------------------//
//          DEPENDENCIES           //
//---------------------------------//
const mongoose = require('mongoose')

//---------------------------------//
//              SCHEMA           //
//---------------------------------//
const postSchema = new mongoose.Schema({
    album: {type:String, unique:true},
    artist: String,
    link: String,
    rating: Number,
    review: String,
    tags: [String], 

});

const postCollection = mongoose.model('Post', postSchema)
module.exports = postCollection