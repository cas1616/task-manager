import React, { useState } from 'react';
import api from '../../services/api';

const ReportsTab = () => {
  const [reportData, setReportData] = useState('');

  const generateReport = async (type) => {
    try {
      const response = await api.get(`/api/reports/${type}`);
      let text = `=== REPORTE: ${type.toUpperCase()} ===\n\n`;

      if (type === 'tasks') {
        Object.keys(response.data).forEach(status => {
          text += `${status}: ${response.data[status]} tareas\n`;
        });
      } else if (type === 'projects') {
        response.data.forEach(item => {
          text += `${item.projectName}: ${item.taskCount} tareas\n`;
        });
      } else if (type === 'users') {
        response.data.forEach(item => {
          text += `${item.username}: ${item.taskCount} tareas asignadas\n`;
        });
      }

      setReportData(text);
    } catch (error) {
      console.error('Error generando reporte:', error);
      setReportData('Error al generar el reporte');
    }
  };

  const exportCSV = async () => {
    try {
      const tasksResponse = await api.get('/api/tasks');
      const projectsResponse = await api.get('/api/projects');
      const tasks = tasksResponse.data;
      const projects = projectsResponse.data;

      let csv = 'ID,Título,Estado,Prioridad,Proyecto\n';

      tasks.forEach(task => {
        const project = projects.find(p => p._id === task.projectId?._id);
        csv += `${task._id.slice(-6)},"${task.title}","${task.status || 'Pendiente'}","${task.priority || 'Media'}","${project ? project.name : 'Sin proyecto'}"\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'export_tasks.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert('Exportado a export_tasks.csv');
    } catch (error) {
      alert('Error al exportar: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="panel">
      <h2>Generación de Reportes</h2>

      <div className="form-section">
        <div className="button-group">
          <button onClick={() => generateReport('tasks')} className="btn-primary">Reporte de Tareas</button>
          <button onClick={() => generateReport('projects')} className="btn-primary">Reporte de Proyectos</button>
          <button onClick={() => generateReport('users')} className="btn-primary">Reporte de Usuarios</button>
          <button onClick={exportCSV} className="btn-success">Exportar a CSV</button>
        </div>
      </div>

      <div className="text-area-section">
        <textarea
          value={reportData}
          readOnly
          rows="20"
          placeholder="Los reportes aparecerán aquí..."
        />
      </div>
    </div>
  );
};

export default ReportsTab;
