import React from 'react';
import useUserRole from '../../hooks/useUserRole';
import AdminDashboardHome from './admin/adminDashboardHome/AdminDashBoardHome';
import TrainerDashboardHome from './adminAndTrainer/Trainer/DashboardHomeTrainer';
import DashboardHomeUser from './user/DashboardHomeUser';

const DashboardHome = () => {

    const { role, roleLoading } = useUserRole();
    return (
        <div>
            {!roleLoading && role === 'admin' && (
            <>
              <AdminDashboardHome></AdminDashboardHome>
            </>
          )}
            {!roleLoading && role === 'trainer' && (
            <>
              <TrainerDashboardHome></TrainerDashboardHome>
            </>
          )}
            {!roleLoading && role === 'user' && (
            <>
              <DashboardHomeUser></DashboardHomeUser>
            </>
          )}
          
          

        </div>
    );
};

export default DashboardHome;