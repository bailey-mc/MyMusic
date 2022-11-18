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
router.get('/:id', (req,res)=> {
    Post.findById(req.params.id,  (err, foundMusic)=> {
        res.render('show.ejs',
        {
            music : foundMusic
        }
        )
    })
})


//-------------POST---------------//
router.post('/', (req, res)=> {
    Post.create(req.body, (err, createdPost)=> {
        res.redirect('/myMusic')
    })
})


//-------------EDIT---------------//
router.get('/:id/edit', (req,res)=> {
    Post.findById(req.params.id, (err, foundMusic)=> {
        res.render('edit.ejs',
            {
                music: foundMusic
            }
        )
    })
})


//-------------PUT---------------//

//-------------DELETE---------------//


//-------------------------------//
//              EXPORTS           //
//-------------------------------//
module.exports = router



