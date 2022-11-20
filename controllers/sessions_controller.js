//-------------------------------//
//          DEPENDENCEIS        //
//-------------------------------//
const express = require('express');
const sessions = express.Router();
const bcrypt = require('bcrypt');



const UserModel = require('../models/user.js')




//prevent pplp who ar not logged in from getting to restricted pages
const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next()
    } else {
        res.redirect('/sessions/login')
    }
}


//-----------ROUTES------------//
sessions.get('/', (req, res)=> {
    res.render('landing.ejs')
 })
 
 sessions.get('/login', (req, res)=> {
     res.render('login.ejs')
 })
 
 sessions.post('/login', async (req, res)=> {
     const {username, password} = req.body; 
     
     //check user exists
     const user = await UserModel.findOne({username})
 
     if(!user) {
         return res.redirect('sessions/login')
     }
 
     //compare passwords
     const isMatch = await bcrypt.compare(password, user.password)
 
     if(!isMatch){
         return res.redirect('sessions/login')
     }
 
     req.session.isAuth = true
     res.redirect('../myMusic')
 })
 
 
 
 sessions.get('/register', (req, res)=> {
     res.render('register.ejs')
 })
 
 sessions.post('/register', async (req, res)=> {
     const {username, password} = req.body
 
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
 
     res.redirect('/login')
 })
 
 sessions.get('../myMusic', isAuth, (req, res)=> {
     res.render('../myMusic')
 })
 
 //package to logout
 sessions.post('/logout', (req, res)=> {
     req.session.destroy((err)=> {
         if(err) throw err;
         res.redirect('/');
         //redirect to landing page
     })
 })

 //-------------------------------//
//              EXPORTS           //
//-------------------------------//
 module.exports = sessions