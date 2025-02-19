import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useRole from '../../../Hooks/useRole';
import { Helmet } from 'react-helmet-async';
import { FaBook, FaHome } from 'react-icons/fa';
import { MdNoteAlt } from 'react-icons/md';
import { RiGalleryView2, RiStickyNoteAddLine } from 'react-icons/ri';
import { TbLayoutDashboardFilled } from 'react-icons/tb';
import { AuthContext } from '../../../Provider/AuthProvider';

const StudentDashboard = () => {
    let [role,] = useRole();
    let { user } = useContext(AuthContext);
    return (
        <>
            <Helmet>
                <title>Student Dashboard | Peer Study</title>
            </Helmet>

            <div className='mt-24'>
                <div className="min-h-screen fixed h-screen bg-gray-100 md:flex w-full md:w-11/12 mx-auto">
                    <div className="md:w-1/4 bg-white shadow-md min-h-screen p-5">
                        <h1 className="text-2xl font-bold mb-6 text-blue-600">Peer Study</h1>
                        <p className="text-gray-600 mb-8">You are <span className="font-bold capitalize">{role}</span></p>
                        <ul className="space-y-4">
                            <li>
                                <NavLink to='/dashboard/ViewBookedSection'
                                    className="flex items-center text-gray-700 hover:text-blue-500 transition font-medium"
                                >
                                    <span><FaBook></FaBook></span>
                                    <span className="ml-2">View Booked Session</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/createNote'
                                    className="flex items-center text-gray-700 hover:text-blue-500 transition font-medium"
                                >
                                    <span><MdNoteAlt></MdNoteAlt></span>
                                    <span className="ml-2">Create Note</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/manageNote'
                                    className="flex items-center text-gray-700 hover:text-blue-500 transition font-medium"
                                >
                                    <span><RiStickyNoteAddLine></RiStickyNoteAddLine></span>
                                    <span className="ml-2">Manage Personal Notes</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/allMaterials'
                                    className="flex items-center text-gray-700 hover:text-blue-500 transition font-medium"
                                >
                                    <span><RiGalleryView2></RiGalleryView2></span>
                                    <span className="ml-2">View All Study Materials</span>
                                </NavLink>
                            </li>
                            <div className='divider'></div>
                            <li>
                                <NavLink to='/dashboard'
                                    className="flex items-center text-gray-700 hover:text-blue-500 transition font-medium"
                                >
                                    <span><TbLayoutDashboardFilled></TbLayoutDashboardFilled></span>
                                    <span className="ml-2">Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/'
                                    className="flex items-center text-gray-700 hover:text-blue-500 transition font-medium"
                                >
                                    <span><FaHome></FaHome></span>
                                    <span className="ml-2">Home</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full overflow-y-auto md:w-3/4 md:p-10">
                        <section className="py-10 px-6 rounded-xl text-center w-full">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Welcome Back, <span>{user.displayName}</span> 👋</h1>
                                <p className="text-gray-600 mt-1">Here’s what’s happening today on your dashboard.</p>
                            </div>
                        </section>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </>

    );
};

export default StudentDashboard;