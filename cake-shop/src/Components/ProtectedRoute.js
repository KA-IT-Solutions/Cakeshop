// // frontend/src/components/ProtectedRoute.js
// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = () => {
//   const authToken = localStorage.getItem('authToken');
//   return authToken ? <Outlet /> : <Navigate to="/admin-login" />;
// };

// export default ProtectedRoute;


// src/Components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// ProtectedRoute component checks for the token
const ProtectedRoute = () => {
  const token = localStorage.getItem('authToken'); // Get token from localStorage

  // If no token is found, redirect to login page
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // If token exists, render the child routes (admin panel)
  return <Outlet />;
};

export default ProtectedRoute;
