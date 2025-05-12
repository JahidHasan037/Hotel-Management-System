import React from 'react';
import Faq from '../faq-page/Faq';
import Banner from './Banner';
import FeaturedMeals from './FeaturedMeals';
import Membership from './member-ship-section/Membership';
import FeedBack from './feedback/FeedBack';
import TeamSection from './our team/TeamSection';
import Testimonials from './testimonials section/Testimonials';

const Home = () => {
    return (
        <div>
            {/* <h2 className="text-5xl">My Homecoming is coming</h2> */}
            <Banner />
            <div className='w-[92vw] mx-auto space-y-12 lg:space-y-16'>
                <FeaturedMeals />
                <TeamSection />
                <Testimonials />
                <Membership />
                <Faq />
                <FeedBack />
            </div>
        </div>
    );
};

export default Home;