const express = require('express');
const search = express.Router();
const Post = require('../models/postschema.js');

const Agg = require('../search_blog_posts.js')



//-------------------------------//
//              ROUTES           //
//-------------------------------//

//-------------Search---------------//
search.get('/', (req, res)=> {
    const searchTerm = req.body.searchTerm
    return searchTerm
})

module.exports = search