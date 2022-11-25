const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{type: String, required: true, unique: true},
    password: {type: String, required: true, },
    image: String,
    bio: String,
    genres: String,
    friends: String,
})

module.exports = mongoose.model('User', UserSchema)