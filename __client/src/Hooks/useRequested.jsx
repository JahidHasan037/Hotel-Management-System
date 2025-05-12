import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useRequested = (userType, searchName, searchMail) => {

    //console.log('user type', userType);
    console.log('searchName', searchName);
    console.log('search Mail', searchMail);
    const axiosSecure = useAxiosSecure();

    const { user, loading } = useAuth();

    const { data: requestedMeals = [], isLoading, refetch } = useQuery({
        queryKey: ['requestedMeal', searchName, searchMail],
        enabled: !loading,
        queryFn: async () => {
            try {

                const endPoint = userType == 'single' ? `/requested-meal?email=${user?.email}` : `/requested-meal?searchName=${searchName}&searchMail=${searchMail}`; //console.log(endPoint);

                const res = await axiosSecure.get(endPoint); //console.log(res.data);
                return res.data;

            } catch (error) {
                console.log(error);
            }
        }
    })

    return { requestedMeals, isLoading, refetch }
};

export default useRequested;