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
        ///updating yt link so that it is JUST the unique number, can then be put into the embed link already set up on show page... cut out everything BEFORE = and after (including) &
        //Removes & and everything following
        let link =foundMusic.link.split('&')[0]
        //Removes = and everythiing before // tutorial from https://thispointer.com/javascript-string-remove-until-a-character/
        link = link.substring(link.indexOf('=') + 1)
        res.render('show.ejs',
        {
            music : foundMusic,
            link : link
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
router.put('/:id/', (req, res)=> {
    Post.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedMusic)=> {
        res.redirect('/myMusic')
    })
})

//-------------DELETE---------------//
router.delete('/:id', (req, res)=> {
    Post.findByIdAndRemove(req.params.id, (err, deletedMusic)=> {
        res.redirect('/myMusic')
    })
})

//-------------------------------//
//              EXPORTS           //
//-------------------------------//
module.exports = router



