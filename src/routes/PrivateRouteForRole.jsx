// utils/PrivateRouteForRole.jsx
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../contexts/authContext/AuthContext';
import useUserRole from '../hooks/useUserRole';
import Loaging from '../loagind/Loaging';




const PrivateRouteForRole = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) return <Loaging />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRouteForRole;
