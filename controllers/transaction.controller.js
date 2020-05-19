var db = require("../db");
var shortid = require("shortid");

// Transaction list
module.exports.index = function(req, res) {
  res.render("transactions/index", {
    transactions: db.get("transactions").value()
  });
}

// Create transaction

module.exports.create = function(req, res) {
  res.render("transactions/create", {
    users: db.get('users').value(),
    books: db.get('books').value()
  });
};

module.exports.postCreate = function(req, res) {
  req.body.id = shortid.generate();
  req.body.isComplete = false;
  db.get("transactions")
    .push(req.body)
    .write();
  res.redirect("/transactions");
};

// Search transaction

module.exports.search = function(req, res) {
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
};

// View transaction info

module.exports.get = function(req, res) {
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
    transaction: transaction,
    user: user,
    book: book
  });
};

// Delete transaction

module.exports.delete = function(req, res) {
  var id = req.params.id;
  db.get("transactions")
    .remove({ id: id })
    .write();
  res.redirect("/transactions");
};


// Complete transaction

module.exports.complete = function(req, res) {
  var id = req.params.id;
  db.get("transactions")
    .find({ id: id })
    .assign({ isComplete : true })
    .write();
  res.redirect("/transactions");
}