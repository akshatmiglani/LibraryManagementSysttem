const axios = require('axios');
const mongoose = require('mongoose');
const Book = require('./models/Book');
const dotenv = require('dotenv');

dotenv.config();

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Fetch books from Google Books API with pagination
const fetchBooksFromAPI = async (category, startIndex = 0, maxResults = 40) => {
  const query = encodeURIComponent(category);
  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${query}&startIndex=${startIndex}&maxResults=${maxResults}&key=${process.env.GOOGLE_API}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching books from API:', error.message);
    return null;
  }
};

const getBooks = async () => {
  const targetBooksCount = 100; 
  const categories = ['science', 'technology', 'fiction', 'history','adventure','fantasy','romance','classics','non fiction'];

  try {
    for (let category of categories) {
      let insertedBooksCount = 0;
      let startIndex = 0;

      while (insertedBooksCount < targetBooksCount) {
        const books = await fetchBooksFromAPI(category, startIndex);

        if (!books || !Array.isArray(books.items) || books.items.length === 0) {
          console.error(`Books data for category '${category}' from API is invalid or empty.`);
          break;
        }

        const filteredBooks = books.items.filter((book) =>
          book.volumeInfo.categories && book.volumeInfo.categories.length > 0
        );

        const remainingBooksNeeded = targetBooksCount - insertedBooksCount;
        const booksToInsert = filteredBooks.slice(0, remainingBooksNeeded);

        await saveBooksToDatabase(booksToInsert);
        insertedBooksCount += booksToInsert.length;
        startIndex += booksToInsert.length;
      }
    }
  } catch (error) {
    console.error('Error in main function:', error.message);
  }
};

const saveBooksToDatabase = async (books) => {
  const bookDocs = books.map((book) => {
    const { volumeInfo } = book;
    const ratingsCount = volumeInfo.ratingsCount || 0;
    const averageRating = volumeInfo.averageRating || 0;

    return {
      title: volumeInfo.title,
      authors: volumeInfo.authors,
      publisher: volumeInfo.publisher,
      publishedDate: volumeInfo.publishedDate,
      description: volumeInfo.description,
      industryIdentifiers: volumeInfo.industryIdentifiers,
      pageCount: volumeInfo.pageCount,
      dimensions: volumeInfo.dimensions,
      printType: volumeInfo.printType,
      mainCategory: volumeInfo.categories[0],
      categories: volumeInfo.categories,
      averageRating: averageRating,
      ratingsCount: ratingsCount,
      language: volumeInfo.language,
      imageLinks: volumeInfo.imageLinks,
      infoLink: volumeInfo.infoLink,
      canonicalVolumeLink: volumeInfo.canonicalVolumeLink,
    };
  });

  try {
    await Book.insertMany(bookDocs);
    console.log(`Inserted ${bookDocs.length} books into the database.`);
  } catch (error) {
    console.error('Error saving books to database:', error.message);
  }
};

getBooks();
