import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

// 3.if you don't pass anything in the hook , it will load all the user by default 

const useUser = (userType, searchName, searchMail) => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth()

    const { data: users = [], isLoading, refetch } = useQuery({

        queryKey: ['users', searchName, searchMail, userType],
        enabled: !loading,
        queryFn: async () => {

            try {
                const endpoint = userType === 'single' ? `/users?email=${user?.email}` : `/users?searchName=${searchName}&searchMail=${searchMail}`; console.log(endpoint);
                const res = await axiosSecure.get(endpoint);
                // console.log(res.data);
                return res.data;
            } catch (error) {
                console.log(error);
            }

        }
    })

    return { users, isLoading, refetch }
};

export default useUser;