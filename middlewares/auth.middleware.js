var db = require("../db");

module.exports.requireAuth = function(req, res, next) {
  if (!req.signedCookies.userId) {
    res.redirect("/auth/login");
    return;
  }
  var user = db
    .get("users")
    .find({ id: req.signedCookies.userId })
    .value();

  if (!user) {
    res.redirect("/auth/login");
    return;
  }

  res.locals.user = user;
  next();
};

module.exports.requireUserAuth = function(req, res, next) {
  var user = db
    .get("users")
    .find({ id: req.signedCookies.userId })
    .value();
  console.log(user);
  if (user.isAdmin) {
    res.redirect("/auth/login");
  }
  res.locals.user = user;
  next();
};

module.exports.requireAdminAuth = function(req, res, next) {
  var user = db
    .get("users")
    .find({ id: req.signedCookies.userId })
    .value();

  if (!user.isAdmin) {
    res.redirect("/auth/login");
  }
  res.locals.user = user;
  next();
};
