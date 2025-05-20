const reviewService = require("../services/reviewService");
const { successResponse } = require("../utils/responseFormatter");
const catchAsync = require("../utils/catchAsync");

exports.addReview = catchAsync(async (req, res) => {
  const review = await reviewService.addReview(
    req.user._id,
    req.params.id,
    req.body
  );
  successResponse(res, "Review added successfully", review, 201);
});

exports.updateReview = catchAsync(async (req, res) => {
  const review = await reviewService.updateReview(
    req.user._id,
    req.params.id,
    req.body
  );
  successResponse(res, "Review updated", review);
});

exports.deleteReview = catchAsync(async (req, res) => {
  const result = await reviewService.deleteReview(req.user._id, req.params.id);
  successResponse(res, result.message);
});
