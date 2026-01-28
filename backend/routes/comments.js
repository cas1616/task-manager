const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

// Obtener comentarios de una tarea
router.get('/task/:taskId', auth, async (req, res) => {
  try {
    const comments = await Comment.find({ taskId: req.params.taskId })
      .populate('userId', 'username')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear comentario
router.post('/', auth, async (req, res) => {
  try {
    const { taskId, commentText } = req.body;

    if (!taskId || !commentText) {
      return res.status(400).json({ error: 'ID de tarea y comentario requeridos' });
    }

    const comment = new Comment({
      taskId,
      userId: req.user.id,
      commentText
    });

    await comment.save();
    const populatedComment = await Comment.findById(comment._id)
      .populate('userId', 'username');

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
