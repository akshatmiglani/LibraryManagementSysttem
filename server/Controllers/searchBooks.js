const Book = require("../models/Books");
const axios = require("axios");

exports.searchb = async (req, res) => {
  const { title } = req.query;
  try {
    const books = await Book.find({ title: new RegExp(title, "i") }).limit(6);
    res.json(books);
  } catch (error) {
    console.error("Error fetching data from MongoDB: ", error);
    res.status(500).json({ message: error.message });
  }
};
