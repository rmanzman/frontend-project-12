import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authProvider';

const PrivateRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    isLoggedIn
      ? <Outlet />
      : <Navigate to="/login" />
  );
};

export default PrivateRoute;
