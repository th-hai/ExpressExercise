const bcrypt = require("bcrypt");
const saltRounds = 10;
var db = require("../db");

// Index
module.exports.login = function(req, res) {
  res.render("auth/login");
};

module.exports.postLogin = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  var user = db
    .get("users")
    .find({ email: email })
    .value();

  if (!user) {
    res.render("auth/login", {
      errors: ["User doesn't exist!"],
      values: req.body
    });
    return;
  }

  // Hash user password
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(user.password, salt);

  // Compare input
  // Check wrongLoginCount

  if (user.wrongLoginCount < 4) {
    if (!bcrypt.compareSync(password, hash)) {
      var curCount = user.wrongLoginCount + 1;
      console.log(curCount);
      db.get("users")
        .find({ email: email })
        .assign({ wrongLoginCount: curCount })
        .write();
      res.render("auth/login", {
        errors: ["Wrong password!"],
        values: req.body
      });
      return;
    }
  } else {
    res.render("auth/login", {
      errors: ["You are not allow to login anymore"],
      values: req.body
    });
    return;
  }

  res.cookie("userId", user.id);
  res.redirect("/");
};
