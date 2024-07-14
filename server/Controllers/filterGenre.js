const Book = require("../models/Books");
const axios = require("axios");

exports.searchFilterrr = async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query; // Defaults to page 1 and limit 10 if not specified
  try {
    const books = await Book.find({ mainCategory: category })
      .skip((page - 1) * limit) // Skip the previous pages
      .limit(parseInt(limit)); // Limit the number of results

    const count = await Book.countDocuments({ mainCategory: category }); // For total count of books in category
    res.json({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalBooks: count,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books: " + error.message });
  }
};
