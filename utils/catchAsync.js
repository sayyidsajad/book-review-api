// Wrapper to catch errors in async route handlers and pass them to next() (global error handler)
module.exports = (fn) => (req, res, next) => fn(req, res, next).catch(next);
