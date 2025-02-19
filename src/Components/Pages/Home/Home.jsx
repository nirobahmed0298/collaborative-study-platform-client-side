import React from 'react';
import Banner from './Banner';
import StudySession from './StudySession';
import { Helmet } from 'react-helmet-async';
import Courses from './Courses';
import UpcomingEvents from './UpcomingEvents';
import Faqs from './Faqs';
import FeaturedTeachers from './FeaturedTeachers';
import Testimonials from './Testimonials';
const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home | Peer Study</title>
            </Helmet>
            <div>
                <Banner></Banner>
                <div className='w-11/12 mx-auto'>
                    <StudySession></StudySession>
                    <FeaturedTeachers></FeaturedTeachers>
                    <Courses></Courses>
                    <UpcomingEvents></UpcomingEvents>
                    <Testimonials></Testimonials>
                    <Faqs></Faqs>
                </div>
            </div>
        </>
    );
};

export default Home;