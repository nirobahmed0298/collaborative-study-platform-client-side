import React from 'react';
import useBookedSession from '../../../Hooks/useBookedSession';
import { FaXmark } from 'react-icons/fa6';

const AllMaterials = () => {
    let [bookedSession, isAdminLoading, refetch] = useBookedSession();

    return (
        <>
            {
                bookedSession?.length === 0 ? <div className='text-red-500 text-xl  text-center'>Material not available, Please Add</div> :
                    <div className="p-2">
                        <h2 className="text-xl text-center md:text-2xl font-bold mb-4">All Materials</h2>
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                            {bookedSession.map((sessionData) => (
                                <div key={sessionData._id} className="bg-white shadow-lg rounded-lg p-4 w-full">
                                    {sessionData.session.map((session) => (
                                        <div>
                                            <div>
                                                <img src={session?.Image} alt="" />
                                            </div>
                                            <h1>{session.SessionTitle}</h1>
                                            <button onClick={() => document.getElementById('my_modal_3').showModal()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">View Materials</button>

                                            {/* Modal */}
                                            <dialog id="my_modal_3" className="modal">
                                                <div className="modal-box md:w-7/12 max-w-5xl">
                                                    <div key={sessionData._id} className="bg-white text-center space-y2 shadow-lg rounded-lg p-4 w-full mt-2">
                                                        <div>
                                                            <img className='w-full' src={session?.Image} alt="Photo" />
                                                        </div>
                                                        <h3 className="font-bold text-lg mt-2">{session.SessionTitle}</h3>
                                                        <a href={session?.materialLink} target='_blank' className="py-4 text-blue-500 underline">Material Link</a>
                                                        <br /> <br />
                                                        <a href={session?.Image} target='_blank' download className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Download Image</a>
                                                    </div>
                                                    <div className="modal-action">
                                                        <form method="dialog">
                                                            {/* if there is a button, it will close the modal */}
                                                            <button className="btn btn-outline rounded-full  p-4 text-red-400"><FaXmark></FaXmark>Close</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </dialog>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

            }
        </>

    );
};

export default AllMaterials;