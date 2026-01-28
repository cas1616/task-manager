const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

// Obtener notificaciones del usuario
router.get('/', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener notificaciones no leídas
router.get('/unread', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user.id,
      read: false
    }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Marcar notificaciones como leídas
router.put('/read', auth, async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.user.id, read: false },
      { read: true }
    );
    res.json({ message: 'Notificaciones marcadas como leídas' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
