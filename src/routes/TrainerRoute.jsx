import React, { Children, useContext } from 'react';

import { Navigate } from 'react-router';
import { AuthContext } from '../contexts/authContext/AuthContext';
import useUserRole from '../hooks/useUserRole';

const TrainerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (!user || role !== 'trainer') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default TrainerRoute;