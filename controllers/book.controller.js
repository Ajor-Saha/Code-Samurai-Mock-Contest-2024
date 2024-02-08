const Book = require("../models/book.model");
const errorHandler = require("../utils/error");

const addbook = async (req, res, next) => {
  const { id, title, author, genre, price } = req.body;

  const newbook = new Book({
    id,
    title,
    author,
    genre,
    price,
  });

  try {
    await newbook.save();
    const responseBook = {
      id: newbook.id,
      title: newbook.title,
      author: newbook.author,
      genre: newbook.genre,
      price: newbook.price,
    };
    res.status(201).json(responseBook);
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  const { id } = req.params; // Extracting book ID from the request parameters
  const { title, author, genre, price } = req.body;

  try {
    // Find the book by ID in the database
    const existingBook = await Book.findOne({ id });

    // If the book does not exist, return an error response
    if (!existingBook) {
      return res
        .status(404)
        .json({ message: `book with id: ${id} was not found` });
    }

    // Update the book details with the new values
    existingBook.title = title;
    existingBook.author = author;
    existingBook.genre = genre;
    existingBook.price = price;

    // Save the updated book to the database
    await existingBook.save();

    // Return a success response with the updated book object
    res.status(200).json({
      id: existingBook.id,
      title: existingBook.title,
      author: existingBook.author,
      genre: existingBook.genre,
      price: existingBook.price,
    });
  } catch (error) {
    // Handle any errors that occur during the update process
    next(error);
  }
};

const bookById = async (req, res, next) => {
  const { id } = req.params; // Extracting book ID from the request parameters

  try {
    // Find the book by ID in the database
    const foundBook = await Book.findOne({ id });

    // If the book does not exist, return an error response
    if (!foundBook) {
      return res
        .status(404)
        .json({ message: `book with id: ${id} was not found` });
    }

    res.status(200).json({
      id: foundBook.id,
      title: foundBook.title,
      author: foundBook.author,
      genre: foundBook.genre,
      price: foundBook.price,
    });
  } catch (error) {
    // Handle any errors that occur during the update process
    next(error);
  }
};

const getAllbooks = async (req, res, next) => {
  try {
    // Fetch all books from the database, sorted by ID in ascending order
    const books = await Book.find({}, { _id: 0, __v: 0 }).sort({ id: 1 });

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



module.exports = { addbook, updateBook, bookById, getAllbooks };
