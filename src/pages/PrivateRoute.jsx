import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Временно установим isAuthenticated в true для тестирования интерфейса
  const isAuthenticated = true; // !!localStorage.getItem('token');

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;