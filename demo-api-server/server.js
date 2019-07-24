const express = require("express");
const router = express.Router();

const authors = require("./authors");
router.use("/authors", authors);

const books = require("./books");
router.use("/books", books);

module.exports = router;
