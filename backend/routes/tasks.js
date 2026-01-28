const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const History = require('../models/History');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

// Obtener todas las tareas
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('projectId', 'name')
      .populate('assignedTo', 'username')
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar tareas con filtros
router.post('/search', auth, async (req, res) => {
  try {
    const { searchText, status, priority, projectId } = req.body;
    const query = {};

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (projectId) query.projectId = projectId;
    if (searchText) {
      query.$or = [
        { title: { $regex: searchText, $options: 'i' } },
        { description: { $regex: searchText, $options: 'i' } }
      ];
    }

    const tasks = await Task.find(query)
      .populate('projectId', 'name')
      .populate('assignedTo', 'username')
      .sort({ createdAt: -1 });
    
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear tarea
router.post('/', auth, async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      createdBy: req.user.id
    };

    const task = new Task(taskData);
    await task.save();

    // Agregar al historial
    await History.create({
      taskId: task._id,
      userId: req.user.id,
      action: 'CREATED',
      oldValue: '',
      newValue: task.title
    });

    // Crear notificación si está asignada
    if (task.assignedTo) {
      await Notification.create({
        userId: task.assignedTo,
        message: `Nueva tarea asignada: ${task.title}`,
        type: 'task_assigned'
      });
    }

    const populatedTask = await Task.findById(task._id)
      .populate('projectId', 'name')
      .populate('assignedTo', 'username')
      .populate('createdBy', 'username');

    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar tarea
router.put('/:id', auth, async (req, res) => {
  try {
    const oldTask = await Task.findById(req.params.id);
    if (!oldTask) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('projectId', 'name')
      .populate('assignedTo', 'username')
      .populate('createdBy', 'username');

    // Registrar cambios en historial
    if (oldTask.status !== task.status) {
      await History.create({
        taskId: task._id,
        userId: req.user.id,
        action: 'STATUS_CHANGED',
        oldValue: oldTask.status,
        newValue: task.status
      });
    }

    if (oldTask.title !== task.title) {
      await History.create({
        taskId: task._id,
        userId: req.user.id,
        action: 'TITLE_CHANGED',
        oldValue: oldTask.title,
        newValue: task.title
      });
    }

    // Notificación si está asignada
    if (task.assignedTo) {
      await Notification.create({
        userId: task.assignedTo,
        message: `Tarea actualizada: ${task.title}`,
        type: 'task_updated'
      });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar tarea
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    // Registrar en historial
    await History.create({
      taskId: task._id,
      userId: req.user.id,
      action: 'DELETED',
      oldValue: task.title,
      newValue: ''
    });

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
