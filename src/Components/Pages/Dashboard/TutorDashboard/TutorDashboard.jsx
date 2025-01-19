import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useRole from '../../../Hooks/useRole';
import { TbLayoutDashboardFilled } from 'react-icons/tb';
import { FaCloudUploadAlt, FaHome } from 'react-icons/fa';
import { IoCreateSharp } from 'react-icons/io5';
import { MdGridView } from 'react-icons/md';
import { GrView } from 'react-icons/gr';

const TutorDashboard = () => {
    let [role,] = useRole();
    return (
        <>
            <Helmet>
                <title>Tutor Dashboard | Peer Study</title>
            </Helmet>

            <div className='mt-24'>
                <div className="min-h-screen bg-gray-100 md:flex w-full md:w-11/12 mx-auto">
                    <div className="md:w-1/4 bg-white shadow-md min-h-screen p-5">
                        <h1 className="text-2xl font-bold mb-6 text-blue-600">Peer Study</h1>
                        <p className="text-gray-600 mb-8">You are <span className="font-bold capitalize">{role}</span></p>
                        <ul className="space-y-4">
                            <li>
                                <NavLink to='/dashboard/createStudy'
                                    className="flex items-center text-gray-700 hover:text-blue-500 transition font-medium"
                                >
                                    <span><IoCreateSharp></IoCreateSharp></span>
                                    <span className="ml-2">Create study session</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/viewAllStudy'
                                    className="flex items-center text-gray-700 hover:text-blue-500 transition font-medium"
                                >
                                    <span><MdGridView></MdGridView></span>
                                    <span className="ml-2">View all study</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/updateMaterials'
                                    className="flex items-center text-gray-700 hover:text-blue-500 transition font-medium"
                                >
                                    <span><FaCloudUploadAlt></FaCloudUploadAlt></span>
                                    <span className="ml-2">Upload materials                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/TutorAllMaterials'
                                    className="flex items-center text-gray-700 hover:text-blue-500 transition font-medium"
                                >
                                    <span><GrView></GrView></span>
                                    <span className="ml-2">View all materials</span>
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
                    <div className="w-full md:w-3/4 md:p-10">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </>

    );
};

export default TutorDashboard;