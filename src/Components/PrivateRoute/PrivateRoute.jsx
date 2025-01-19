import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    let { user, loading } = useContext(AuthContext);
    if (loading) {
        return <div className='min-h-screen flex justify-center items-center'><span className="loading loading-spinner text-success loading-lg"></span></div>;
    }
    if (user && user.email) {
        return children;
    }
    return (
        <Navigate state={location.pathname} to='/login'></Navigate>
    );
};

export default PrivateRoute;