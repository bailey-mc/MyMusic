//-------------------------------//
//          DEPENDENCEIS        //
//-------------------------------//
const express = require('express');
const router = express.Router();
const Post = require('../models/postschema.js');
const Author = require('../models/authors.js')



//prevent pplp who ar not logged in from getting to restricted pages
const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next()
    } else {
        res.redirect('/sessions/login')
    }
}


//-------------------------------//
//              ROUTES           //
//-------------------------------//

//-------------NEW---------------//
// router.get('/new', (req, res)=> {
//     res.render('new.ejs')
// })
router.get('/new', isAuth, (req, res)=>{
    Author.find({}, (err, allAuthors)=>{
        res.render('new.ejs', {
            authors: allAuthors
        });
    });
});

//-------------INDEX---------------//
// router.get('/', (req, res)=>{
// 	Post.find({}, (err, allPosts)=> {
//         res.render('index.ejs',
//             {
//                 post: allPosts
//             }
//         );
//     })
    
// })
router.get('/',  isAuth, (req, res)=>{
	Post.find({}, (err, foundPosts)=>{
		res.render('index.ejs', {
			post: foundPosts
		});
	})
});


//-------------SHOW---------------//
// router.get('/:id', (req,res)=> {
//     Post.findById(req.params.id,  (err, foundMusic)=> {
   
//         res.render('show.ejs',
//         {
//             music : foundMusic,
            
//         }
//         )
//     })
// })
router.get('/:id', isAuth, (req, res)=>{
    Post.findById(req.params.id, (err, foundMusic)=>{
        Author.findOne({'articles._id':req.params.id}, (err, foundAuthor)=>{
            res.render('show.ejs', {
                author:foundAuthor,
                music: foundMusic
            });
        })
    });
});



//-------------POST---------------//
// router.post('/', (req, res)=> {
//     Post.create(req.body, (err, createdPost)=> {
//         res.redirect('/myMusic')
//     })
// })
router.post('/', (req, res)=>{
    Author.findById(req.body.authorId, (err, foundAuthor)=>{
        Post.create(req.body, (err, createdPost)=>{ //req.body.authorId is ignored due to Schema
            foundAuthor.articles.push(createdPost);
            foundAuthor.save((err, data)=>{
                res.redirect('/myMusic');
            });
        });
    });
});


//-------------EDIT---------------//
// router.get('/:id/edit', (req,res)=> {
//     Post.findById(req.params.id, (err, foundMusic)=> {
//         res.render('edit.ejs',
//             {
//                 music: foundMusic
//             }
//         )
//     })
// })
router.get('/:id/edit', isAuth, (req, res)=>{
	Post.findById(req.params.id, (err, foundPost)=>{
		Author.find({}, (err, allAuthors)=>{
			Author.findOne({'articles._id':req.params.id}, (err, foundPostAuthor)=>{
				res.render('edit.ejs', {
					music: foundPost,
					authors: allAuthors,
					articleAuthor: foundPostAuthor
				});
			});
		});
	});
});


//-------------PUT---------------//
// router.put('/:id/', (req, res)=> {
//     Post.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedMusic)=> {
//         res.redirect('/myMusic')
//     })
// })
router.put('/:id', (req, res)=>{
    Post.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedPost)=>{
        Author.findOne({ 'articles._id' : req.params.id }, (err, foundAuthor)=>{
		if(foundAuthor._id.toString() !== req.body.authorId){
			foundAuthor.articles.id(req.params.id).remove();
			foundAuthor.save((err, savedFoundAuthor)=>{
				Author.findById(req.body.authorId, (err, newAuthor)=>{
					newAuthor.articles.push(updatedPost);
					newAuthor.save((err, savedNewAuthor)=>{
			        	        res.redirect('/myMusic');
					});
				});
			});
		} else {
			foundAuthor.articles.id(req.params.id).remove();
			foundAuthor.articles.push(updatedPost);
			foundAuthor.save((err, data)=>{
		                res.redirect('/myMusic');
			});
		}
        });
    });
});

//-------------search---------------//
router.post('/search', (req, res)=> {
    console.log(req.body.searchTerm);
    x =req.body.searchTerm;
    console.log(x);
    Post.find({$or: [
        {
            artist: x            
        },
        {
            album: x
        },
        {
            tags: x            
        },

    ]
        
    }, 
    (err, foundPosts)=> {
        res.render('search.ejs',
            {
                post: foundPosts
            }
        )
    })
})

//-------------DELETE---------------//
// router.delete('/:id', (req, res)=> {
//     Post.findByIdAndRemove(req.params.id, (err, deletedMusic)=> {
//         res.redirect('/myMusic')
//     })
// })
router.delete('/:id', (req, res)=>{
    Post.findByIdAndRemove(req.params.id, (err, foundPost)=>{
        Author.findOne({'articles._id':req.params.id}, (err, foundAuthor)=>{
            foundAuthor.articles.id(req.params.id).remove();
            foundAuthor.save((err, data)=>{
                res.redirect('/myMusic');
            });
        });
    });
});



//how to  make work for myMusic/foo
//error message for page that does not exist
// router.use((req,res, next)=> {
//     res.send('404 page not found')
// })

//-------------------------------//
//              EXPORTS           //
//-------------------------------//
module.exports = router



