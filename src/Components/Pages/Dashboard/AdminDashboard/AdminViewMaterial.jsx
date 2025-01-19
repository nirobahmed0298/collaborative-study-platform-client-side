import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AdminViewMaterial = () => {
    let axiosSecure = useAxiosSecure()
    let [materials, setMaterials] = useState([])
    axiosSecure.get('/materials')
        .then(res => {
            setMaterials(res.data);
        })


    let handleDelete = (Id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            axiosSecure.delete(`/materials/${Id}`)
                .then(res => {
                    console.log(res.data);
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your materilas has been deleted SuccessFully.",
                            icon: "success"
                        });
                    }
                })

        });
    }
    return (
        <div>
            <h2 className='mb-2 font-bold'>All Materials : {materials?.length}</h2>
            <div>
                {materials.length === 0 ? (
                    <p className='text-center text-red-500 text-xl'>No materials available.</p>
                ) : (
                    materials.map(material => (
                        <div key={material._id} className='p-2 border mb-4'>
                            <div className='md:flex gap-3 justify-between items-center text-center'>
                                <div className='w-20 h-20'>
                                    <img src={material.materialImage} alt="material" className='w-full object-cover rounded-xl h-full' />
                                </div>
                                <div>
                                    <p>Session Id : {material.session_Id}</p>
                                    <a href={material.materialDriveLink} className='underline text-blue-500'>Material Link</a>
                                </div>
                                <div>
                                    <button onClick={() => handleDelete(material._id)} className='btn btn-sm bg-red-400 text-white' >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminViewMaterial;