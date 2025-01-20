import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AllUser = () => {
    const [users, setUsers] = useState([]);
    let axisosSecure = useAxiosSecure();
    const [search, setsearch] = useState('');
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axisosSecure.get('/users', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include auth token
                    },
                });
                setUsers(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);
    const handleSearchChange = (e) => {
        setsearch(e.target.value);
    };

    useEffect(() => {
        const searchUsers = async () => {
            if (search.length === 0) {
                const res = await axisosSecure.get('/users');
                setUsers(res.data);
            } else {

                const res = await axisosSecure.get('/users', {
                    params: { name: search, email: search },
                });
                setUsers(res.data);
            }
        };

        searchUsers();
    }, [search]);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axisosSecure.get('/users')
                setUsers(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    const handleMakeAdmin = async (userId, role) => {
        try {
            const res = await axisosSecure.patch(`/users/role/${userId}`, { role });
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your Note Updated  SuccessFully..!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user._id === userId ? { ...user, role } : user
                )

            );

        } catch (error) {
            console.error(error);
        }
    };

    let handleUserDelete = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            axisosSecure.delete(`/users/${user._id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your User has been deleted SuccessFully.",
                            icon: "success"
                        });
                    }
                })

        });
    }


    return (
        <div>
            {/* Main Content */}
            <h2 className="text-2xl font-bold mb-4">All Users</h2>
            <div className='my-4'>
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={handleSearchChange}
                    className="border p-2 w-full"
                />
            </div>
            <div className="my-6 flex justify-between items-center">
                <div>
                    <p className="text-lg">Total Users : <span className="font-bold">{users.length}</span></p>
                </div>
            </div>
            {/* User Table */}
            <div className="overflow-x-auto bg-white rounded-t-lg shadow">
                <table className="table-auto w-full text-left border-collapse">
                    <thead className="text-black">
                        <tr>
                            <th className="py-2 px-4">Serial</th>
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Role</th>
                            <th className="py-2 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr key={user._id} className="border-b hover:bg-gray-100">
                                <td className="py-2 px-4">{i + 1}</td>
                                <td className="py-2 px-4">{user.name}</td>
                                <td className="py-2 px-4">{user?.email}</td>
                                <td className="px-4 py-2">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleMakeAdmin(user._id, e.target.value)}
                                    >
                                        <option >Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="student">Student</option>
                                        <option value="tutor">Tutor</option>
                                    </select>
                                </td>
                                <td className="py-2 px-4">
                                    <button onClick={() => handleUserDelete(user)} className="btn btn-error btn-sm text-white"><MdDelete></MdDelete></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default AllUser;