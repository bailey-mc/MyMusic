//-------------------------------//
//          DEPENDENCEIS        //
//-------------------------------//
const express = require('express');
// const { aggregate } = require('../models/postschema.js');
const router = express.Router();
const Post = require('../models/postschema.js');





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
            music : foundMusic,
            
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

//-------------search---------------//
router.post('/search', (req, res)=> {
    console.log(req.body.searchTerm);
    Post.find({$or: [
        {
            artist: req.body.searchTerm
        },
        {
            album: req.body.searchTerm
        },
        {
            tags: req.body.searchTerm
        },

    ]
        
    }, 
    (err, foundPosts)=> {
        res.redirect('search.ejs',
            {
                post: foundPosts
            }
        )
    })
})

//-------------DELETE---------------//
router.delete('/:id', (req, res)=> {
    Post.findByIdAndRemove(req.params.id, (err, deletedMusic)=> {
        res.redirect('/myMusic')
    })
})



//how to  make work for myMusic/foo
//error message for page that does not exist
// router.use((req,res, next)=> {
//     res.send('404 page not found')
// })

//-------------------------------//
//              EXPORTS           //
//-------------------------------//
module.exports = router



