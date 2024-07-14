const express = require("express");
const router = express.Router();
const searchBook = require("../Controllers/searchBooks");

router.get("/books", searchBook.searchb);

module.exports = router;
