import axios from "axios";

const axiosInstance = axios.create({

    baseURL: window.location.hostname === 'localhost'
        ? 'http://localhost:5000'
        : 'https://hostel-management-server-delta.vercel.app',
})

export const useAxiosPublic = () => {
    return axiosInstance;
};

export default useAxiosPublic;