import React from 'react';
import Banner from './Banner';
import StudySession from './StudySession';
import { Helmet } from 'react-helmet-async';
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
                </div>
            </div>
        </>
    );
};

export default Home;