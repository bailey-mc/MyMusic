//-----------------------------//
//          STARTER CODE       //
//-----------------------------//
const express = require('express');
const app = express();
const mongoose = require('mongoose');


let PORT = 3000;
if(process.env.PORT){
	PORT = process.env.PORT
}

app.get('/', (req, res)=>{
	res.send('hi');
})

app.listen(PORT, ()=>{
	console.log('listening');
})




mongoose.connect('mongodb+srv://musiclover:<password>@mymusic.wef1hdo.mongodb.net/?retryWrites=true&w=majority', ()=>{
	console.log('connected to mongo');
})