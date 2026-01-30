import React, { useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const CommentsTab = () => {
  const { user } = useAuth();
  const [taskId, setTaskId] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  const loadComments = async () => {
    const trimmedTaskId = taskId.trim();
    if (!trimmedTaskId) {
      setComments([]);
      return;
    }

    if (!/^[0-9a-fA-F]{24}$/.test(trimmedTaskId)) {
      alert('El ID de tarea debe ser un ObjectId válido (24 caracteres hex).');
      setComments([]);
      return;
    }

    try {
      const response = await api.get(`/api/comments/task/${trimmedTaskId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error cargando comentarios:', error);
      setComments([]);
    }
  };

  const addComment = async () => {
    const trimmedTaskId = taskId.trim();
    if (!trimmedTaskId) {
      alert('ID de tarea requerido');
      return;
    }

    if (!/^[0-9a-fA-F]{24}$/.test(trimmedTaskId)) {
      alert('El ID de tarea debe ser un ObjectId válido (24 caracteres hex).');
      return;
    }

    if (!commentText) {
      alert('El comentario no puede estar vacío');
      return;
    }

    try {
      await api.post('/api/comments', { taskId: trimmedTaskId, commentText });
      setCommentText('');
      loadComments();
      alert('Comentario agregado');
    } catch (error) {
      alert('Error al agregar comentario: ' + (error.response?.data?.error || error.message));
    }
  };

  const formatComments = () => {
    const trimmedTaskId = taskId.trim();
    if (!trimmedTaskId) return 'Ingresa un ID de tarea';
    if (!/^[0-9a-fA-F]{24}$/.test(trimmedTaskId)) {
      return 'El ID de tarea debe ser un ObjectId válido (24 caracteres hex).';
    }
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
