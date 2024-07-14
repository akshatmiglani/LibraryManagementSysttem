const express = require('express');
const router = express.Router();
const Borrowing = require('../models/Borrowing');
const Book = require('../models/Books');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const verifyToken = require('../middleware/verifyToken');

router.post('/borrow', async (req, res) => {
    const { bookId, dueDate } = req.body;
    const userId = req.user.id;

    try {
        const book = await Book.findById(bookId);
        if (book.availableQuantity < 1) {
            return res.status(400).json({ message: 'Book not available' });
        }

        const borrowing = new Borrowing({ bookId, userId, dueDate });
        await borrowing.save();

        book.availableQuantity -= 1;
        await book.save();

        const user = await User.findById(userId);

        const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
                    type: 'OAuth2',
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD,
                    clientId: process.env.OAUTH_CLIENTID,
                    clientSecret: process.env.OAUTH_CLIENT_SECRET,
                    refreshToken: process.env.OAUTH_REFRESH_TOKEN
            }
        });

        const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: user.email,
        subject: 'Book Borrow Confirmation',
        text: `You have borrowed the book "${book.title}". Please collect it from the library at XYZ address.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Failed to send email' });
        }
        res.json({ message: 'Book borrowed successfully', borrowing });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/api/user/borrowed-books', verifyToken, async (req, res) => {
    try {
      const borrowings = await Borrowing.find({ user: req.user.userId }).populate('book').exec();
      res.json(borrowings);
    } catch (error) {
      console.error('Error fetching borrowed books:', error);
      res.status(500).json({ error: 'Failed to fetch borrowed books' });
    }
  });
  
module.exports = router;
