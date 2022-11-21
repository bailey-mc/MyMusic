const express = require('express');
const search = express.Router();
const Post = require('../models/postschema.js');





//-------------------------------//
//              ROUTES           //
//-------------------------------//

//-------------Search---------------//
search.get('/', (req, res)=> {
    const searchTerm = req.body.searchTerm
    return searchTerm
})

module.exports = search