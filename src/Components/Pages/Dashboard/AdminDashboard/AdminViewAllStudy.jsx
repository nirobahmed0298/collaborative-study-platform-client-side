import React, { useEffect, useState } from 'react';
import useAxiosSecure from './../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

let AdminViewAllStudy = () => {
    let [sessions, setSessions] = useState([]);
    let [showModal, setShowModal] = useState(false);
    let [selectedSession, setSelectedSession] = useState(null);
    let [paymentStatus, setPaymentStatus] = useState('free');
    let [amount, setAmount] = useState(0);
    let axisosSecure = useAxiosSecure();
    let [session, setSession] = useState([])
    useEffect(() => {
        sessions.map(s => setSession(s));
    }, [])
    useEffect(() => {
        let fetchSessions = async () => {
            try {
                let res = await axisosSecure.get('/sessions');
                setSessions(res.data);
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };

        fetchSessions();
    }, [axisosSecure]);

    let handleMakeStatus = async (sessionId, status) => {
        if (status === 'approve') {
            setSelectedSession(sessionId);
            setShowModal(true);
        } else if (status === 'rejected') {
            handleSessionDelete(sessionId);
        }

        try {
            let res = await axisosSecure.patch(`/sessions/Status/${sessionId}`, { Status: status });
            // if (res.data.modifiedCount > 0) {
            //     Swal.fire({
            //         position: 'center',
            //         icon: 'success',
            //         title: 'Session Status Updated Successfully!',
            //         showConfirmButton: false,
            //         timer: 1500,
            //     });
            // }

            setSessions(prevsessions =>
                prevsessions.map(session =>
                    session._id === sessionId ? { ...session, Status: status } : session
                )
            );
        } catch (error) {
            console.error('Error updating session status:', error);
        }
    };
    let handleSessionDelete = (sessionId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axisosSecure.delete(`/sessions/${sessionId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'The session has been deleted successfully.',
                                icon: 'success',
                            });
                            setSessions(sessions.filter((s) => s._id !== sessionId));
                        }
                    })
                    .catch((error) => {
                        console.error('Error deleting session:', error);
                    });
            }
        });
    };
    let handleModalSubmit = async () => {
        if (!selectedSession) return;
        let updatedSession = {
            Status: 'approve',
            PaymentStatus: paymentStatus,
            RegistrationFee: paymentStatus === 'paid' ? amount : amount,
        };
        try {
            let res = await axisosSecure.patch(`/sessions/Status/${selectedSession}`, updatedSession);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Approved & RegistrationFee Update Successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }

            setSessions(prevsessions =>
                prevsessions.map(session =>
                    session._id === selectedSession ? { ...session, ...updatedSession } : session
                )
            );
            setShowModal(false);
        } catch (error) {
            console.error('Error approving session:', error);
        }
    };

    return (
        <>
            <div className='mb-20'>
                {/* Main Content */}
                <h2 className="text-2xl font-bold mb-4">All Sessions</h2>
                <div className="my-6 flex justify-between items-center">
                    <div>
                        <p className="text-lg">Total Sessions: <span className="font-bold">{sessions.length}</span></p>
                    </div>
                </div>
                {/* Session Table */}
                <div className="overflow-x-auto bg-white rounded-t-lg shadow">
                    <table className="table-auto w-full text-left border-collapse">
                        <thead className="text-black">
                            <tr>
                                <th className="py-2 px-4"></th>
                                <th className="py-2 px-4">Title</th>
                                <th className="py-2 px-4">Tutor Name</th>
                                <th className="py-2 px-4">Status</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessions.map((session, i) => (
                                <tr key={i} className="border-b hover:bg-gray-100">
                                    <td className="py-2 px-4">{i + 1}</td>
                                    <td className="py-2 px-4">{session.SessionTitle}</td>
                                    <td className="py-2 px-4">{session?.TutorName}</td>
                                    <td className="px-4 py-2">
                                        {
                                            session.Status === 'approve' ?
                                                <p className='badge bg-green-500 text-white'>Approved</p>
                                                :
                                                <select
                                                    value={session.Status} onChange={(e) => handleMakeStatus(session._id, e.target.value)}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="approve">Approve</option>
                                                    <option value="rejected">Rejected</option>
                                                </select>
                                        }
                                    </td>
                                    <td className="py-2 px-4 flex flex-col gap-2">
                                        <Link to={`/dashboard/AdminviewAllStudy/${session._id}`}
                                            className="btn bg-green-500 btn-sm text-white"
                                        >
                                            Update
                                        </Link>
                                        <button
                                            onClick={() => handleSessionDelete(session._id)}
                                            className="btn btn-error btn-sm text-white"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Modal for Approve */}
                {showModal && (
                    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg w-1/3">
                            <h3 className="text-xl font-bold mb-4">Approve Session</h3>
                            <div>
                                <label className="block mb-2">Is the session Free or Paid?</label>
                                <select
                                    value={paymentStatus}
                                    onChange={(e) => setPaymentStatus(e.target.value)}
                                    className="mb-4"
                                >
                                    <option value="free">Free</option>
                                    <option value="paid">Paid</option>
                                </select>
                            </div>
                            {paymentStatus === 'paid' && (
                                <div>
                                    <label className="block mb-2">Registration Fee:</label>
                                    <input
                                        type="number"
                                        name='fee'
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full p-2 border rounded"
                                        min="0"
                                    />
                                </div>
                            )}
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="btn bg-red-500 text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleModalSubmit}
                                    className="btn bg-blue-500 text-white"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>

    );
};

export default AdminViewAllStudy;