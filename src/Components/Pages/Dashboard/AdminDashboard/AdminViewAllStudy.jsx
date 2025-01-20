import React from 'react';
import useSession from '../../../Hooks/useSession';

const AdminViewAllStudy = () => {
    let [sessions] = useSession();
    return (
        <div>
            <h1 className='text-xl'>View All Study Session</h1>

        </div>
    );
};

export default AdminViewAllStudy;