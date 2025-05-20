const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/reviews", reviewRoutes);
app.get("/search", require("./controllers/bookController").searchBooks);
app.use(errorHandler);

module.exports = app;
