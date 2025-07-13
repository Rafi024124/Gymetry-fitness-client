import React from 'react';
import Navbar from '../pages/shared/Navbar';
import Home from '../pages/home/home';
import Footer from '../pages/shared/Footer';
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return (
        <div>
            <Home></Home>
        </div>
    );
};

export default HomeLayout;