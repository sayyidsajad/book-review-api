const Review = require("../models/Review");
const AppError = require("../utils/AppError");

// Service: Add a new review (only one per user per book)
exports.addReview = async (userId, bookId, reviewData) => {
  const existing = await Review.findOne({ user: userId, book: bookId });
  if (existing) throw new AppError("Already reviewed this book", 400);

  const review = new Review({ ...reviewData, user: userId, book: bookId });
  await review.save();
  return review;
};

// Service: Update an existing review (only by the same user)
exports.updateReview = async (userId, reviewId, updatedData) => {
  const review = await Review.findOne({ _id: reviewId, user: userId });
  if (!review) throw new AppError("Review not found", 404);

  Object.assign(review, updatedData);
  await review.save();
  return review;
};

// Service: Delete a review (only by the same user)
exports.deleteReview = async (userId, reviewId) => {
  const review = await Review.findOneAndDelete({ _id: reviewId, user: userId });
  if (!review) throw new AppError("Review not found", 404);

  return { message: "Review deleted" };
};
