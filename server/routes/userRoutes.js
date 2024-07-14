const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Log = require('../models/Log');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    // Check for missing fields
    if (!username || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate role
    const validRoles = ['admin', 'librarian', 'user'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Create a new user
    const user = new User({ username, email, password, role });
    await user.save();

    const newLog = new Log({ user: user._id, action: 'sign-in' });
    await newLog.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Error creating user', details: error.message });
  }
});

// Modified login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const newLog = new Log({ user: user._id, action: 'sign-in' });
    await newLog.save();

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, 'secret', { expiresIn: '1h' });

    res.json({ token, role: user.role });
  } catch (error) {
    console.error('Error during login:', error); 
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Middleware to verify token (role check removed)
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token not provided' });
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      console.error('Error during token verification:', err);
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

// Protected routes
router.get('/admin', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied: Invalid role' });
  }
  res.json({ message: 'Welcome to the admin panel' });
});

router.get('/librarian', verifyToken, async (req, res) => {
  if (req.user.role !== 'librarian') {
    return res.status(403).json({ error: 'Access denied: Invalid role' });
  }
  res.json({ message: 'Welcome to the librarian panel' });
});

router.get('/user', verifyToken, async (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ error: 'Access denied: Invalid role' });
  }
  res.json({ message: 'Welcome to the user panel' });
});

module.exports = router;