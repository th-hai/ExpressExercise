require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const mailgun = require("mailgun-js");
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
    const DOMAIN = "sandbox2d1525556a5c4cb4adf6bb371efb82c1.mailgun.org";
    const mg = mailgun({ apiKey: process.env.APIKEY, domain: DOMAIN });
    const data = {
      from:
        "Mailgun Sandbox <postmaster@sandbox2d1525556a5c4cb4adf6bb371efb82c1.mailgun.org>",
      to: user.email,
      subject: "Login Notification",
      text: "Someone are trying to log in to your account!"
    };
    mg.messages().send(data, function(error, body) {
      console.log(body);
    });
  }

  res.cookie("userId", user.id, {
    signed: true
  });
  
  res.redirect("/");
};
