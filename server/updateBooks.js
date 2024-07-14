const axios = require('axios');
const mongoose = require('mongoose');
const Book = require('./models/Book');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB');
  
    try {
      // Update all existing records in the books collection with availableQuantity and totalQuantity
      const books = await Book.find({}); // Fetch all books
  
      for (let book of books) {
        // Generate random numbers between 1 and 10
        const totalQuantity = Math.floor(Math.random() * 10) + 1;
        const availableQuantity = Math.floor(Math.random() * totalQuantity) + 1; // Ensure availableQuantity <= totalQuantity
  
        // Update the book document
        await Book.updateOne(
          { _id: book._id },
          { $set: { availableQuantity: availableQuantity, totalQuantity: totalQuantity } }
        );
      }
  
      console.log('Updated all books with availableQuantity and totalQuantity.');
      mongoose.connection.close(); // Close the connection after updating
  
    } catch (error) {
      console.error('Error updating books:', error.message);
    }
  });