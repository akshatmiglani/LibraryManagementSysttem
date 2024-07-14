const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  authors: [String],
  publisher: String,
  publishedDate: String,
  description: String,
  industryIdentifiers: [{ type: { type: String }, identifier: String }],
  pageCount: Number,
  dimensions: {
    height: String,
    width: String,
    thickness: String,
  },
  printType: String,
  mainCategory: String,
  categories: [String],
  averageRating: Number,
  ratingsCount: Number,
  language: String,
  imageLinks: {
    smallThumbnail: String,
    thumbnail: String,
    small: String,
    medium: String,
    large: String,
    extraLarge: String,
  },
  infoLink: String,
  canonicalVolumeLink: String,
  availableQuantity: { type: Number, default: 0 },
  totalQuantity: { type: Number, default: 0 } 
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
