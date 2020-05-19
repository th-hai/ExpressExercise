var express = require("express");
var shortid = require("shortid");

var db = require("../db");

var router = express.Router();

// Get book
router.get("/", function(req, res) {
  res.render("books/index", {
    books: db.get("books").value()
  });
});

router.get("/books", function(req, res) {
  res.render("books/index", {
    books: db.get("books").value()
  });
});

// Create book

router.get("/create", function(req, res) {
  res.render("books/create");
});

router.post("/create", function(req, res) {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/books");
});

// Search book

router.get("/search", function(req, res) {
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
});

// View book info

router.get("/:id", function(req, res) {
  var id = req.params.id;
  var book = db
    .get("books")
    .find({ id: id })
    .value();
  res.render("books/detail", {
    book: book
  });
});

// Delete book

router.get("/:id/delete", function(req, res) {
  var id = req.params.id;
  db.get("books")
    .remove({ id: id })
    .write();
  res.redirect("/books");
});

// Update book

router.get("/:id/update", function(req, res) {
  var id = req.params.id;
  var book = db
    .get("books")
    .find({ id: id })
    .value();
  res.render("books/update", {
    book: book
  });
});

router.post("/:id/update", function(req, res) {
  var id = req.params.id;
  var newTitle = req.body.title;
  db.get("books")
    .find({ id: id })
    .assign({ title: newTitle })
    .write();
  res.redirect("/books");
});

module.exports = router;
