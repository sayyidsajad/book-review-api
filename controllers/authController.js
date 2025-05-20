const authService = require("../services/authService");
const { successResponse } = require("../utils/responseFormatter");
const catchAsync = require("../utils/catchAsync");

exports.signup = catchAsync(async (req, res) => {
  const user = await authService.signupUser(req.body);
  successResponse(
    res,
    "User registered successfully",
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    201
  );
});

exports.login = catchAsync(async (req, res) => {
  const token = await authService.loginUser(req.body.email, req.body.password);
  successResponse(res, "Login successful", { token });
});
