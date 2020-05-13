var express = require("express");
var bodyParser = require("body-parser");
var app = new express();
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var adapter = new FileSync("db.json");

var db = low(adapter);

db.defaults({ todos: [] }).write();

var port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.render("index", {
    todos: db.get('todos').value()
  });
});

app.get("/todos", function(req, res) {
  res.render("index", {
    todos: db.get('todos').value()
  });
});

app.get("/todos/search", function(req, res) {
  var q = req.query.q;
  // Get data from db
  var todoList = db.get('todos').value();
  // Filter by query
  var matchedToDo = todoList.filter(function(task) {
    return task.text.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("index", {
    todos: matchedToDo
  });
});

app.get("/todos/create", function(req, res) {
  res.render("create");
});

app.post("/todos/create", function(req, res) {
  db.get('todos').push(req.body).write();
  res.redirect("/todos");
});
app.listen(port, function(req, res) {
  console.log("Server listening on port " + port);
});
