import axios from 'axios';
let axiosPublic = axios.create({
    baseURL: 'https://collaborative-study-platform-server.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;

};

export default useAxiosPublic;