const express = require('express');
const router = express.Router();
const History = require('../models/History');
const auth = require('../middleware/auth');

// Obtener historial de una tarea
router.get('/task/:taskId', auth, async (req, res) => {
  try {
    const history = await History.find({ taskId: req.params.taskId })
      .populate('userId', 'username')
      .sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todo el historial
router.get('/all', auth, async (req, res) => {
  try {
    const history = await History.find()
      .populate('userId', 'username')
      .populate('taskId', 'title')
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
