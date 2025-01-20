import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useBookedSession = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: bookedSession = [], isPending: isLoading, refetch } = useQuery({
        queryKey: [user?.email, 'bookedSession'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`);
            console.log(res.data);
            return res?.data;
        }
    })
    return [bookedSession, isLoading, refetch]
};

export default useBookedSession;