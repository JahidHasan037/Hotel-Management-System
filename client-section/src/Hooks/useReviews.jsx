import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

// you must have to pass two things in order  :
// 1. which api you want to call
// 2. do you want to find a 'single' user or all user
// 3.example const {} = useReviews('','') ----------> at least you have to pass like this.---------> or ---> useReviews('','single')

const useReviews = (apiText, userType, meal_id) => {
    // console.log('api text', apiText);
    // console.log('user type ', userType);
    console.log('meal id', meal_id);

    const axiosPublic = useAxiosPublic();
    const { user, loading } = useAuth();

    const { data: reviews = [], isLoading, refetch } = useQuery({

        queryKey: ['reviews', 'reviews-count', apiText, userType, meal_id],
        enabled: !loading,
        queryFn: async () => {

            try {

                const endpoint = (apiText === 'review-count')
                    ? `/review-count`
                    : (userType === 'single' ? `/reviews?email=${user?.email}` : `/reviews?meal_id=${meal_id}`); //console.log(endpoint);

                const res = await axiosPublic.get(endpoint); console.log(res.data);
                return res.data;

            } catch (error) {
                console.log(error);
            }

        }
    })

    return { reviews, isLoading, refetch }
};

export default useReviews;