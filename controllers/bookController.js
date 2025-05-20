const bookService = require("../services/bookService");
const { successResponse } = require("../utils/responseFormatter");
const catchAsync = require("../utils/catchAsync");

// Controller: Create a new book (requires auth)
exports.createBook = catchAsync(async (req, res) => {
  const book = await bookService.createBook(req.body);
  successResponse(res, "Book created successfully", book, 201);
});

// Controller: Retrieve paginated list of books with optional filters
exports.getBooks = catchAsync(async (req, res) => {
  const books = await bookService.getBooks(req.query);
  successResponse(res, "Books retrieved successfully", books);
});

// Controller: Get detailed information about a single book by ID
exports.getBookById = catchAsync(async (req, res) => {
  const bookData = await bookService.getBookById(req.params.id);
  successResponse(res, "Book details retrieved", bookData);
});

// Controller: Search books by title or author (case-insensitive, partial match)
exports.searchBooks = catchAsync(async (req, res) => {
  const books = await bookService.searchBooks(req.query.query);
  successResponse(res, "Search results", books);
});
