const express = require("express");
const router = express.Router();
const bookCoverController = require("./bookCoverController");

router.route("/:id").get(bookCoverController.getBookCoverById);

module.exports = router;
