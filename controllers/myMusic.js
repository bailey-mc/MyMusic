//-------------------------------//
//          DEPENDENCEIS        //
//-------------------------------//
const express = require('express');
const router = express.Router();
const Post = require('../models/postschema.js')
// require schema 


//-------------------------------//
//              ROUTES           //
//-------------------------------//

//-------------NEW---------------//
router.get('/new', (req, res)=> {
    res.render('new.ejs')
})

//-------------INDEX---------------//
router.get('/', (req, res)=>{
	Post.find({}, (err, allPosts)=> {
        res.render('index.ejs',
            {
                post: allPosts
            }
        );
    })
    
})


//-------------SHOW---------------//


//-------------POST---------------//
router.post('/', (req, res)=> {
    Post.create(req.body, (err, createdPost)=> {
        res.redirect('/myMusic')
    })
})


//-------------EDIT---------------//


//-------------PUT---------------//

//-------------DELETE---------------//


//-------------------------------//
//              EXPORTS           //
//-------------------------------//
module.exports = router



