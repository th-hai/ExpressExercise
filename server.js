// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
var bodyParser = require("body-parser");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var todoLists = [
  { todo: "Đi chợ" },
  { todo: "Nấu cơm" },
  { todo: "Rửa bát" },
  { todo: "Học code tại CodersX" }
];

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.render("index", {
    todoLists: todoLists
  });
});

app.get("/todos", function(req, res) {
  res.render("todo", {
    todoLists: todoLists
  });
});

app.get("/todos", function(req, res) {
  var q = req.query.q;
  var matchedTask = todoLists.filter(function(task) {
    return task.todo.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("todos", {
    todoLists: matchedTask
  });
});

app.get("/todos/create", function(req, res) {
  res.render("create");
});

app.post("/todos/create", function(req, res) {
  todoLists.push(req.body);
  res.redirect("/todos");
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
