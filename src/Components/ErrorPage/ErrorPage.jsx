import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="error-page-container flex justify-center items-center min-h-screen bg-gradient-to-r from-red-500 via-pink-500 to-red-500">
            <div className="text-center text-white p-6 rounded-lg shadow-lg bg-opacity-80 max-w-lg">
                <h1 className="text-9xl font-extrabold mb-4">404</h1>
                <h2 className="text-3xl font-semibold mb-4">Oops! Page Not Found</h2>
                <p className="text-lg mb-6">
                    We can't seem to find the page you're looking for.
                </p>
                <Link to={'/'}
                    className="bg-white text-black hover:bg-gray-100 py-2 px-6 rounded-lg font-semibold transition duration-300"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;