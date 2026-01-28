import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ProjectsTab = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await api.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error cargando proyectos:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const selectProject = (project) => {
    setSelectedProject(project._id);
    setFormData({
      name: project.name,
      description: project.description || ''
    });
  };

  const addProject = async () => {
    try {
      if (!formData.name) {
        alert('El nombre es requerido');
        return;
      }

      await api.post('/api/projects', formData);
      loadProjects();
      setFormData({ name: '', description: '' });
      setSelectedProject(null);
      alert('Proyecto agregado');
    } catch (error) {
      alert('Error al agregar proyecto: ' + (error.response?.data?.error || error.message));
    }
  };

  const updateProject = async () => {
    try {
      if (!selectedProject) {
        alert('Selecciona un proyecto');
        return;
      }

      if (!formData.name) {
        alert('El nombre es requerido');
        return;
      }

      await api.put(`/api/projects/${selectedProject}`, formData);
      loadProjects();
      setFormData({ name: '', description: '' });
      setSelectedProject(null);
      alert('Proyecto actualizado');
    } catch (error) {
      alert('Error al actualizar proyecto: ' + (error.response?.data?.error || error.message));
    }
  };

  const deleteProject = async () => {
    try {
      if (!selectedProject) {
        alert('Selecciona un proyecto');
        return;
      }

      const project = projects.find(p => p._id === selectedProject);
      if (!project) return;

      if (window.confirm(`¿Eliminar proyecto: ${project.name}?`)) {
        await api.delete(`/api/projects/${selectedProject}`);
        loadProjects();
        setFormData({ name: '', description: '' });
        setSelectedProject(null);
        alert('Proyecto eliminado');
      }
    } catch (error) {
      alert('Error al eliminar proyecto: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="panel">
      <h2>Gestión de Proyectos</h2>

      <div className="form-section">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
          />
        </div>
        <div className="button-group">
          <button onClick={addProject} className="btn-primary">Agregar</button>
          <button onClick={updateProject} className="btn-success">Actualizar</button>
          <button onClick={deleteProject} className="btn-danger">Eliminar</button>
        </div>
      </div>

      <div className="table-section">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project._id} onClick={() => selectProject(project)}>
                <td>{project._id.slice(-6)}</td>
                <td>{project.name}</td>
                <td>{project.description || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsTab;
