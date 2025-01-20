import React from 'react';
import useSession from '../../../Hooks/useSession';
import { Link } from 'react-router-dom';
const ViewAllStudy = () => {
    let [sessions] = useSession();
    let currentDate = new Date();
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Study Sessions</h1>
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 '>
                {
                    sessions.map((session, index) =>
                        <div key={index} className="max-w-3xl mx-auto p-2 bg-white shadow-lg rounded-md">
                            <div className='h-[150px]'>
                                <img className='object-cover w-full h-full' src={session.Image} alt="" />
                            </div>
                            {/* Title and Tutor Name */}
                            <h1 className="text-2xl font-bold mb-2">{session.SessionTitle}</h1>
                            <p className="text-gray-700 mb-4">
                                <strong>Tutor:</strong> {session.TutorName}
                            </p>

                            {/* Average Rating */}
                            <div className="mb-4">
                                <span className="font-medium">Average Rating:</span>{" "}
                                <span className="text-yellow-500">{session.AverageRating}<div className="rating rating-xs">     <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500 ml-1" /></div>
                                </span>
                            </div>

                            {/* Session Description */}
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold mb-2">Session Description:</h2>
                                <p className="text-gray-700">{session.SessionDescription}</p>
                            </div>

                            {/* Key Dates */}
                            <div className="mb-4">
                                <p>
                                    <strong>Registration Start Date:</strong>{" "}
                                    {session.RegistrationStartDate}
                                </p>
                                <p>
                                    <strong>Registration End Date:</strong>{" "}
                                    {session.RegistrationEndDate}
                                </p>
                                <p>
                                    <strong>Class Start Time:</strong>{" "}
                                    {session.ClassStartTime}
                                </p>
                                <p>
                                    <strong>Class End Date:</strong>{" "}
                                    {session.ClassEndDate}
                                </p>
                                <p>
                                    <strong>Session Duration:</strong> {session.SessionDuration}
                                </p>
                            </div>

                            {/* Registration Fee */}
                            <div className="mb-4">
                                <strong>Registration Fee:</strong>{" "}
                                $ {session.RegistrationFee}
                            </div>
                            {/* Reviews */}
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold mb-2">Student Reviews:</h2>
                                {session?.Reviews && session?.Reviews.length > 0 ? (
                                    <ul className="pl-5">
                                        {session?.Reviews.map((review, index) => (
                                            <li key={index} className="text-gray-700">
                                                {review}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No reviews available for this session.</p>
                                )}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ViewAllStudy;