import React, { useState } from 'react';
import api from '../../services/api';

const HistoryTab = () => {
  const [taskId, setTaskId] = useState('');
  const [history, setHistory] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const loadHistory = async () => {
    if (!taskId) {
      setHistory([]);
      return;
    }

    try {
      const response = await api.get(`/api/history/task/${taskId}`);
      setHistory(response.data);
    } catch (error) {
      console.error('Error cargando historial:', error);
      setHistory([]);
    }
  };

  const loadAllHistory = async () => {
    try {
      const response = await api.get('/api/history/all');
      setHistory(response.data);
      setShowAll(true);
    } catch (error) {
      console.error('Error cargando historial:', error);
      setHistory([]);
    }
  };

  const formatHistory = () => {
    if (showAll) {
      if (history.length === 0) return 'No hay historial';
      return history.map(entry => {
        const date = new Date(entry.createdAt).toLocaleString('es-ES');
        return `Tarea #${entry.taskId?.title || entry.taskId?._id?.slice(-6) || 'N/A'} - ${entry.action} - ${date}\n  Usuario: ${entry.userId?.username || 'Desconocido'}\n  Antes: ${entry.oldValue || '(vacío)'}\n  Después: ${entry.newValue || '(vacío)'}\n---\n`;
      }).join('');
    } else {
      if (!taskId) return 'Ingresa un ID de tarea';
      if (history.length === 0) return 'No hay historial';
      return history.map(entry => {
        const date = new Date(entry.createdAt).toLocaleString('es-ES');
        return `${date} - ${entry.action}\n  Usuario: ${entry.userId?.username || 'Desconocido'}\n  Antes: ${entry.oldValue || '(vacío)'}\n  Después: ${entry.newValue || '(vacío)'}\n---\n`;
      }).join('');
    }
  };

  return (
    <div className="panel">
      <h2>Historial de Cambios</h2>

      <div className="form-section">
        <div className="form-group">
          <label>ID Tarea:</label>
          <input
            type="text"
            value={taskId}
            onChange={(e) => {
              setTaskId(e.target.value);
              setShowAll(false);
            }}
            placeholder="ID de la tarea"
          />
        </div>
        <div className="button-group">
          <button onClick={loadHistory} className="btn-primary">Cargar Historial</button>
          <button onClick={loadAllHistory} className="btn-secondary">Cargar Todo el Historial</button>
        </div>
      </div>

      <div className="text-area-section">
        <textarea
          value={formatHistory()}
          readOnly
          rows="20"
        />
      </div>
    </div>
  );
};

export default HistoryTab;
