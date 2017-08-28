const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');

// Init app
const app = express();

// Bring in models
const Article = require('./models/article')

// Load View Engine
app.engine('html', mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

// Mongo db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

// check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
})

// check for db errors
db.on('error', function(){
  console.log(err);
});

// home route
app.get('/', function(req, res){
  Article.find({}, function(err, articles){
    if(err){
      console.log(err);
    } else {
      res.render('index.html', {
        title: 'Articles',
        articles: articles
      });
    }
  });
});

// Add route
app.get('/articles/add', function(req, res){
  res.render('add.html', {

  });
})

// Add submit POST route
app.post('/articles/add', function(req, res){
  console.log('Submitted')
  return;
});

// Start Server
app.listen('3000', function(){
  console.log('server started on port 3000')
});
