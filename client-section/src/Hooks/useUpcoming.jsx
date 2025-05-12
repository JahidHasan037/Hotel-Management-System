import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useUpcoming = (sorted) => {


    const axiosPublic = useAxiosPublic();

    const { data: upcoming = [], refetch } = useQuery({
        queryKey: ['upcoming', sorted],
        queryFn: async () => {
            try {
                const res = await axiosPublic.get(`/upcoming?sorted=${sorted}`); //console.log(res.data);
                return res.data;

            } catch (error) {
                console.log(error);
            }
        }
    })

    return { upcoming, refetch }
};

export default useUpcoming;