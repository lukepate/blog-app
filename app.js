const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

// Init app
const app = express();

// Bring in models
const Article = require('./models/article');

// Load View Engine
app.engine('html', mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

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
  let article = new Article();
  article.title = req.body.title;
  article.body = req.body.body;
  article.author = req.body.author;

  article.save(function(err){
    if(err){
      console.log(err);
      return;
    } else{
      res.redirect('/');
    }
  });
});

//Get single article
app.get('/article/:id', function(req, res){
  let id = req.params.id;
  Article.findById(id, function(err, article){
    console.log(article)
    res.render('article.html', {
      article: article

    })
  });
});

// app.get("/creatures/:id", function(req, res){
//   let id = req.params.id;
//    db
//     .one("SELECT * FROM creatures WHERE id = $1", [id])
//     .then(function(data){
//       let view_data = {
//         name: data.planet,
//         species: data.species
//       };
//       res.render("creatures/planets", view_data);
//     })
//   });


// Start Server
app.listen('3000', function(){
  console.log('server started on port 3000')
});
