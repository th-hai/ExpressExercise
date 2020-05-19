var express = require("express");
var shortid = require("shortid");

var db = require("../db");

var router = express.Router();

// Get user
router.get("/", function(req, res) {
  res.render("users/index", {
    users: db.get("users").value()
  });
});

router.get("/users", function(req, res) {
  res.render("users/index", {
    users: db.get("users").value()
  });
});

// Create user

router.get("/create", function(req, res) {
  res.render("users/create");
});

router.post("/create", function(req, res) {
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
});

// Search user

router.get("/search", function(req, res) {
  var q = req.query.q;
  // Get data from db
  var userList = db.get("users").value();
  // Filter by query
  var matchedUsers = userList.filter(function(user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("users/index", {
    users: matchedUsers
  });
});

// View user info

router.get("/:id", function(req, res) {
  var id = req.params.id;
  var user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("users/detail", {
    user: user
  });
});

// Delete user

router.get("/:id/delete", function(req, res) {
  var id = req.params.id;
  db.get("users")
    .remove({ id: id })
    .write();
  res.redirect("/users");
});

// Update user

router.get("/:id/update", function(req, res) {
  var id = req.params.id;
  var user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("users/update", {
    user: user
  });
});

router.post("/:id/update", function(req, res) {
  var id = req.params.id;
  var newName = req.body.name;
  db.get("users")
    .find({ id: id })
    .assign({ name: newName })
    .write();
  res.redirect("/users");
});

module.exports = router;
