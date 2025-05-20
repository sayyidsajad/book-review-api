module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const response = {
    success: false,
    message: err.message || "Internal Server Error",
  };

  // Include error stack only in non-production (development) environment
  if (process.env.NODE_ENV !== "production") {
    response.error = err.stack;
  }

  res.status(statusCode).json(response);
};