var express = require("express");
var shortid = require("shortid");

var db = require("../db");

var router = express.Router();

// Get transaction
router.get("/", function(req, res) {
  res.render("transactions/index", {
    transactions: db.get("transactions").value()
  });
});

router.get("/transactions", function(req, res) {
  res.render("transactions/index", {
    transactions: db.get("transactions").value()
  });
});

// Create transaction

router.get("/create", function(req, res) {
  res.render("transactions/create", {
    users: db.get('users').value(),
    books: db.get('books').value()
  });
});

router.post("/create", function(req, res) {
  req.body.id = shortid.generate();
  db.get("transactions")
    .push(req.body)
    .write();
  res.redirect("/transactions");
});

// Search transaction

router.get("/search", function(req, res) {
  var q = req.query.q;
  // Get data from db
  var transactionList = db.get("transactions").value();
  // Filter by query
  var matchedTransactions = transactionList.filter(function(transaction) {
    return transaction.id.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("transactions/index", {
    transactions: matchedTransactions
  });
});

// View transaction info

router.get("/:id", function(req, res) {
  var id = req.params.id;
  var transaction = db
    .get("transactions")
    .find({ id: id })
    .value();
  var uId = transaction.userId;
  var bId = transaction.bookId;
  var user = db.get('users').find({ id: uId}).value();
  var book = db.get('books').find({ id: bId}).value();
  res.render("transactions/detail", {
    user: user,
    book: book
  });
});

// Delete transaction

router.get("/:id/delete", function(req, res) {
  var id = req.params.id;
  db.get("transactions")
    .remove({ id: id })
    .write();
  res.redirect("/transactions");
});

module.exports = router;
