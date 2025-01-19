import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAxiosPublic from './src/Components/Hooks/useAxiosPublic';
import { AuthContext } from './src/Components/Provider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from './src/Components/Hooks/useAxiosSecure';
let img_hosting_key = import.meta.env.VITE_IMG_HOSTING;
let img_hosting_Api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
const UpdateTutorMaterial = () => {
    let [file, setFile] = useState(null);
    let { user } = useContext(AuthContext);
    let axiosPublic = useAxiosPublic();
    let axiosSecure = useAxiosSecure();
    let navigate = useNavigate();
    let material = useLoaderData();
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
                let Updatematerial = {
                    session_Id: id,
                    materialImage: res.data.data.display_url,
                    materialDriveLink: e.target.url.value,
                };
                let resMaterial = await axiosSecure.put(`/materials/${material._id}`, Updatematerial)
                e.target.reset();
                if (resMaterial.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Material Updated  SuccessFully..!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/TutorAllMaterials');
                }
                else {
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
    }



    return (
        <div>
            <div className='p-4 shadow-xl'>
                <div className="text-center">
                    <div>
                        <p className="text-sm">Session Id : {material.session_Id}</p>
                        <p className="text-sm">Tutor Email : {user?.email}</p>
                    </div>
                    <div>
                        <h1 className="text-blue-500 text-xl font-bold mt-2">Upload Your Material</h1>
                        <form onSubmit={(e) => handleSubmit(e)} className="text-left">
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
                                    defaultValue={material.materialDriveLink}
                                    id="url"
                                    name="url"
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn w-full bg-blue-500 hover:bg-blue-600 text-white mt-4"
                            >
                                Update Material
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateTutorMaterial;