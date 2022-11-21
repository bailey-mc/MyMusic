//-------------------------------//
//          DEPENDENCEIS        //
//-------------------------------//
const express = require('express');
// const { aggregate } = require('../models/postschema.js');
const profile = express.Router();
const User = require('../models/user.js');





//-------------------------------//
//              ROUTES           //
//-------------------------------//


//-------------PROFILE/INDEX---------------//
profile.get('/', (req, res)=> {
    res.render('profile.ejs')
})

//-------------EDIT---------------//


//-------------PUT---------------//


//-------------DELETE---------------//


module.exports = profile;