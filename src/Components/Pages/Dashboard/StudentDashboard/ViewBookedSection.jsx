import React, { useEffect, useState } from 'react';
import useBookedSession from '../../../Hooks/useBookedSession';
import CardViewBookedSession from './CardViewBookedSession';

const ViewBookedSection = () => {
    let [bookedSession, isLoading, refetch] = useBookedSession();
    return (
        <>
            {
                bookedSession?.length === 0 ? <div className='text-red-500 text-xl  text-center'>Booked Session not available, Please Booked</div>
                    :
                    <div className="p-2">
                        <h2 className="text-xl text-center md:text-2xl font-bold mb-4">Your Booked Sessions</h2>
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            {bookedSession.map((sessionData) => (
                                <div key={sessionData._id} className="bg-white shadow-lg rounded-lg p-4 w-full">
                                    {sessionData?.session?.map((session) => (
                                        <CardViewBookedSession
                                            key={session._id}
                                            session={session}
                                            date={sessionData.date}
                                            status={sessionData.status}
                                            price={sessionData.price}
                                            tutor={session.TutorName}
                                            image={session?.Image}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
            }
        </>
    );
};

export default ViewBookedSection;