//-------------------------------//
//          DEPENDENCEIS        //
//-------------------------------//
const express = require('express');
const sessions = express.Router();
const bcrypt = require('bcrypt');

const Post = require('../models/postschema.js');
const UserModel = require('../models/user.js')





//prevent ppl who are not logged in from getting to restricted pages
const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next()
    } else {
        res.redirect('/sessions/login')
    }
}

//-------------------------------//
//-----------ROUTES------------//
//-------------------------------//

//---------ENTER SITE-----------//
sessions.get('/', (req, res)=> {
    const userNoExist = req.session.userNoExist
    const wrongPassword = req.session.wrongPassword
    delete req.session.userNoExist
    delete req.session.wrongPassword
        res.render('landing',);
 })
 
 //-----------LOGIN PAGE-----------//
 sessions.get('/login', (req, res)=> {
     res.render('login.ejs',
        {
            userError:[],
            passError: []
        }
     )
 })
 
 //-----------LOGIN-POST--------------//
 sessions.post('/login', async (req, res)=> {
     const {username, password} = req.body; 
     console.log(req.body);

     let userError = []
     let passError = []
     //check user exists
     const user = await UserModel.findOne({username})
     
     if(!user) {
         userError.push({message: 'This username does not exist. Did you type it in correctly?'})
         res.render('login', 
         {
             userError: userError,
            passError: []
         })
     } else{
 
     //compare passwords
     const isMatch = await bcrypt.compare(password, user.password)
 
     if(!isMatch){
        passError.push({message: 'This password does not match the username. Did you type it in correctly?'})
        res.render('login', 
        {
            passError: passError,
            userError:[]
        })
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
    }
     
 })
 
 
 //----------REGISTER-GET-ROUTE------------//
 sessions.get('/register', (req, res)=> {
     res.render('register.ejs',
        {
            error:[],
            passError:[],
            passMatchError:[]
        }
     )
 })
 
 //----------REGISTER-POST-ROUTE------------//
 sessions.post('/register', async (req, res)=> {
     const {username, password} = req.body
     console.log(req.body);
    
     
     let errors = []
     let passErrors = []
     let passMatchError = []

     //to make sure two accounts don't register with the same username
     let user = await UserModel.findOne({username})
 
     if (user) {
        //  return res.redirect ('/register')
        errors.push({message: 'This username is not avilable, please choose another'})
        res.render('register', 
        {
            error: errors,
            passError: [],
            passMatchError: []
        })
    }else if (password.length < 8){
        passErrors.push({message: 'Password must be at least 8 characters long'})
        res.render('register', 
        {
            passError: passErrors,
            error:[],
            passMatchError:[],
        })
    }else if (password !== req.body.passwordMatch){
        passMatchError.push({message: 'Passwords must match'})
        res.render('register', 
        {
            passError: [],
            error:[],
            passMatchError:passMatchError,
        })
     } else {
     const hashedPsw = await bcrypt.hash(password, 12)
 
     user = new UserModel({
         username, 
         password: hashedPsw, 
     })
     console.log(user);
     await user.save()
     //mongoose method that saves the user that has been created into the database

     res.redirect('./login')
    }
 })

 
//  sessions.get('../myMusic', isAuth, (req, res)=> {
//      res.render('../myMusic',)
//  })
 
 //----------LOGOUT-POST-ROUTE------------//
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

 //alert system taken from notes at https://www.section.io/engineering-education/connect-flash-express-sessions-and-boostrap/