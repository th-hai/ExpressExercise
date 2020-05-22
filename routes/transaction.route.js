var express = require("express");
var controller = require("../controllers/transaction.controller");

var router = express.Router();

// Get transaction
router.get("/", controller.index);

router.get("/transactions", controller.index);

// Create transaction

router.get("/create", controller.create);

router.post("/create", controller.postCreate);

// Search transaction

router.get("/search", controller.search);

// View transaction info

router.get("/:id", controller.get);

// Delete transaction

router.get("/:id/delete", controller.delete);

module.exports = router;

// Complete transaction

router.get("/:id/complete", controller.complete);