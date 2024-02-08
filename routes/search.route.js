const express = require('express');
const { searchBooks } = require('../controllers/search.controller');

const router = express.Router();


router.get('/', searchBooks);

module.exports = router