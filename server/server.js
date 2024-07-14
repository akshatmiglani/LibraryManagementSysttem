// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const axios = require('axios')

const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.FRONTEND_URL, 
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);

app.get('/books', async (req, res) => {
  const { title } = req.query;
  try {
    const result = await axios.get("https://www.googleapis.com/books/v1/volumes", {
      params: {
        q: `intitle:${title}`,
        key: "AIzaSyDEwyltH6olc4YvWCTM8sS2b1VEJt37xww"
      }
    });
    res.json(result.data);

  } catch (error) {
    console.error("Error fetching data from Google Books: ", error);
    res.status(500).json({message: error.message});
  }
});

const bookSchema = new mongoose.Schema({
  title: String,
  mainCategory: String,
  // include other properties as needed
});

const Book = mongoose.model('Book', bookSchema);

// Endpoint to get all unique categories
app.get('/categories', async (req, res) => {
  try {
    const categoryCounts = await Book.aggregate([
      {
        $project: {
          mainCategory: { $toLower: `$mainCategory` }
        }
      },
      {
        $group: {
          _id: `$mainCategory`, // Group by the mainCategory field
          count: { $sum: 1 }   // Count the documents in each group
        }
      },
      {
        $project: {
          _id: 0,            // Do not show _id field
          category: `$_id`,  // Rename _id to category
          count: 1           // Include the count field
        }
      },
      { $sort: { count: -1 } } // Optional: sort by category alphabetically
    ]);
    res.json(categoryCounts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get('/api/books', async (req, res) => {
  const { category } = req.query;
  try {
    const books = await Book.find({ mainCategory: category });  // Adjust field name as necessary
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books: ' + error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is runnin...`);
});
