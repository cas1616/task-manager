import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import TasksTab from './tabs/TasksTab';
import ProjectsTab from './tabs/ProjectsTab';
import CommentsTab from './tabs/CommentsTab';
import HistoryTab from './tabs/HistoryTab';
import NotificationsTab from './tabs/NotificationsTab';
import SearchTab from './tabs/SearchTab';
import ReportsTab from './tabs/ReportsTab';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('tasks');

  const tabs = [
    { id: 'tasks', label: 'Tareas' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'comments', label: 'Comentarios' },
    { id: 'history', label: 'Historial' },
    { id: 'notifications', label: 'Notificaciones' },
    { id: 'search', label: 'Búsqueda' },
    { id: 'reports', label: 'Reportes' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'tasks':
        return <TasksTab />;
      case 'projects':
        return <ProjectsTab />;
      case 'comments':
        return <CommentsTab />;
      case 'history':
        return <HistoryTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'search':
        return <SearchTab />;
      case 'reports':
        return <ReportsTab />;
      default:
        return <TasksTab />;
    }
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="header">
          <span>Usuario: <strong>{user?.username}</strong></span>
          <button onClick={logout} className="btn-secondary">Salir</button>
        </div>

        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tab-content active">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
