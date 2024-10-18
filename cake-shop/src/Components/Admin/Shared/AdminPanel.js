// src/Components/Admin/AdminPanel.js
import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
