import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { userLoggedIn } = useSelector((state) => state.auth);
  return userLoggedIn ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
