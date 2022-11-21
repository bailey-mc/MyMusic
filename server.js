//-----------------------------//
//          DEPENDENCIES      //
//-----------------------------//
const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoBDSession = require('connect-mongodb-session')(session);
const app = express();
const mongoose = require('mongoose');
const db = mongoose.connection;
const methodOverride = require('method-override');
// const PostSeed = require('./models/postseed.js');  //for seed
const Post = require('./models/postschema.js') //  for seed





//-----------------------------//
//        MONGO CONFIG    //
//-----------------------------//
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://musiclover:bobdylaN%2196@mymusic.wef1hdo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const Post = client.db("test").collection("Post");
  // perform actions on the collection object
  client.close();
});
const store = new MongoBDSession({
    uri: uri,
    collection: 'mySessions',
})


//-----------------------------//
//         CONFIGURATION      //
//-----------------------------//
app.set('view engine', 'ejs')
app.use(methodOverride('_method'));
let PORT = 3000;
if(process.env.PORT){
	PORT = process.env.PORT
}


app.use(express.urlencoded
    ({extended: true}));

app.use(session({
    secret: 'key that will sign cookie',
    resave: false,
    saveUninitialized: false,
    store: store
    }))

app.use(express.json());

// static //public files
app.use(express.static('public'));

//controller
const sessionsController = require('./controllers/sessions_controller')
app.use('/sessions', sessionsController)
const myMusicController = require('./controllers/myMusic.js');
// const { post } = require('./controllers/myMusic.js');
app.use('/myMusic', myMusicController);
// const profileController = require('./controllers/profile_controller');
// app.use('/profile', profileController);





//seed
// app.get('/myMusic/seed', (req, res)=> {
//     Post.create(PostSeed, (err, data)=> {
//         res.send(PostSeed)
//     }
//     )
// })

//for heroku deployment
app.get('/', (req, res)=>{
	res.render('landing.ejs')
    
})

//error message for page that does not exist
app.use((req,res, next)=> {
    res.send('404 page not found')
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