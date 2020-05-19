var express = require("express");
var controller = require("../controllers/user.controller");

var router = express.Router();

// Get user
router.get("/", controller.index);

router.get("/users", controller.index);

// Create user

router.get("/create", controller.create);

router.post("/create", controller.postCreate);

// Search user

router.get("/search", controller.search);

// View user info

router.get("/:id", controller.get);

// Delete user

router.get("/:id/delete", controller.delete);

// Update user

router.get("/:id/update", controller.update);

router.post("/:id/update", controller.postUpdate);

module.exports = router;
