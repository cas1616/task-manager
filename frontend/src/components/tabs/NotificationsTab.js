import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await api.get('/api/notifications/unread');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error cargando notificaciones:', error);
    }
  };

  const markAsRead = async () => {
    try {
      await api.put('/api/notifications/read');
      loadNotifications();
      alert('Notificaciones marcadas como leídas');
    } catch (error) {
      alert('Error al marcar notificaciones: ' + (error.response?.data?.error || error.message));
    }
  };

  const formatNotifications = () => {
    if (notifications.length === 0) return 'No hay notificaciones nuevas';

    return notifications.map(notif => {
      const date = new Date(notif.createdAt).toLocaleString('es-ES');
      return `• [${notif.type}] ${notif.message} (${date})\n`;
    }).join('');
  };

  return (
    <div className="panel">
      <h2>Notificaciones</h2>

      <div className="form-section">
        <div className="button-group">
          <button onClick={loadNotifications} className="btn-primary">Cargar Notificaciones</button>
          <button onClick={markAsRead} className="btn-secondary">Marcar como Leídas</button>
        </div>
      </div>

      <div className="text-area-section">
        <textarea
          value={formatNotifications()}
          readOnly
          rows="20"
        />
      </div>
    </div>
  );
};

export default NotificationsTab;
