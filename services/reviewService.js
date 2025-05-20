const Review = require("../models/Review");
const AppError = require("../utils/AppError");

exports.addReview = async (userId, bookId, reviewData) => {
  const existing = await Review.findOne({ user: userId, book: bookId });
  if (existing) throw new AppError("Already reviewed this book");

  const review = new Review({ ...reviewData, user: userId, book: bookId });
  await review.save();
  return review;
};

exports.updateReview = async (userId, reviewId, updatedData) => {
  const review = await Review.findOne({ _id: reviewId, user: userId });
  if (!review) throw new AppError("Review not found");

  Object.assign(review, updatedData);
  await review.save();
  return review;
};

exports.deleteReview = async (userId, reviewId) => {
  const review = await Review.findOneAndDelete({ _id: reviewId, user: userId });
  if (!review) throw new AppError("Review not found");

  return { message: "Review deleted" };
};
