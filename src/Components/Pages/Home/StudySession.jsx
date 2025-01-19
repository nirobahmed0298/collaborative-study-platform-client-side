import React, { useEffect, useState } from 'react';
import StudySessionCard from './StudySessionCard';
import useSession from '../../Hooks/useSession';
import { Link } from 'react-router-dom';
const StudySession = () => {
    let [sessions] = useSession()
    let currentDate = new Date();
    let session = sessions.slice(0, 6)
    return (
        <div className='my-8'>
            <h1 className='capitalize text-center my-5 font-bold text-xl md:text-4xl'>study session</h1>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                {session.map((session, index) => (
                    <div key={index} className="card bg-base-100 shadow-xl">
                        <figure>
                            <img src={session?.Image} alt='photo' className="w-full h-48 object-cover" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-xl font-bold">{session.SessionTitle}</h2>
                            <p>{session?.SessionDescription}...</p>
                            <div className="mt-2">
                                <span className={`badge border ${currentDate >= new Date(session.RegistrationStartDate) && currentDate <= new Date(session.RegistrationEndDate)
                                    ? "badge-success"
                                    : "badge-error"
                                    }`}>
                                    {
                                        currentDate >= new Date(session.RegistrationStartDate) && currentDate <= new Date(session.RegistrationEndDate) ? 'Ongoing' : 'Closed'
                                    }
                                </span>
                            </div>
                            <div className="card-actions justify-end mt-4">
                                <Link to={`/details/${session._id}`} className="btn btn-outline rounded-none btn-sm">Read More</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudySession;