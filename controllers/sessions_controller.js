//-------------------------------//
//          DEPENDENCEIS        //
//-------------------------------//
const express = require('express');
const sessions = express.Router();
const bcrypt = require('bcrypt');


const Post = require('../models/postschema.js');
const UserModel = require('../models/user.js')
const Author = require('../models/authors.js');





//prevent pplp who ar not logged in from getting to restricted pages
const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next()
    } else {
        res.redirect('/sessions/login')
    }
}


//-----------ROUTES------------//

//---------ENTER SITE-----------//
sessions.get('/', (req, res)=> {
        res.render('landing',);
 })
 
 //-----------LOGIN PAGE-----------//
 sessions.get('/login', (req, res)=> {
     res.render('login.ejs')
 })
 
 //-----------LOGIN-POST--------------//
 sessions.post('/login', async (req, res)=> {
     const {username, password} = req.body; 
     console.log(req.body);
     //check user exists
     const user = await UserModel.findOne({username})
     
 
     if(!user) {
         return res.redirect('./login')
     }
 
     //compare passwords
     const isMatch = await bcrypt.compare(password, user.password)
 
     if(!isMatch){

         return res.redirect('./login')
     }
     
     req.session.isAuth = true
     UserModel.findOne({username: req.body.username}, (err, foundUser)=> {
        console.log(foundUser);
        if (err) console.log(err);
        Post.find({}, (err, foundPosts)=>{
            res.render('index.ejs', {
                post: foundPosts,
                user: foundUser

            });
        })
       
     })
     
 })
 
 
 
 sessions.get('/register', (req, res)=> {
     res.render('register.ejs')
 })
 
 sessions.post('/register', async (req, res)=> {
     const {username, password} = req.body
     console.log(req.body);
 
     //to make sure two accounts don't register with the same username
     let user = await UserModel.findOne({username})
 
     if (user) {
         return res.redirect ('/register')
     }
 
     const hashedPsw = await bcrypt.hash(password, 12)
 
     user = new UserModel({
         username, 
         password: hashedPsw
     })
 
     await user.save()
     //mongoose method that saves the user that has been created into the database

     res.redirect('./login')
 })

 
 sessions.get('../myMusic', isAuth, (req, res)=> {
     res.render('../myMusic',)
 })
 
 //package to logout
 sessions.post('/logout', (req, res)=> {
     req.session.destroy((err)=> {
         if(err) throw err;
         res.redirect('/');
         //redirect to landing page
     })
 })


 //error message for page that does not exist
sessions.use((req,res, next)=> {
    res.send('404 page not found')
})

 //-------------------------------//
//              EXPORTS           //
//-------------------------------//
 module.exports = sessions


 //-----------------------------//
 //         Citations          //
 //-----------------------------//
 //major major help from the full stack junkie on youtube, this video in particular: https://www.youtube.com/watch?v=TDe7DRYK8vU&ab_channel=TheFullStackJunkie