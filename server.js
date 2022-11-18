//-----------------------------//
//          DEPENDENCIES      //
//-----------------------------//
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = mongoose.connection;
const methodOverride = require('method-override');
// const PostSeed = require('./models/postseed.js');  //for seed
const Post = require('./models/postschema.js') //  for seed



//-----------------------------//
//         CONFIGURATION      //
//-----------------------------//
app.use(methodOverride('_method'));
let PORT = 3000;
if(process.env.PORT){
	PORT = process.env.PORT
}

// body parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// static
app.use(express.static('public'));

//controller
const myMusicController = require('./controllers/myMusic.js');
// const { post } = require('./controllers/myMusic.js');
app.use('/myMusic', myMusicController);

//MONGO
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://musiclover:bobdylaN%2196@mymusic.wef1hdo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const Post = client.db("test").collection("Post");
  // perform actions on the collection object
  client.close();
});




//seed
// app.get('/myMusic/seed', (req, res)=> {
//     Post.create(PostSeed, (err, data)=> {
//         res.send(PostSeed)
//     }
//     )
// })

//for heroku deployment
app.get('/', (req, res)=>{
	Post.find({}, (err, allPosts)=> {
        res.render('index.ejs',
            {
                post: allPosts
            }
        );
    })
    
})

// error/success
db.on('error', (err) => console.log(err.message));
db.on('connected', () => console.log('mongo connected: ', uri));
db.on('disconnected', () => console.log('mongo disconnected'));


//listener
app.listen(PORT, ()=>{
	console.log('listening');
})

//connect to mongoose
mongoose.connect('mongodb+srv://musiclover:bobdylaN%2196@mymusic.wef1hdo.mongodb.net/?retryWrites=true&w=majority', ()=>{
	console.log('connected to mongo');
})