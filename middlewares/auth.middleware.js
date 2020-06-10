var db = require('../db');

module.exports.requireAuth = function(req, res, next) {
    if(!req.cookies.userId) {
        res.redirect('/auth/login');
        return;
    }

    var user = db.get('users').find({ id: req.cookies.userId }).value();

    if (!user) {
        res.redirect('/auth/login');
        return;
    }
    next();
};

module.exports.requireUserAuth = function(req, res, next) {
  var user = db.get('users').find({id: req.cookies.userId}).value();
  
  if(user.isAdmin) {
    res.redirect('/auth/login')
  }
  next();
}

module.exports.requireAdminAuth = function(req, res, next) {
  
  var user = db.get('users').find({id: req.cookies.userId}).value();
  
  if(!user.isAdmin) {
    res.redirect('/auth/login')
  }
  next();
}