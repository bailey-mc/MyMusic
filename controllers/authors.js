const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.js')


//prevent ppl who are not logged in from getting to restricted pages
const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next()
    } else {
        res.redirect('/')
    }
}

//-----------ROUTES------------//

//-----------AUTHORS HOME------------//
router.get('/user/:userId', isAuth, (req, res)=>{
	UserModel.findById(req.params.userId,(err, foundUser)=> {
		UserModel.find({}, (err, foundUsers)=> {
			// Author.find({}, (err, foundAuthors)=>{
				res.render('authors/index.ejs', {
					// authors: foundAuthors,
					user:foundUser,
					users: foundUsers
				});
			// })
		})
		
	})
	
});


//-----------Author Show Page------------//

router.get('/user/:userId/author/:authorId', isAuth, (req, res)=>{
	UserModel.findById(req.params.userId, (err, foundUser)=>{
		UserModel.findById(req.params.authorId, (err, foundAuthor)=>{
			res.render('authors/show.ejs', {
				author: foundAuthor,
				user: foundUser
			});
		});
	})
	
});



module.exports = router;

//-----------GRAVEYARD------------//

// const Author = require('../models/authors.js');
// const Post = require('../models/postschema.js');
// const user = require('../models/user.js');

//--------------CREATE-NEW-AUTHOR------------//
// router.get('/users/:userId/new', isAuth, (req, res)=>{
// 	UserModel.findById(req.params.userId, (err, foundUser)=> {
// 		res.render('authors/new.ejs',
// 			{
// 				user: foundUser
// 			}
// 		);

// 	})
// });

//-------------POST-NEW-AUTHOR------------//
// router.post('/', (req, res)=>{
// 	req.body.articles = [{album : req.body.name}]
// 	console.log(req.body);
// 	Author.create(req.body, (err, createdAuthor)=>{
		
// 		// Author.findOneAndUpdate({'name':req.body.name}, {'articles':[]}, (err, updatedAuthor)=>{
// 		// 	console.log(updatedAuthor);
// 			// Post.findOneAndDelete({'album':req.body.name}, (err, deletedPost)=>{
// 				if(err) console.log(err);

// 				res.redirect('/authors');
// 			// })
// 		// }) 

// 		// createdAuthor.articles.pop() 
// 		// console.log(createdAuthor.articles);
// 		// console.log(createdAuthor);

// 	});
	
// });

//--------------------EDIT AUTHOR --------------------//
// router.get('/:id/edit', isAuth, (req, res)=>{
// 	Author.findById(req.params.id, (err, foundAuthor)=>{
// 		res.render('authors/edit.ejs', {
// 			author: foundAuthor
// 		});
// 	});
// });

//------------EDIT-AUTHOR-PUT------------//
// router.put('/:id', (req, res)=>{
// 	Author.findByIdAndUpdate(req.params.id, req.body, ()=>{
// 		res.redirect('/authors');
// 	});
// });

//------------DELETE-AUTHOr------------//
// router.delete('/:id', (req, res)=>{
// 	Author.findByIdAndRemove(req.params.id, (err, foundAuthor)=>{
// 		const articleIds = [];
// 		for (let i = 0; i < foundAuthor.articles.length; i++) {
// 			articleIds.push(foundAuthor.articles[i]._id);
// 		}
// 		Post.remove(
// 			{
// 				_id : {
// 					$in: articleIds
// 				}
// 			},
// 			(err, data)=>{
// 				res.redirect('/authors');
// 			}
// 		);
// 	});
// });



//----------------------------------//
//		FOLLOW EXPERIMENT
//----------------------------------//

//-----------Author POST FOLLOW ROUTE------------//
// router.post('/user/:userId/author/:authorId', isAuth, (req, res)=>{
// 	UserModel.findById(req.params.authorId, (err, foundAuthor)=> {
// 		UserModel.findById(req.params.userId, (err, foundUser)=> {
// 			foundUser.following.push(foundAuthor.username)
// 			foundUser.save((err, data)=> {
// 				res.redirect('/mymusic')
// 			})
// 		})
// 	})
// })

// //----------feed page------------//
// router.get('/followfeed/user/:userId', (req, res)=> {
// 	let articles= []
// 	UserModel.findById(req.params.userId, (err, foundUser)=> {
// 		console.log(foundUser);
// 		for (let i=0; i< foundUser.following.length; i++) {
// 			UserModel.find({username: foundUser.following[i]}, (err, foundAuthor)=> {
// 				console.log(foundAuthor + 'found uthor');
// 				console.log(foundAuthor.username);
// 				for (let i=0; i< foundAuthor.articles.length; i++) {

// 				articles.push(foundAuthor.articles[i])
// 				console.log(articles);
// 		}
// 			})
// 		}
// 		res.render('followfeed.ejs',
// 			{
// 				user: foundUser,
// 				articles: articles
// 			}
// 		)
// 	})
	
// })

