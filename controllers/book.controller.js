var db = require("../db");
var shortid = require("shortid");

// Book list

module.exports.index = function(req, res) {
  res.render("books/index", {
    books: db.get("books").value()
  });
};

// Create book

module.exports.create = function(req, res) {
  res.render("books/create");
};

module.exports.postCreate = function(req, res) {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/books");
};

// Search book

module.exports.search = function(req, res) {
  var q = req.query.q;
  // Get data from db
  var bookList = db.get("books").value();
  // Filter by query
  var matchedBooks = bookList.filter(function(book) {
    return book.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("books/index", {
    books: matchedBooks
  });
};

// View book detail

module.exports.get = function(req, res) {
  var id = req.params.id;
  var book = db
    .get("books")
    .find({ id: id })
    .value();
  res.render("books/detail", {
    book: book
  });
};

// Delete book

module.exports.delete = function(req, res) {
  var id = req.params.id;
  db.get("books")
    .remove({ id: id })
    .write();
  res.redirect("/books");
};

// Update book

module.exports.update = function(req, res) {
  var id = req.params.id;
  var book = db
    .get("books")
    .find({ id: id })
    .value();
  res.render("books/update", {
    book: book
  });
};

module.exports.postUpdate = function(req, res) {
  var id = req.params.id;
  var newTitle = req.body.title;
  db.get("books")
    .find({ id: id })
    .assign({ title: newTitle })
    .write();
  res.redirect("/books");
};
