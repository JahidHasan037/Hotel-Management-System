import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();

    const { data: isAdmin = [], isLoading: isAdminLoading, refetch } = useQuery({
        queryKey: ['isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/user/admin/${user?.email}`); //console.log(res.data.isAdmin);
                return res.data.isAdmin;    

            } catch (error) {
                console.log(error);
            }
        }
    })

    return { isAdmin, isAdminLoading }
};

export default useAdmin;