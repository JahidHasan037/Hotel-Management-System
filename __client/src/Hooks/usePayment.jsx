import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";



const usePayment = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure()

    const { data: payments = [], isLoading: isPaymentLoading, refetch } = useQuery({

        queryKey: ['payments'],
        enabled: !loading,
        queryFn: async () => {
            try {

                const res = await axiosSecure.get(`/payment?email=${user?.email}`); console.log(res.data);
                return res.data;

            } catch (error) {
                console.log(error);
            }
        }
    })

    return { payments, isPaymentLoading, refetch }
};

export default usePayment;