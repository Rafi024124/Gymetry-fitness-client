import React from 'react';
import Navbar from '../pages/shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../pages/shared/Footer';

const TrainerLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default TrainerLayout;