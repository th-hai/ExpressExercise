require('dotenv').config();
var bodyParser = require("body-parser");
var express = require("express");
var authRoute = require('./routes/auth.route');
var authMiddleware = require('./middlewares/auth.middleware');
var bookRoute = require("./routes/book.route");
var userRoute = require("./routes/user.route");
var cookieParser = require('cookie-parser');
var transactionRoute = require("./routes/transaction.route");
var db = require('./db');

var app = new express();
var port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");
app.use(cookieParser(process.env.SECRET));

var favicon = require('serve-favicon');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));
//app.use(express.favicon('/public/images/favicon.png'));

app.get("/", function(req, res) {
  var userId = req.signedCookies.userId;
  var user = db.get('users').find({ id: userId }).value();
  if(!user) {
    res.redirect('/auth/login');
  }
  res.render("index", {
    user: user
  });
});

app.use("/books", authMiddleware.requireAuth, authMiddleware.requireAdminAuth, bookRoute);
app.use('/users', authMiddleware.requireAuth, authMiddleware.requireAdminAuth, userRoute);
app.use('/auth', authRoute);
app.use("/transactions",authMiddleware.requireAuth, authMiddleware.requireUserAuth, transactionRoute);

app.listen(port, function(req, res) {
  console.log("Server listening on port " + port);
});
