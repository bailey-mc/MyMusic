//---------------------------------//
//          DEPENDENCIES           //
//---------------------------------//
const mongoose = require('mongoose')

//---------------------------------//
//              SCHEMA           //
//---------------------------------//
const postSchema =  mongoose.Schema({
    album: String,
    artist: String,
    image: String,
    link: String,
    rating: {type: Number, min:0, max:10},
    review: String,
    tags: [String],
    comments: [{
        user: String,
        comment: String
    }, ]

});

const postCollection = mongoose.model('Post', postSchema)
module.exports = postCollection