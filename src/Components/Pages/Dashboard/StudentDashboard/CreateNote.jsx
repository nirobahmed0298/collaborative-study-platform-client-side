import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const CreateNote = () => {
    let { user } = useContext(AuthContext);
    let axiosSecure = useAxiosSecure();
    let handleSubmit = e => {
        e.preventDefault();
        let email = e.target.email.value;
        let title = e.target.title.value;
        let description = e.target.description.value;
        let notes = { email, title, description }
        let res = axiosSecure.post('/notes', notes)
            .then(res => {
                e.target.reset()
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your Review Added SuccessFully..!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    return (
        <div className="p-6 border rounded-lg shadow-lg bg-white">
            <h2 className="text-xl md:text-2xl font-semibold mb-6">Create a Note</h2>

            <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={user.email}
                        name="email"
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Title Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={user.title}
                        placeholder="Enter note title"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Description Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        placeholder="Enter note description"
                        className="textarea textarea-bordered w-full"
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button type="submit" className="btn w-full text-white bg-[#3B82F6]">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateNote;