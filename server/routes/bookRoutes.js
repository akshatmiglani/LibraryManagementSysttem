const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')

const Books = require('../models/Books');

router.get('/latestbooks',async(req,res)=>{
    try {
        const latestBooks = await Books.find().sort({ publishedDate: -1 }).limit(15); 
        res.json(latestBooks);
      } catch (error) {
        console.error('Error fetching latest books:', error.message);
        res.status(500).json({ error: 'Internal server error' });
      }

})


router.get('/', async (req, res) => {
    try {
      const books = await Books.find({});
      res.json(books);
    } catch (error) {
      console.error('Error fetching books:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/book/:id',async(req,res)=>{
    const bookId = req.params.id;
    try{
        const books=await Books.findById(bookId);
        res.json(books);
    }
    catch (error) {
        console.error('Error fetching books:', error.message);
        res.status(500).json({ error: 'Internal server error' });
      }
})

router.post('/request', verifyToken, (req, res) => {
  const { title, author } = req.body;
  const userId = req.user.id; // Assuming the token includes `id`

  // Simulating a database call to create a book entry with the user's ID
  console.log(`Book titled ${title} by ${author} requested by user ID ${userId}`);

  // Normally you would create a database entry here
  res.status(201).json({
    message: 'Book request submitted successfully',
    data: { title, author, requestedBy: userId }
  });
});

module.exports = router;