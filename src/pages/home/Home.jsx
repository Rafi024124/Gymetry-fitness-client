import React from 'react';

import Banner from './banner/Banner';
import FeaturedSection from './featuredSection/FeaturedSection';
import AboutSection from './aboutSection/AboutSection';
import { Outlet } from 'react-router';

const Home = () => {
    return (
        <div>
          
           <Banner></Banner>
           <FeaturedSection></FeaturedSection>
           <AboutSection></AboutSection>
           
        </div>
    );
};

export default Home; 