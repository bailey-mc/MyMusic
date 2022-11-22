const { setInternalBufferSize } = require('bson');
const express = require('express');
const router = express.Router();
const Author = require('../models/authors.js');
const Post = require('../models/postschema.js');

//prevent pplp who ar not logged in from getting to restricted pages
const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next()
    } else {
        res.redirect('/')
    }
}

//-----------ROUTES------------//
router.get('/new', isAuth, (req, res)=>{
	res.render('authors/new.ejs');
});




router.post('/', (req, res)=>{
	req.body.articles = [{album : req.body.name}]
	console.log(req.body);
	Author.create(req.body, (err, createdAuthor)=>{
		// Author.findOneAndUpdate({'name':req.body.name}, {'articles':[]}, (err, updatedAuthor)=>{
		// 	console.log(updatedAuthor);
			// Post.findOneAndDelete({'album':req.body.name}, (err, deletedPost)=>{
			// 	if(err) console.log(err);

				res.redirect('/authors');
			// })
		// }) 

		// createdAuthor.articles.pop() 
		// console.log(createdAuthor.articles);
		// console.log(createdAuthor);

	});
	
});

router.get('/', isAuth, (req, res)=>{
	Author.find({}, (err, foundAuthors)=>{
		res.render('authors/index.ejs', {
			authors: foundAuthors
		});
	})
});

router.get('/:id', isAuth, (req, res)=>{
	Author.findById(req.params.id, (err, foundAuthor)=>{
		res.render('authors/show.ejs', {
			author: foundAuthor
		});
	});
});

router.put('/:id', (req, res)=>{
	Author.findByIdAndUpdate(req.params.id, req.body, ()=>{
		res.redirect('/authors');
	});
});


router.get('/:id/edit', isAuth, (req, res)=>{
	Author.findById(req.params.id, (err, foundAuthor)=>{
		res.render('authors/edit.ejs', {
			author: foundAuthor
		});
	});
});




router.delete('/:id', (req, res)=>{
	Author.findByIdAndRemove(req.params.id, (err, foundAuthor)=>{
		const articleIds = [];
		for (let i = 0; i < foundAuthor.articles.length; i++) {
			articleIds.push(foundAuthor.articles[i]._id);
		}
		Post.remove(
			{
				_id : {
					$in: articleIds
				}
			},
			(err, data)=>{
				res.redirect('/authors');
			}
		);
	});
});



module.exports = router;