var express = require("express");
var bodyParser = require("body-parser");
var shortid = require('shortid');
var app = new express();
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var adapter = new FileSync("db.json");

var db = low(adapter);

db.defaults({ books: [] }).write();

var port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.render("index", {
    books: db.get('books').value()
  });
});

app.get("/books", function(req, res) {
  res.render("index", {
    books: db.get('books').value()
  });
});

app.get("/books/search", function(req, res) {
  var q = req.query.q;
  // Get data from db
  var bookList = db.get('books').value();
  // Filter by query
  var matchedBooks = bookList.filter(function(book) {
    return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("index", {
    books: matchedBooks
  });
});

app.get("/books/create", function(req, res) {
  res.render("create");
});

// View book detail
app.get("/books/:id", function(req, res) {
  var id = req.params.id;
  var book = db.get('books').find({id: id}).value();
  res.render('detail', {
        book: book
    });
});

// Update book
app.get("/books/:id/update", function(req, res) {
  var id = req.params.id;
  var book = db.get('books').find({id: id}).value();
  res.render('update', {
        book: book
    });
});

// Remove book
app.get("/books/:id/delete", function(req, res) {
  var id = req.params.id;
  db.get('books').remove({ id: id }).write();
  res.redirect("/books");
});

app.post("/books/create", function(req, res) {
  req.body.id = shortid.generate();
  db.get('books').push(req.body).write();
  res.redirect("/books");
});

app.post("/books/:id/update", function(req, res) {
  var id = req.params.id;
  var newTitle = req.body.title;
  db.get('books').find({ id: id }).assign({ title: newTitle}).write();
  res.redirect("/books");
});


app.listen(port, function(req, res) {
  console.log("Server listening on port " + port);
});
