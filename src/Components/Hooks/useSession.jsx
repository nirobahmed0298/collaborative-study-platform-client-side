import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useSession = () => {
    let axiosPublic = useAxiosPublic();
    const { data: sessions = [], isPending: loading, refetch } = useQuery({
        queryKey: ['sessions'],
        queryFn: async () => {
            let res = await axiosPublic.get(`/sessions`)
            return res.data;
        }
    })
    return [sessions, loading, refetch]
};

export default useSession;