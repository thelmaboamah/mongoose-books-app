// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser');
          db = require('./models');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));



////////////////////
//  DATA
///////////////////








////////////////////
//  ROUTES
///////////////////




// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books', function (req, res) {
  // send all books as JSON response
  db.Book.find(function(err, books){
    if (err) { return console.log("index error: " + err); }
    res.send(books);
  });
});

// get one book
app.get('/api/books/:id', function (req, res) {
  // find one book by its id
  var id = req.params.id;
  db.Book.find({_id: id}, function(err, book){
    if (err) { return console.log("index error: " + err); }
    res.json(book);
  })
});

// create new book
app.post('/api/books', function (req, res) {
  // create new book with form data (`req.body`)
  var title = req.body.title;
  var author = req.body.author;
  
  db.Book.create({title: title, author: author}, function(err, newBook){
    res.json(newBook);
  })
});

// update book
app.put('/api/books/:id', function(req,res){
// get book id from url params (`req.params`)
  var id = req.params.id;
  var title = req.body.title;
  var author = req.body.author;
  var update = {title: title, author: author};
  // find the index of the book we want to remove
  console.log(id);
  db.Book.findOneAndUpdate({_id: id}, update, {new: true}, function(err, updatedBook){
    if (err) { return console.log("index error: " + err); }

    console.log(updatedBook);
    res.json(updatedBook);
  })
});

// delete book
app.delete('/api/books/:id', function (req, res) {
  // get book id from url params (`req.params`)
  var id = req.params.id;
  db.Book.findOneAndRemove({_id: id}, function(err, deletedBook) {
    res.json(deletedBook);
  })  
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Book app listening at http://localhost:3000/');
});
