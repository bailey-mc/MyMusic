const mongoose = require('mongoose')
const Post = require('./postschema.js');


const UserSchema = new mongoose.Schema({
    username:{type: String, required: true, unique: true},
    password: {type: String, required: true, },
	articles: [Post.schema],
    image: String,
    bio: String,
    genres: String,
    email: String
    // friends: String,
})

module.exports = mongoose.model('User', UserSchema)