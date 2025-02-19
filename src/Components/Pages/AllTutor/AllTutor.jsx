import React, { useState } from 'react';
import useSession from '../../Hooks/useSession';
import StudySessionCard from '../Home/StudySessionCard';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const AllTutor = () => {
    let [sessions, loading] = useSession();
    let [currentPage, setCurrentPage] = useState(1);
    let [sessionsPerPage] = useState(9);

    let indexOfLastSession = currentPage * sessionsPerPage;
    let indexOfFirstSession = indexOfLastSession - sessionsPerPage;
    let currentSessions = sessions.slice(indexOfFirstSession, indexOfLastSession);
    let totalPages = Math.ceil(sessions.length / sessionsPerPage);

    let handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <>
            <Helmet>
                <title>All Tutor | Peer Study</title>
            </Helmet>
            <div className='mt-24 min-h-screen w-11/12 mx-auto'>
                <h1 className='capitalize text-center my-5 font-bold text-xl md:text-4xl'>All Tutor</h1>

                {/* Loading Spinner */}
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <span className="loading loading-spinner text-green-600 loading-lg"></span>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            <StudySessionCard currentSessions={currentSessions}></StudySessionCard>
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex items-center justify-center mt-6">
                            <button
                                className='btn rounded-none'
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <FaArrowCircleLeft />
                            </button>
                            <span className="mx-2 text-lg">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                className='btn rounded-none'
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <FaArrowCircleRight />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default AllTutor;
