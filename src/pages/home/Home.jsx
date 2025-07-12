import React from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import Banner from './banner/Banner';
import FeaturedSection from './featuredSection/FeaturedSection';
import AboutSection from './aboutSection/AboutSection';

const Home = () => {
    return (
        <div>
           <Navbar></Navbar>  
           <Banner></Banner>
           <FeaturedSection></FeaturedSection>
           <AboutSection></AboutSection>
           <Footer></Footer>
        </div>
    );
};

export default Home; 