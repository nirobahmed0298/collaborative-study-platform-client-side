import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    let { user, LogOut } = useContext(AuthContext);
    let handleLogOut = () => {
        LogOut()
            .then(() => { })

    }
    let links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/allTutor'>All Tutor</NavLink></li>
        <li><NavLink to='/dashboard'>Dashboard</NavLink></li>

    </>




    return (
        <div className='fixed w-full z-10 top-0 bg-white backdrop-blur-md'>
            <div className="navbar w-11/12 mx-auto ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="mr-1 lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to='/' className="font-bold text-sm md:text-xl">PeerStudy</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="profile"
                                            src={user && user.photoURL} />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li>
                                        <a>Name : {user && user.displayName}</a>
                                    </li>
                                    <li>
                                        <a>Email : {user && user.email.slice(0, 4)}...com</a>
                                    </li>
                                    <li><button onClick={handleLogOut}>Logout<FaSignOutAlt></FaSignOutAlt></button></li>
                                </ul>
                            </div>
                            :
                            <Link to='/login' className="btn btn-outline rounded-none px-8 ">Login</Link>
                    }
                </div>

            </div>
        </div >
    );
};

export default Navbar;