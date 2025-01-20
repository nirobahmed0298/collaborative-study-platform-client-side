import React, { useContext, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Provider/AuthProvider';

const ManageNote = () => {
    let { user } = useContext(AuthContext)
    let axiosSecure = useAxiosSecure();
    let [notes, setNotes] = useState([])
    axiosSecure.get(`/notes/${user.email}`)
        .then(res => {
            setNotes(res.data);
        })

    //Note delete
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
                axiosSecure.delete(`/notes/${_id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Note has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }

        });
    };
    return (
        <div className="p-6 border rounded-lg shadow-lg bg-white">
            <h2 className="text-xl text-center md:text-2xl font-semibold mb-6">Manage Personal  Note</h2>
            {
                notes?.length === 0 ? <div className='text-red-500 text-xl  text-center'>Note not available, Please Add Note</div>
                    :

                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Student Email</th>
                                    <th>Note Title</th>
                                    <th>Note Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    notes.map((note, i) =>
                                        <tr key={i} className='hover'>
                                            <th>{note.email}</th>
                                            <td>{note.title.slice(0, 10)}..</td>
                                            <td>{note.description.slice(0, 20)}..</td>
                                            <td>
                                                <Link to={`/dashboard/updateNote/${note._id}`} className='btn btn-sm bg-green-400 text-white'>Update</Link>
                                                <button onClick={() => handleNoteDelate(note._id)} className='btn btn-sm bg-red-500 text-white ml-2'>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
            }
        </div>
    );
}
export default ManageNote;