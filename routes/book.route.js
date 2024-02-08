const express = require('express');
const { addbook, updateBook, bookById, getAllbooks, searchBooks} = require('../controllers/book.controller');
const router = express.Router();


router.post("/books", addbook)
router.put("/books/:id", updateBook)
router.get("/books/:id", bookById)
router.get("/books", getAllbooks)


module.exports = router