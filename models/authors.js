
const mongoose = require('mongoose');
const Post = require('./postschema.js');

const authorSchema = mongoose.Schema({
	name: String,
	articles: [Post.schema],
	bio: String,
	image: String,
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;