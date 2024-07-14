const express = require("express");
const router = express.Router();
const filterGenre = require("../Controllers/filterGenre");

router.get("/genre", filterGenre.searchFilterrr);

module.exports = router;
