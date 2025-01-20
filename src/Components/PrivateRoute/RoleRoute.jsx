import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useRole from '../Hooks/useRole';
import { AuthContext } from '../Provider/AuthProvider';

const RoleRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [role, isRoleLoading] = useRole();
    const location = useLocation();
    if (loading || isRoleLoading) {
        return <div className="h-[90vh] flex justify-center items-center"><progress className="progress w-56"></progress></div>
    }
    if (user && role === "admin") {
        return children;
    }

    if (user && role === "tutor") {
        return children;
    }

    if (user && role === "student") {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;

};

export default RoleRoute;