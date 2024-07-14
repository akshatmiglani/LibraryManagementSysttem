const express = require('express');
const router = express.Router();

const Book = require('../models/Book');

router.get('/', async (req, res) => {
    try {
      const books = await Book.find({});
      res.json(books);
    } catch (error) {
      console.error('Error fetching books:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id',async(req,res)=>{
    const bookId = req.params.id;
    try{
        const books=await Book.findById(bookId);
        res.json(books);
    }
    catch (error) {
        console.error('Error fetching books:', error.message);
        res.status(500).json({ error: 'Internal server error' });
      }
})

module.exports = router;