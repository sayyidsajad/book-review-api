const Book = require("../models/Book");
const Review = require("../models/Review");

// Service: Create and save a new book
exports.createBook = async (bookData) => {
  const book = new Book(bookData);
  await book.save();
  return book;
};

// Service: Get all books with optional filters and pagination
exports.getBooks = async ({ page = 1, limit = 10, author, genre }) => {
  const filter = {};

  if (author) filter.author = new RegExp(author, "i");
  if (genre) filter.genre = new RegExp(genre, "i");

  const books = await Book.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return books;
};

// Service: Get detailed info for a specific book, including avg. rating and reviews
exports.getBookById = async (id) => {
  const book = await Book.findById(id);

  const reviews = await Review.find({ book: book._id })
    .populate("user", "username")
    .limit(10);

  // Calculate average rating (fallback to 0 if no reviews)
  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

  return { book, avgRating, reviews };
};

// Service: Search books by title or author (case-insensitive, partial match)
exports.searchBooks = async (query) => {
  const books = await Book.find({
    $or: [
      { title: new RegExp(query, "i") },
      { author: new RegExp(query, "i") },
    ],
  });
  return books;
};
