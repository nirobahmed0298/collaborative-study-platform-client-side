import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from './../../../Hooks/useAxiosSecure';

const ViewAllMaterial = () => {
    let axiosSecure = useAxiosSecure()
    let [materials, setMaterials] = useState([])
    axiosSecure.get('/materials')
        .then(res => {
            setMaterials(res.data);
        })

    let handleNoteDelate = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/materials/${_id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Material has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }

        });
    }
    return (
        <>
            <div className="p-2">
                <h2 className="text-xl text-center md:text-2xl font-bold mb-4">All Materials</h2>
                <div className='grid gap-4 grid-cols-1 md:grid-cols-3'>
                    {
                        materials.map((material, index) =>
                            <div key={index} className="p-2 bg-white shadow-lg text-center rounded-md">
                                <div className="h-[150px]">
                                    <img className="object-cover w-full h-full" src={material?.materialImage} alt="" />
                                </div>
                                <div className='flex-grow flex flex-col'>
                                    <p className="my-1 overflow-hidden text-ellipsis text-sm whitespace-nowrap">
                                        Session ID: {material?.session_Id}
                                    </p>
                                    <a
                                        href={material?.materialDriveLink}
                                        target="_blank"
                                        className="my-1 underline text-blue-500 overflow-hidden text-ellipsis whitespace-nowrap"
                                    >
                                        Material Link
                                    </a>
                                </div>
                                <div className="flex items-center justify-between gap-8">
                                    <div className="w-full">
                                        <Link to={`/dashboard/TutorAllMaterials/${material._id}`}
                                            className="btn h-full btn-sm bg-blue-500 hover:bg-blue-600 text-white mt-4">
                                            Update
                                        </Link>
                                    </div>
                                    <div className="w-full">
                                        <button onClick={() => handleNoteDelate(material._id)} className="btn h-full btn-sm bg-blue-500 hover:bg-blue-600 text-white mt-4">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>




                        )
                    }
                </div>
            </div>
        </>
    )

};

export default ViewAllMaterial;