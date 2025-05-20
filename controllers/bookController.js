const bookService = require("../services/bookService");
const { successResponse } = require("../utils/responseFormatter");
const catchAsync = require("../utils/catchAsync");

exports.createBook = catchAsync(async (req, res) => {
  const book = await bookService.createBook(req.body);
  successResponse(res, "Book created successfully", book, 201);
});

exports.getBooks = catchAsync(async (req, res) => {
  const books = await bookService.getBooks(req.query);
  successResponse(res, "Books retrieved successfully", books);
});

exports.getBookById = catchAsync(async (req, res) => {
  const bookData = await bookService.getBookById(req.params.id);
  successResponse(res, "Book details retrieved", bookData);
});

exports.searchBooks = catchAsync(async (req, res) => {
  const books = await bookService.searchBooks(req.query.query);
  successResponse(res, "Search results", books);
});
