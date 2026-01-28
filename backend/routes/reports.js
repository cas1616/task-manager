const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Project = require('../models/Project');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Reporte de tareas
router.get('/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.find();
    const statusCount = {};

    tasks.forEach(task => {
      const status = task.status || 'Pendiente';
      statusCount[status] = (statusCount[status] || 0) + 1;
    });

    res.json(statusCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reporte de proyectos
router.get('/projects', auth, async (req, res) => {
  try {
    const projects = await Project.find();
    const tasks = await Task.find();

    const report = projects.map(project => {
      const count = tasks.filter(t => 
        t.projectId && t.projectId.toString() === project._id.toString()
      ).length;
      return {
        projectName: project.name,
        taskCount: count
      };
    });

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reporte de usuarios
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find();
    const tasks = await Task.find();

    const report = users.map(user => {
      const count = tasks.filter(t => 
        t.assignedTo && t.assignedTo.toString() === user._id.toString()
      ).length;
      return {
        username: user.username,
        taskCount: count
      };
    });

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
