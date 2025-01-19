import React from 'react';
import { Link } from 'react-router-dom';

const CardViewBookedSession = ({ session, image, price, tutor }) => {
    return (
        <>
            <div>
                <img src={image} alt="" />
            </div>
            <h3 className="text-lg mt-2 font-semibold text-gray-800">{session.SessionTitle}</h3>
            <p className="text-gray-600">Tutor: {tutor}</p>
            <p className="text-gray-500 mb-4">Price: {price}</p>
            <Link to={`/dashboard/ViewBookedSection/${session._id}`} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600>View Details">View Details</Link>
        </>
    );
};

export default CardViewBookedSession;