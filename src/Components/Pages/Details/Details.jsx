import React, { useContext } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Details = () => {
    let session = useLoaderData()
    let { user } = useContext(AuthContext)
    let axiosSecure = useAxiosSecure()
    let fee = session.RegistrationFee;
    let currentDate = new Date();
    let navigate = useNavigate()
    let handleBooking = () => {
        if (session.RegistrationFee === 'Free') {
            bookSession(session._id);
        } else {
            navigate(`/payment/${session._id}`);
        }
    };
    const bookSession = async () => {
        const payment = {
            email: user.email,
            price: fee,
            date: new Date(),
            session: [
                session
            ],
            status: 'pending'
        }
        const res = await axiosSecure.post('/payments', payment);
        if (res.data?.insertedId) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Your Free Session Booked successfully.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <div className='mt-24 mb-10 min-h-screen'>
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-md">
                <div className='h-[400px]'>
                    <img className='object-cover w-full h-full' src={session?.Image} alt="" />
                </div>
                {/* Title and Tutor Name */}
                <h1 className="text-2xl font-bold my-2">{session.SessionTitle}</h1>
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
                    {session.Reviews && session.Reviews.length > 0 ? (
                        <ul className="pl-5">
                            {session.Reviews.map((review, index) => (
                                <li key={index} className="text-gray-700">
                                    {review}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No reviews available for this session.</p>
                    )}
                </div>

                {/* Booking */}
                <div className="mt-6">
                    {
                        currentDate >= new Date(session.RegistrationStartDate) && currentDate <= new Date(session.RegistrationEndDate)
                            ?
                            <button onClick={handleBooking} className="btn btn-primary px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                                Book Now
                            </button>
                            :
                            <button disabled className="btn btn-primary px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                                Book Now
                            </button>

                    }
                </div>
            </div>
        </div >
    );
};

export default Details;