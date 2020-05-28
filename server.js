var bodyParser = require("body-parser");
var express = require("express");
var bookRoute = require("./routes/book.route");
var userRoute = require("./routes/user.route");
var transactionRoute = require("./routes/transaction.route");

var app = new express();
var port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");

var favicon = require('serve-favicon');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));
//app.use(express.favicon('/public/images/favicon.png'));

app.get("/", function(req, res) {
  res.render("index");
});

app.use("/books", bookRoute);
app.use("/users", userRoute);
app.use("/transactions", transactionRoute);

app.listen(port, function(req, res) {
  console.log("Server listening on port " + port);
});
