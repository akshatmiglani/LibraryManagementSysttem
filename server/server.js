// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const bookRoutes=require('./routes/bookRoutes')
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/books',bookRoutes);
app.use("/api/search", searchRoutes);

app.listen(PORT, () => {
  console.log(`Server is runnin...`);
});