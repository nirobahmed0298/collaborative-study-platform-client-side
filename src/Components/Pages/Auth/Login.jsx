import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Login = () => {
    let navigate = useNavigate();
    let { signIn, googleSignIn } = useContext(AuthContext);
    let location = useLocation();
    let axiosPublic = useAxiosPublic();
    let from = location.state?.from?.pathname || '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let handleLogin = e => {
        e.preventDefault();
        signIn(email, password)
            .then(result => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "You Login Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            });
    };

    let handleGoogleLogIn = () => {
        googleSignIn()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photo: result.user?.photoURL,
                    role: 'student'
                };
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "You Login Successfully!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(from, { replace: true });
                    });
            });
    };

    // Autofill function
    const AdminLogin = () => {
        setEmail("nirobahmed0296@gmail.com");
        setPassword("AAAaaa");
    };
    const TutorLogin = () => {
        setEmail("zobayedrahman@gmail.com");
        setPassword("AAAaaa");
    };
    const StudentLogin = () => {
        setEmail("na@gmail.com");
        setPassword("AAAaaa");
    };

    return (
        <div className="md:w-6/12 mx-auto shadow-md mt-20 p-8">
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
                Login
            </h2>
            <form onSubmit={handleLogin}>

                <div className='grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-2 md:justify-between my-3'>
                    {/* Autofill Button */}
                    <button type="button" onClick={AdminLogin} className="btn-xs border border-green-400 mt-2">
                        Admin Login Autofill
                    </button>
                    <button type="button" onClick={TutorLogin} className="btn-xs border border-green-400 mt-2">
                        Tutor Login Autofill
                    </button>
                    <button type="button" onClick={StudentLogin} className="btn-xs border border-green-400 mt-2">
                        Student Login Autofill
                    </button>
                </div>


                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Type here"
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Enter your password"
                    />
                </div>

                {/* Sign In Button */}
                <button className="btn btn-outline w-full">Login</button>
            </form>

            {/* Links */}
            <p className="text-sm text-center mt-4">
                New here?{" "}
                <Link to='/signUp' className="text-primary font-medium">
                    Create a New Account
                </Link>
            </p>
            <div className="divider">Or sign in with</div>

            {/* Social Icons */}
            <div className="flex justify-center gap-4">
                <button onClick={handleGoogleLogIn} className="btn btn-outline">
                    <FaGoogle />
                </button>
                <button className="btn btn-outline">
                    <FaGithub />
                </button>
            </div>
        </div>
    );
};

export default Login;
