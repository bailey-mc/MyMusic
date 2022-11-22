
const mongoose = require('mongoose');
const Post = require('./postschema.js');

const authorSchema = new mongoose.Schema({
	name: {type:String, required:true ,unique:true},
	articles: [Post.schema],
	bio: String,
	image: String,
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;