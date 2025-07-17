import React from 'react';
import useUserRole from '../../hooks/useUserRole';

import TrainerDashboardHome from './adminAndTrainer/Trainer/DashboardHomeTrainer';
import DashboardHomeUser from './user/DashboardHomeUser';
import DashBoardHomeAdmin from './admin/adminDashboardHome/DashBoardHomeAdmin';


const DashboardHome = () => {

    const { role, roleLoading } = useUserRole();
    return (
        <div>
            {!roleLoading && role === 'admin' && (
            <>
              <DashBoardHomeAdmin></DashBoardHomeAdmin>
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