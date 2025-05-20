const User = require("../models/User");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

// Service: Handle user registration logic
exports.signupUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

// Service: Authenticate user and generate JWT token
exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    // Operational error - invalid login credentials
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};
