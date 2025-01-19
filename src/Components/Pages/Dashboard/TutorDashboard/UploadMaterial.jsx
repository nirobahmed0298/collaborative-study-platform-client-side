import React, { useContext, useState } from 'react';
import useSession from '../../../Hooks/useSession';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useForm } from 'react-hook-form';
let img_hosting_key = import.meta.env.VITE_IMG_HOSTING;
let img_hosting_Api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const UploadMaterial = () => {
    let [file, setFile] = useState(null);
    let [sessions] = useSession();
    let { user } = useContext(AuthContext);
    let axiosSecure = useAxiosSecure();
    let axiosPublic = useAxiosPublic();
    let navigate = useNavigate();

    let handleFileChange = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            console.log(selectedFile);
            setFile(selectedFile);
        }
    };

    let handleSubmit = async (e, id) => {
        e.preventDefault();
        if (!file) {
            Swal.fire({
                icon: 'error',
                title: 'No file selected',
                text: 'Please select a file to upload.',
            });
            return;
        }
        let formData = new FormData();
        formData.append('image', file);

        try {
            let res = await axiosPublic.post(img_hosting_Api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.data.success) {
                let material = {
                    session_Id: id,
                    materialImage: res.data.data.display_url,
                    materialDriveLink: e.target.url.value,
                };
                let resMaterial = await axiosSecure.post('/materials', material);
                if (resMaterial.data.insertedId) {
                    e.target.reset();
                    document.getElementById('my_modal_3').close();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Material uploaded successfully!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate('/dashboard/TutorAllMaterials');
                } else {
                    throw new Error('Failed to save material');
                }
            } else {
                throw new Error('Image upload failed');
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Upload failed',
                text: error.message || 'An error occurred while uploading the material.',
            });
        }
    };
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Upload Material</h1>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3 text-center">
                {sessions.map((session, index) => (
                    <div key={index} className="p-2 bg-white shadow-lg rounded-md">
                        <div className="h-[150px]">
                            <img className="object-cover w-full h-full" src={session?.Image} alt="" />
                        </div>
                        {/* Title and Tutor Name */}
                        <h1 className="text-lg font-bold my-1">{session.SessionTitle}</h1>
                        <div className="text-center">
                            <button
                                onClick={() => document.getElementById('my_modal_3').showModal()}
                                type="button"
                                className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white mt-4"
                            >
                                Upload Material
                            </button>
                        </div>
                        {/* Modal */}
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <div>
                                    <h3 className="font-bold text-lg">{session.SessionTitle}</h3>
                                    <p className="text-sm">Session Id : {session._id}</p>
                                    <p className="text-sm">Tutor Email : {user?.email}</p>
                                </div>
                                <div>
                                    <h1 className="text-blue-500 text-xl font-bold mt-2">Upload Your Material</h1>
                                    <form onSubmit={(e) => handleSubmit(e, session._id)} className="text-left">
                                        <div className="mb-1">
                                            <label className="block text-sm font-bold mb-2" htmlFor="file">
                                                Upload Image
                                            </label>
                                            <input
                                                type="file"
                                                id="file"
                                                name="file"
                                                required
                                                className="file-input file-input-bordered w-full"
                                                onChange={handleFileChange} // Set the event handler here
                                            />
                                        </div>
                                        <div className="flex w-full flex-col">
                                            <label htmlFor="url" className="text-sm font-semibold">
                                                Drive Link
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                id="url"
                                                name="url"
                                                className="input input-bordered w-full"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn w-full bg-blue-500 hover:bg-blue-600 text-white mt-4"
                                        >
                                            Upload Material
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadMaterial;