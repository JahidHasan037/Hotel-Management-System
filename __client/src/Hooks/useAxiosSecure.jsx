import axios from "axios";

const axiosSecure = axios.create({

    baseURL: window.location.hostname === 'localhost'
        ? 'http://localhost:5000'
        : 'https://hostel-management-server-delta.vercel.app',
})

export const useAxiosSecure = () => {

    //request interceptor ---------------------------------------------------------------------->

    axiosSecure.interceptors.request.use(function (config) {
        // Do something before request is sent

        const token = localStorage.getItem('access-token'); //console.log('token is inside interceptor', token);
        config.headers.auth = token;

        return config;

    }, function (error) {

        // Do something with request error

        return Promise.reject(error);
    });


    //response interceptor-------------------------------------------------------------------------->

    axiosSecure.interceptors.response.use(function (response) {

        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data

        return response;

    }, function (error) {

        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        const status = error.response?.status;

        if (status == 401 || status == 403) {

            return <div className="grid h-screen place-content-center bg-white px-4">
                <h1 className="uppercase tracking-widest text-gray-500">{status} | Not Found | Login as Admin</h1>
            </div>

        }

        return Promise.reject(error);

    });

    return axiosSecure
};

export default useAxiosSecure;