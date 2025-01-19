import React from 'react';
import CheckOutForm from './CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLoaderData } from 'react-router-dom';
let stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const BookedSession = () => {
    let session = useLoaderData()
    return (
        <div className='mt-24 md:w-8/12 mx-auto'>
            <h1 className='text-center text-xl md:text-3xl'>payment</h1>
            <div className='my-4 px-4 md:px-1'>
                <h1 className='text-2xl'>payment Details :</h1>
                <p className='text-lg'>Session Title : {session.SessionTitle}</p>
                <p className='text-lg'>Average Rating : {session.AverageRating}  <span className="text-yellow-500">★</span></p>

                <p className='text-lg'>Registration Fee : $ {session.RegistrationFee}</p>
            </div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm session={session}></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default BookedSession;