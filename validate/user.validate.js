var db = require("../db");
module.exports.postCreate = function(req, res, next) {
  var errors = [];
  if (!req.body.name) {
    errors.push("Name is required.");
  }
  if (req.body.name.length > 30) {
    errors.push("User name must be under 30 digits length");
  }

  if (errors.length) {
    res.render("users/create", {
      errors: errors,
      values: req.body
    });
    return;
  }
  next();
};


