const express = require("express");
const router = express.Router();
const {
  createBook,
  getBooks,
  getBookById,
} = require("../controllers/bookController");
const auth = require("../middlewares/authMiddleware");
const { addReview } = require("../controllers/reviewController");

router.post("/", auth, createBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/:id/reviews", auth, addReview);

module.exports = router;
