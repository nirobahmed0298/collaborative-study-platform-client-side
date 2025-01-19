import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ViewBookedDetails = () => {
    let session = useLoaderData();
    let { user } = useContext(AuthContext);
    let axiosSecure = useAxiosSecure();
    let handleReview = (e) => {
        e.preventDefault()
        let name = e.target.name.value
        let email = e.target.email.value
        let review = e.target.review.value
        let rating = e.target.rating.value
        let reviews = { name: name, email: email, review: review, rating: rating };
        let res = axiosSecure.post('/reviews', reviews)
            .then(res => {
                e.target.reset()
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your Review Added SuccessFully..!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-md">
            <div>
                <img className='w-full' src={session?.Image} alt="" />
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

            <div className="divider"></div>

            <div className="w-full mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Please Provide Your <span className="text-blue-500">Review & Rating</span>
                </h1>
                <p className="text-gray-700 text-center mb-6">
                    Feeling overwhelmed by upcoming exams and projects? This guide is here to help!
                    Easily view and manage all your booked study sessions to stay on top of your academic commitments.
                </p>
                <form onSubmit={handleReview} className="space-y-4">
                    <div>
                        <label className="block font-medium text-gray-700" >
                            Student Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name='name'
                            className="input input-bordered w-full"
                            placeholder="Enter your name"
                            readOnly
                            defaultValue={user?.displayName}
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700" htmlFor="email">
                            Student Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            className="input input-bordered w-full"
                            placeholder="Enter your email"
                            readOnly
                            defaultValue={user?.email}
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700" htmlFor="review">
                            Your Review
                        </label>
                        <textarea
                            id="review"
                            name='review'
                            className="textarea textarea-bordered w-full"
                            placeholder="Write your review..."
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700" htmlFor="rating">
                            Your Rating
                        </label>
                        <input
                            type="number"
                            id="rating"
                            name='rating'
                            className="input input-bordered w-full"
                            placeholder="Enter Rating"
                            required
                        />
                    </div>
                    <button className="btn bg-[#3B82F6] text-white w-full">Submit Review</button>
                </form>
            </div>
        </div>
    );
};

export default ViewBookedDetails;