const Book = require("../models/book.model");

const searchBooks = async (req, res, next) => {
  try {
    // Extract query parameters from the request
    const { title, author, genre, sort, order } = req.query;

    // Build the search filter based on the provided query parameters
    const searchFilter = {};
    if (title) searchFilter.title = title;
    if (author) searchFilter.author = author;
    if (genre) searchFilter.genre = genre;

    // Build the sort criteria based on the provided query parameters
    const sortCriteria = {};
    if (sort) {
      const validSortingFields = ['title', 'author', 'genre', 'price'];
      if (validSortingFields.includes(sort)) {
        sortCriteria[sort] = order && order.toUpperCase() === 'DESC' ? -1 : 1;
      } else {
        return res.status(400).json({ error: 'Invalid sorting field' });
      }
    } else if(order==='DESC'){
      sortCriteria.id = -1; // Default sorting based on book ID
    } else {
        sortCriteria.id = 1;
    }

    // Fetch the books from the database based on the search filter and sort criteria
    const books = await Book.find(searchFilter, { _id: 0, __v: 0 }).sort(
      sortCriteria
    );

    // If there are no books, return an empty list in the response
    const responseBooks = books.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre,
      price: book.price,
    }));

    res.status(200).json({ books: responseBooks });
  } catch (error) {
    // Handle any errors that occur during the fetch process
    next(error);
  }
};

module.exports = { searchBooks };
