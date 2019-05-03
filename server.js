//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const Brand = require('./models/brands.js');
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/'+ `affiliate`;

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000


app.get('/brands/new' , (req, res) => {
  res.render('new.ejs');
});

app.get('/brands/:id', (req, res)=>{
    Brand.findById(req.params.id, (err, foundBrand)=>{
      res.render('show.ejs', { brands: foundBrand })    });
});

app.post('/brands/', (req, res) => {
  if(req.body.ownItem === 'on') {
    req.body.ownItem = true;
  } else {
    req.body.ownItem = false;
  }
  if(req.body.socialMedia === 'on') {
    req.body.socialMedia = true;
  } else {
    req.body.socialMedia = false;
  }
  Brand.create(req.body, (error, createBrand) => {
    res.redirect('/brands/')
  });
});

app.get('/brands/', (req, res) => {
  Brand.find({}, (error, allBrands) => {
    res.render('index.ejs', {
      brands: allBrands
    });
  });
});


app.delete('/brands/:id', (req, res) => {
  Brand.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/brands')
  })
})
//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
