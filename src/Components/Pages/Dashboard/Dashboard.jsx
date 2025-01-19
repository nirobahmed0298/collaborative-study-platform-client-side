import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentDashboard from './StudentDashboard/StudentDashboard';
import useRole from '../../Hooks/useRole';
import TutorDashboard from './TutorDashboard/TutorDashboard';
import AdminDashboard from './AdminDashboard/AdminDashboard';

const Dashboard = () => {
    let [role] = useRole();
    if (role === "student") {
        return <StudentDashboard />;
    } else if (role === "tutor") {
        return <TutorDashboard />;
    } else if (role === "admin") {
        return <AdminDashboard />;
    }
    return <div className='min-h-screen text-center'>Loading...</div>;
};

export default Dashboard;