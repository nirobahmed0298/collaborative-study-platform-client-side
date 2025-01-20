import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import useRole from '../../../Hooks/useRole';
let img_hosting_key = import.meta.env.VITE_IMG_HOSTING;
let img_hosting_Api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
const CreateStudy = () => {
    let { user } = useContext(AuthContext)
    let [role,] = useRole()
    let axiosSecure = useAxiosSecure();
    let axiosPublic = useAxiosPublic();
    let navigate = useNavigate();

    let { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    let onSubmit = async (data) => {
        let imgFile = { image: data.file[0] }
        let res = await axiosPublic.post(img_hosting_Api, imgFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            let sessionItem = {
                SessionTitle: data.sessionTitle,
                TutorName: data.tutorName,
                Image: res.data.data.display_url,
                SessionDescription: data.sessionDescription,
                RegistrationStartDate: data.registrationStartDate,
                RegistrationEndDate: data.registrationEndDate,
                ClassStartTime: data.classStartDate,
                ClassEndDate: data.classEndDate,
                SessionDuration: data.sessionDuration,
                RegistrationFee: data.registrationFee,
                AverageRating: data.rating,
                role: role
            }
            let session = await axiosSecure.post('/sessions', sessionItem)
            if (session.data.insertedId) {
                reset()
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Create Study successfully !`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/viewAllStudy')

            }

        }

    };
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Study Session</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Tutor Name */}
                <div className="flex flex-col">
                    <label htmlFor="tutorName" className="text-sm font-semibold">Tutor Name</label>
                    <input
                        type="text"
                        id="tutorName"
                        value={user?.displayName}
                        readOnly
                        className={`input input-bordered ${errors.tutorEmail ? 'input-error' : ''}`}
                        {...register("tutorName", { required: "Name is required" })}
                    />
                </div>

                {/* Tutor Email*/}
                <div className="flex flex-col">
                    <label htmlFor="tutorEmail" className="text-sm font-semibold">Tutor Email</label>
                    <input
                        type="email"
                        id="tutorEmail"
                        value={user?.email}
                        readOnly
                        {...register("tutorEmail", { required: "Email is required" })}
                        className={`input input-bordered ${errors.tutorEmail ? 'input-error' : ''}`}
                    />
                </div>

                {/* Session Image */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="file">Upload Image</label>
                    <input
                        type="file"
                        id="file"
                        className="file-input file-input-bordered w-full"
                        {...register('file')}
                    />
                </div>

                {/* Session Title */}
                <div className="flex flex-col">
                    <label htmlFor="sessionTitle" className="text-sm font-semibold">Session Title</label>
                    <input
                        type="text"
                        id="sessionTitle"
                        {...register("sessionTitle", { required: "Session title is required" })}
                        className={`input input-bordered ${errors.sessionTitle ? 'input-error' : ''}`}
                    />
                    {errors.sessionTitle && <span className="text-xs text-red-500">{errors.sessionTitle.message}</span>}
                </div>

                {/* Session Description */}
                <div className="flex flex-col">
                    <label htmlFor="sessionDescription" className="text-sm font-semibold">Session Description</label>
                    <textarea
                        id="sessionDescription"
                        {...register("sessionDescription", { required: "Session description is required" })}
                        className={`textarea textarea-bordered ${errors.sessionDescription ? 'textarea-error' : ''}`}
                    />
                    {errors.sessionDescription && <span className="text-xs text-red-500">{errors.sessionDescription.message}</span>}
                </div>

                {/* Registration Dates */}
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                    <div className="flex w-full flex-col">
                        <label htmlFor="registrationStartDate" className="text-sm font-semibold">Registration Start Date</label>
                        <input
                            type="date"
                            id="registrationStartDate"
                            {...register("registrationStartDate", { required: "Registration start date is required" })}
                            className={`input input-bordered ${errors.registrationStartDate ? 'input-error' : ''}`}
                        />
                        {errors.registrationStartDate && <span className="text-xs text-red-500">{errors.registrationStartDate.message}</span>}
                    </div>

                    <div className="flex w-full flex-col">
                        <label htmlFor="registrationEndDate" className="text-sm font-semibold">Registration End Date</label>
                        <input
                            type="date"
                            id="registrationEndDate"
                            {...register("registrationEndDate", { required: "Registration end date is required" })}
                            className={`input input-bordered ${errors.registrationEndDate ? 'input-error' : ''}`}
                        />
                    </div>
                </div>

                {/* Class Dates */}
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                    <div className="flex w-full flex-col">
                        <label htmlFor="classStartDate" className="text-sm font-semibold">Class Start Date</label>
                        <input
                            type="date"
                            id="classStartDate"
                            {...register("classStartDate", { required: "Class start date is required" })}
                            className={`input input-bordered ${errors.classStartDate ? 'input-error' : ''}`}
                        />
                        {errors.classStartDate && <span className="text-xs text-red-500">{errors.classStartDate.message}</span>}
                    </div>

                    <div className="flex w-full flex-col">
                        <label htmlFor="classEndDate" className="text-sm font-semibold">Class End Date</label>
                        <input
                            type="date"
                            id="classEndDate"
                            {...register("classEndDate", { required: "Class end date is required" })}
                            className={`input input-bordered ${errors.classEndDate ? 'input-error' : ''}`}
                        />
                        {errors.classEndDate && <span className="text-xs text-red-500">{errors.classEndDate.message}</span>}
                    </div>
                </div>

                {/* Session Duration */}
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                    <div className="flex w-full flex-col">
                        <label htmlFor="sessionDuration" className="text-sm font-semibold">Session Duration (in hours)</label>
                        <input
                            type="number"
                            id="sessionDuration"
                            {...register("sessionDuration", { required: "Session duration is required" })}
                            className={`input input-bordered ${errors.sessionDuration ? 'input-error' : ''}`}
                        />
                        {errors.sessionDuration && <span className="text-xs text-red-500">{errors.sessionDuration.message}</span>}
                    </div>

                    {/* Registration Fee*/}

                    <div className="flex w-full flex-col">
                        <label htmlFor="registrationFee" className="text-sm font-semibold">Registration fee</label>
                        <input
                            type="number"
                            id="registrationFee"
                            value={0}
                            readOnly
                            {...register("registrationFee", { required: "Fee is required" })}
                            className={`input input-bordered ${errors.registrationFee ? 'input-error' : ''}`}
                        />
                    </div>
                </div>
                <div className="flex w-full flex-col">
                    <label htmlFor="rating" className="text-sm font-semibold">Rating</label>
                    <input
                        type="number"
                        id="rating"
                        {...register("rating", { required: "Rating is required" })}
                        className={`input input-bordered ${errors.rating ? 'input-error' : ''}`}
                    />
                </div>

                <button type="submit" className="btn w-full bg-blue-500 hover:bg-blue-600 text-white mt-4">Create Session</button>
            </form >
        </div >
    );
};

export default CreateStudy;