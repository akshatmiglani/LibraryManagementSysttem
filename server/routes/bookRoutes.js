const express = require('express');
const router = express.Router();

const Books = require('../models/Books');

router.get('/', async (req, res) => {
    try {
      const books = await Books.find({});
      res.json(books);
    } catch (error) {
      console.error('Error fetching books:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;