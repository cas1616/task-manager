const mongoose = require('mongoose');
const User = require('../models/User');
const Project = require('../models/Project');
require('dotenv').config();

const initData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanager');
    console.log('✅ Conectado a MongoDB');

    // Crear usuarios por defecto
    const existingUsers = await User.find();
    if (existingUsers.length === 0) {
      const users = [
        { username: 'admin', password: 'admin' },
        { username: 'user1', password: 'user1' },
        { username: 'user2', password: 'user2' }
      ];

      for (const userData of users) {
        const user = new User(userData);
        await user.save();
      }
      console.log('✅ Usuarios creados');
    }

    // Crear proyectos por defecto
    const existingProjects = await Project.find();
    if (existingProjects.length === 0) {
      const projects = [
        { name: 'Proyecto Demo', description: 'Proyecto de ejemplo' },
        { name: 'Proyecto Alpha', description: 'Proyecto importante' },
        { name: 'Proyecto Beta', description: 'Proyecto secundario' }
      ];

      for (const projectData of projects) {
        const project = new Project(projectData);
        await project.save();
      }
      console.log('✅ Proyectos creados');
    }

    console.log('✅ Datos inicializados correctamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

initData();
