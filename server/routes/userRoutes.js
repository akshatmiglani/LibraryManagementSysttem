const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    // Check for missing fields
    if (!username || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Create a new user
    const user = new User({ username, email, password, role });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error); // Detailed error logging
    res.status(500).json({ error: 'Error creating user', details: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, 'secret', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error); 
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Middleware to verify token and role
const verifyTokenAndRole = (roles) => (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token not provided' });
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      console.error('Error during token verification:', err); // Detailed error logging
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    if (!roles.includes(decoded.role)) {
      return res.status(403).json({ error: 'Access denied: Invalid role' });
    }

    req.user = decoded;
    next();
  });
};

// Admin panel route
router.get('/admin', verifyTokenAndRole(['admin']), async (req, res) => {
  res.json({ message: 'Welcome to the admin panel' });
});

// Examiner panel route
router.get('/librarian', verifyTokenAndRole(['librarian']), async (req, res) => {
  res.json({ message: 'Welcome to the librarian panel' });
});

// Invigilator panel route
router.get('/user', verifyTokenAndRole(['user']), async (req, res) => {
  res.json({ message: 'Welcome to the user panel' });
});


module.exports = router;
