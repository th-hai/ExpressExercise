var express = require("express");
var controller = require("../controllers/book.controller");

var router = express.Router();

// Get book
router.get("/", controller.index);

router.get("/books", controller.index);

// Create book

router.get("/create", controller.create);

router.post("/create", controller.postCreate);

// Search book

router.get("/search", controller.search);

// View book info

router.get("/:id", controller.get);

// Delete book

router.get("/:id/delete", controller.delete);

// Update book

router.get("/:id/update", controller.update);

router.post("/:id/update", controller.postUpdate);

module.exports = router;
