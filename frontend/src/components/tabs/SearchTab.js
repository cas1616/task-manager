import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const SearchTab = () => {
  const [projects, setProjects] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({
    searchText: '',
    status: '',
    priority: '',
    projectId: ''
  });

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

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const searchTasks = async () => {
    try {
      const response = await api.post('/api/tasks/search', filters);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error buscando tareas:', error);
      setSearchResults([]);
    }
  };

  return (
    <div className="panel">
      <h2>Búsqueda Avanzada</h2>

      <div className="form-section">
        <div className="form-group">
          <label>Texto:</label>
          <input
            type="text"
            name="searchText"
            value={filters.searchText}
            onChange={handleFilterChange}
            placeholder="Buscar en título o descripción"
          />
        </div>
        <div className="form-group">
          <label>Estado:</label>
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">Todos</option>
            <option>Pendiente</option>
            <option>En Progreso</option>
            <option>Completada</option>
          </select>
        </div>
        <div className="form-group">
          <label>Prioridad:</label>
          <select name="priority" value={filters.priority} onChange={handleFilterChange}>
            <option value="">Todas</option>
            <option>Baja</option>
            <option>Media</option>
            <option>Alta</option>
            <option>Crítica</option>
          </select>
        </div>
        <div className="form-group">
          <label>Proyecto:</label>
          <select name="projectId" value={filters.projectId} onChange={handleFilterChange}>
            <option value="">Todos</option>
            {projects.map(project => (
              <option key={project._id} value={project._id}>{project.name}</option>
            ))}
          </select>
        </div>
        <div className="button-group">
          <button onClick={searchTasks} className="btn-primary">Buscar</button>
        </div>
      </div>

      <div className="table-section">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Estado</th>
              <th>Prioridad</th>
              <th>Proyecto</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map(task => (
              <tr key={task._id}>
                <td>{task._id.slice(-6)}</td>
                <td>{task.title}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td>{task.projectId?.name || 'Sin proyecto'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchTab;
