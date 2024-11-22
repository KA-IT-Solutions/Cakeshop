// // src/Components/Admin/AdminPanel.js
// import React from 'react';
// import Sidebar from './Sidebar';
// import { Outlet } from 'react-router-dom';
// import './AdminPanel.css'

// const AdminPanel = () => {
//   return (
//     <div className="admin-container">
//       <Sidebar />
//       <div className="admin-content">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;
// src/Components/Admin/AdminPanel.js
import React from 'react';
import Sidebar from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
// import './AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    // Remove the auth token from localStorage
    localStorage.removeItem('authToken');
    
    // Redirect to login page
    navigate('/admin/login');
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h2></h2>
          <button className="logout-btn" onClick={handleLogout}></button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
