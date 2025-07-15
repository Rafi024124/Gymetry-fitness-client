import React from 'react';

import Banner from './banner/Banner';
import FeaturedSection from './featuredSection/FeaturedSection';
import AboutSection from './aboutSection/AboutSection';
import { Outlet } from 'react-router';
import FeaturedClasses from './featuredClasses/FeaturedClasses';
import Reviews from './reviews/Reviews';
import TeamSection from './TeamSection/TeamSection';
import NewsletterSubscribe from './newsLetterSubscriber/NewsLetterSubscriber';
import LatestForumPosts from './latestForums/LatestForumPosts';

const Home = () => {
    return (
        <div>
          
           <Banner></Banner>
           <FeaturedSection></FeaturedSection>
           <FeaturedClasses></FeaturedClasses>
           <AboutSection></AboutSection>
           <Reviews></Reviews>
           <TeamSection></TeamSection>
           <LatestForumPosts></LatestForumPosts>
           <NewsletterSubscribe></NewsletterSubscribe>
           
        </div>
    );
};

export default Home; 