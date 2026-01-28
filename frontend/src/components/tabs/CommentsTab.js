import React, { useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const CommentsTab = () => {
  const { user } = useAuth();
  const [taskId, setTaskId] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  const loadComments = async () => {
    if (!taskId) {
      setComments([]);
      return;
    }

    try {
      const response = await api.get(`/api/comments/task/${taskId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error cargando comentarios:', error);
      setComments([]);
    }
  };

  const addComment = async () => {
    if (!taskId) {
      alert('ID de tarea requerido');
      return;
    }

    if (!commentText) {
      alert('El comentario no puede estar vacío');
      return;
    }

    try {
      await api.post('/api/comments', { taskId, commentText });
      setCommentText('');
      loadComments();
      alert('Comentario agregado');
    } catch (error) {
      alert('Error al agregar comentario: ' + (error.response?.data?.error || error.message));
    }
  };

  const formatComments = () => {
    if (!taskId) return 'Ingresa un ID de tarea';
    if (comments.length === 0) return 'No hay comentarios';

    return comments.map(comment => {
      const date = new Date(comment.createdAt).toLocaleString('es-ES');
      return `[${date}] ${comment.userId?.username || 'Usuario'}: ${comment.commentText}\n---\n`;
    }).join('');
  };

  return (
    <div className="panel">
      <h2>Comentarios de Tareas</h2>

      <div className="form-section">
        <div className="form-group">
          <label>ID Tarea:</label>
          <input
            type="text"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
            placeholder="ID de la tarea"
          />
        </div>
        <div className="form-group">
          <label>Comentario:</label>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows="3"
          />
        </div>
        <div className="button-group">
          <button onClick={addComment} className="btn-primary">Agregar Comentario</button>
          <button onClick={loadComments} className="btn-secondary">Cargar Comentarios</button>
        </div>
      </div>

      <div className="text-area-section">
        <h3>Comentarios</h3>
        <textarea
          value={formatComments()}
          readOnly
          rows="15"
        />
      </div>
    </div>
  );
};

export default CommentsTab;
