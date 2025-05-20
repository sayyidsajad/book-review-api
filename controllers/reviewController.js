const reviewService = require("../services/reviewService");
const { successResponse } = require("../utils/responseFormatter");
const catchAsync = require("../utils/catchAsync");

// Controller: Add a new review for a book (one review per user per book)
exports.addReview = catchAsync(async (req, res) => {
  const review = await reviewService.addReview(
    req.user._id,
    req.params.id,
    req.body
  );
  successResponse(res, "Review added successfully", review, 201);
});

// Controller: Update an existing review by the same user
exports.updateReview = catchAsync(async (req, res) => {
  const review = await reviewService.updateReview(
    req.user._id,
    req.params.id,
    req.body
  );
  successResponse(res, "Review updated", review);
});

// Controller: Delete an existing review by the same user
exports.deleteReview = catchAsync(async (req, res) => {
  const result = await reviewService.deleteReview(req.user._id, req.params.id);
  successResponse(res, result.message);
});
