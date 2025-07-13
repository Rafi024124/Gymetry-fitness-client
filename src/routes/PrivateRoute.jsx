import { useContext } from 'react';

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../contexts/authContext/AuthContext';


const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) return <p>Loading</p>;

  if (user) return children;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
