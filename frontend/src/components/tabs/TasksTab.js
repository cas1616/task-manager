import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const TasksTab = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [stats, setStats] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pendiente',
    priority: 'Media',
    projectId: '',
    assignedTo: '',
    dueDate: '',
    estimatedHours: ''
  });

  useEffect(() => {
    loadTasks();
    loadProjects();
    loadUsers();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await api.get('/api/tasks');
      setTasks(response.data);
      updateStats(response.data);
    } catch (error) {
      console.error('Error cargando tareas:', error);
    }
  };

  const loadProjects = async () => {
    try {
      const response = await api.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error cargando proyectos:', error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await api.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    }
  };

  const updateStats = (tasksList) => {
    const total = tasksList.length;
    const completed = tasksList.filter(t => t.status === 'Completada').length;
    const pending = total - completed;
    const highPriority = tasksList.filter(t => 
      t.priority === 'Alta' || t.priority === 'Crítica'
    ).length;
    const now = new Date();
    const overdue = tasksList.filter(t => {
      if (!t.dueDate || t.status === 'Completada') return false;
      return new Date(t.dueDate) < now;
    }).length;

    setStats(
      `Total: ${total} | Completadas: ${completed} | Pendientes: ${pending} | Alta Prioridad: ${highPriority} | Vencidas: ${overdue}`
    );
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const clearForm = () => {
    setFormData({
      title: '',
      description: '',
      status: 'Pendiente',
      priority: 'Media',
      projectId: '',
      assignedTo: '',
      dueDate: '',
      estimatedHours: ''
    });
    setSelectedTask(null);
  };

  const selectTask = (task) => {
    setSelectedTask(task._id);
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      projectId: task.projectId?._id || '',
      assignedTo: task.assignedTo?._id || '',
      dueDate: task.dueDate || '',
      estimatedHours: task.estimatedHours || ''
    });
  };

  const addTask = async () => {
    try {
      if (!formData.title) {
        alert('El título es requerido');
        return;
      }

      const taskData = {
        ...formData,
        projectId: formData.projectId || null,
        assignedTo: formData.assignedTo || null,
        estimatedHours: parseFloat(formData.estimatedHours) || 0
      };

      await api.post('/api/tasks', taskData);
      loadTasks();
      clearForm();
      alert('Tarea agregada');
    } catch (error) {
      alert('Error al agregar tarea: ' + (error.response?.data?.error || error.message));
    }
  };

  const updateTask = async () => {
    try {
      if (!selectedTask) {
        alert('Selecciona una tarea');
        return;
      }

      if (!formData.title) {
        alert('El título es requerido');
        return;
      }

      const taskData = {
        ...formData,
        projectId: formData.projectId || null,
        assignedTo: formData.assignedTo || null,
        estimatedHours: parseFloat(formData.estimatedHours) || 0
      };

      await api.put(`/api/tasks/${selectedTask}`, taskData);
      loadTasks();
      clearForm();
      alert('Tarea actualizada');
    } catch (error) {
      alert('Error al actualizar tarea: ' + (error.response?.data?.error || error.message));
    }
  };

  const deleteTask = async () => {
    try {
      if (!selectedTask) {
        alert('Selecciona una tarea');
        return;
      }

      const task = tasks.find(t => t._id === selectedTask);
      if (!task) return;

      if (window.confirm(`¿Eliminar tarea: ${task.title}?`)) {
        await api.delete(`/api/tasks/${selectedTask}`);
        loadTasks();
        clearForm();
        alert('Tarea eliminada');
      }
    } catch (error) {
      alert('Error al eliminar tarea: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="panel">
      <h2>Gestión de Tareas</h2>

      <div className="form-section">
        <h3>Nueva/Editar Tarea</h3>
        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
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
        <div className="form-group">
          <label>Estado:</label>
          <select name="status" value={formData.status} onChange={handleInputChange}>
            <option>Pendiente</option>
            <option>En Progreso</option>
            <option>Completada</option>
            <option>Bloqueada</option>
            <option>Cancelada</option>
          </select>
        </div>
        <div className="form-group">
          <label>Prioridad:</label>
          <select name="priority" value={formData.priority} onChange={handleInputChange}>
            <option>Baja</option>
            <option>Media</option>
            <option>Alta</option>
            <option>Crítica</option>
          </select>
        </div>
        <div className="form-group">
          <label>Proyecto:</label>
          <select name="projectId" value={formData.projectId} onChange={handleInputChange}>
            <option value="">Sin proyecto</option>
            {projects.map(project => (
              <option key={project._id} value={project._id}>{project.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Asignado a:</label>
          <select name="assignedTo" value={formData.assignedTo} onChange={handleInputChange}>
            <option value="">Sin asignar</option>
            {users.map(u => (
              <option key={u._id} value={u._id}>{u.username}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Fecha Vencimiento:</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Horas Estimadas:</label>
          <input
            type="number"
            name="estimatedHours"
            value={formData.estimatedHours}
            onChange={handleInputChange}
            step="0.5"
          />
        </div>
        <div className="button-group">
          <button onClick={addTask} className="btn-primary">Agregar</button>
          <button onClick={updateTask} className="btn-success">Actualizar</button>
          <button onClick={deleteTask} className="btn-danger">Eliminar</button>
          <button onClick={clearForm} className="btn-secondary">Limpiar</button>
        </div>
      </div>

      <div className="table-section">
        <h3>Lista de Tareas</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Estado</th>
              <th>Prioridad</th>
              <th>Proyecto</th>
              <th>Asignado</th>
              <th>Vencimiento</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task._id} onClick={() => selectTask(task)}>
                <td>{task._id.slice(-6)}</td>
                <td>{task.title}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td>{task.projectId?.name || 'Sin proyecto'}</td>
                <td>{task.assignedTo?.username || 'Sin asignar'}</td>
                <td>{task.dueDate || 'Sin fecha'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="stats">
        <strong>Estadísticas:</strong> {stats}
      </div>
    </div>
  );
};

export default TasksTab;
