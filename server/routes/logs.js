const express = require('express');
const router = express.Router();
const Log = require('../models/Log');

// Create a log
router.post('/', async (req, res) => {
  const { user, action } = req.body;
  try {
    const newLog = new Log({ user, action });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create log' });
  }
});

// Get all logs
router.get('/', async (req, res) => {
  try {
    const logs = await Log.find().populate('user', 'username');
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve logs' });
  }
});

module.exports = router;
