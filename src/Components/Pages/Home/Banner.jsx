import React from 'react';
import banner from '../../../assets/Home-Banner.png';
import { Link } from 'react-router-dom';
const Banner = () => {
    return (
        <div
            className="hero min-h-screen mt-16"
            style={{
                backgroundImage: `url(${banner})`,
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-2xl md:text-5xl font-bold">Collaborative Study </h1>
                    <p className="mb-5 text-[14px] opacity-60">
                        Connect, share resources, and collaborate with fellow students to achieve academic success. Join the Collaborative Study Hub today for effective and engaging learning!
                    </p>
                    <Link to={`/allTutor`} className="btn btn-outline border text-white rounded-none">Get Started</Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;