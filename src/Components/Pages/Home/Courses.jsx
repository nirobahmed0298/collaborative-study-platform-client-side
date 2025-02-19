import React from 'react';
import courserImg2 from '../../../assets/courserImg2.webp'
const Courses = () => {
    return (
        <div>
            <h1 className='capitalize text-center my-5 font-bold text-xl md:text-4xl'>Environment
                Courses</h1>
            <div className="flex flex-col lg:flex-row items-center gap-4 md:gap-20 lg:items-start p-2 lg:p-6 bg-white">
                {/* Left Section */}
                <div className="flex-1 text-left">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Best Educational <br /> <span className="text-green-600">Environment</span>
                    </h2>
                    <div className="w-20 h-1 bg-gray-300 my-4"></div>
                    <p className="text-gray-600 mb-4">
                        Our platform fosters a collaborative and engaging learning environment.
                        Connect with students, teachers, and administrators to share resources and optimize study schedules.
                    </p>
                </div>
                {/* Right Section */}
                <div className='' >
                    <img src={courserImg2} alt="Study group" className="rounded-lg shadow-lg w-full object-cover" />
                </div>
            </div>
        </div>

    );
};

export default Courses;