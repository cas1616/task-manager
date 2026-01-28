const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// Obtener todos los proyectos
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear proyecto
router.post('/', auth, async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }

    const project = new Project({ name, description: description || '' });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar proyecto
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description: description || '' },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar proyecto
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.json({ message: 'Proyecto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
