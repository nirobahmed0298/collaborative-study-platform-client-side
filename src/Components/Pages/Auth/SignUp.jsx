import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const SignUp = () => {
    let { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext)
    let navigate = useNavigate();
    let axiosPublic = useAxiosPublic()
    let from = location.state?.from?.pathname || '/'
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                updateUserProfile(data.name, data.photoUrl)
                    .then(() => {
                        reset();
                        axiosPublic.post('/users', {
                            name: data.name,
                            email: data.email,
                            photo: data.photoUrl,
                            role: data.role,
                        })
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "You SignUp SuccessFully..!",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate(from, { replace: true });
                                }
                            })
                    })

            })

    }

    let handleGoogleSingIn = () => {
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
                    })
                navigate(from, { replace: true });

            })
    }

    return (
        <div className="md:w-6/12 mx-auto p-8 shadow-md mt-20">
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
                Sign Up
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name */}
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        {...register("name", { required: true })}
                        id="email"
                        className="input input-bordered w-full"
                        placeholder="Type here"
                    />
                    {errors.name?.type === "required" && (
                        <p role="alert" className='text-red-500'>Name is required</p>
                    )}
                </div>
                {/* Photo */}
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Photo URL
                    </label>
                    <input
                        type="text"
                        {...register("photoUrl", { required: true })}
                        id="photoUrl"
                        className="input input-bordered w-full"
                        placeholder="PhotoUrl here"
                    />
                    {errors.name?.type === "photoUrl" && (
                        <p role="alert" className='text-red-500'>PhotoURL is required</p>
                    )}
                </div>
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
                        {...register("email", { required: true })}
                        id="email"
                        className="input input-bordered w-full"
                        placeholder="Type here"
                    />
                    {errors.email?.type === "required" && (
                        <p role="alert" className='text-red-500'>Email is required</p>
                    )}
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
                        {...register("password", {
                            required: true,
                            minLength: 6,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])/,

                        },)}
                        id="password"
                        className="input input-bordered w-full"
                        placeholder="Enter your password"
                    />
                    {errors.password?.type === "required" && (
                        <p role="alert" className='text-red-500'>Pass is required</p>
                    )}
                    {errors.password?.type === "pattern" && (
                        <p role="alert" className='text-red-500'>Please enter one Upper or Lower case</p>
                    )}
                </div>
                {/* Dropdown */}
                <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium mb-2">
                        Select an Role
                    </label>
                    <select
                        id="role"
                        {...register("role", { required: "Please select an Role" })}
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="tutor">Tutor</option>
                        <option value="student">Student</option>
                    </select>
                    {errors.role && (
                        <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
                    )}
                </div>

                {/* Sign In Button */}
                <button className="btn btn-outline w-full">Sign Up</button>
            </form>

            {/* Links */}
            <p className="text-sm text-center mt-4">
                Already register?{" "}
                <Link to='/login' className="text-primary font-medium">
                    Go to Login
                </Link>
            </p>
            <div className="divider">Or sign in with</div>

            {/* Social Icons */}
            <div className="flex justify-center gap-4">

                <button onClick={handleGoogleSingIn} className="btn btn-outline">
                    <FaGoogle></FaGoogle>
                </button>
                <button className="btn btn-outline">
                    <FaGithub></FaGithub>
                </button>
            </div>
        </div>
    );
};

export default SignUp;