import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Login = () => {
    let navigate = useNavigate()
    let { user, signIn, googleSignIn } = useContext(AuthContext)
    let location = useLocation();
    let axiosPublic = useAxiosPublic()
    let from = location.state?.from?.pathname || '/'
    let handleLogin = e => {
        e.preventDefault()
        let email = e.target.email.value;
        let password = e.target.password.value;
        signIn(email, password)
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "You Login SuccessFully..!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            })

    }
    let handleGoogleLogIn = () => {
        googleSignIn()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photo: result.user?.photoURL,
                    role: 'student'
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "You Login SuccessFully..!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(from, { replace: true });

                    })
            })
    }
    return (
        <div className="md:w-6/12 mx-auto shadow-md mt-20 p-8">
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
                Login
            </h2>
            <form onSubmit={handleLogin}>
                {/* Email */}
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name='email'
                        className="input input-bordered w-full"
                        placeholder="Type here"
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name='password'
                        id="password"
                        className="input input-bordered w-full"
                        placeholder="Enter your password"
                    />
                </div>


                {/* Sign In Button */}
                <button disabled={false} className="btn btn-outline w-full">Login</button>
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
                    <FaGoogle></FaGoogle>
                </button>
                <button className="btn btn-outline">
                    <FaGithub></FaGithub>
                </button>
            </div>
        </div>
    );
};

export default Login;