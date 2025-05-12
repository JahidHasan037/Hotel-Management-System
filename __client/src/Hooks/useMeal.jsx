import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


// 1.using undefined  in instead of perameter is safe to use while calling the hook
//2. example : const { meals: data, isLoading, refetch } = useMeal(undefined,undefined,undefined,undefined,sortByLikes,sortByReviewCount); 

const useMeal = (search, category, min, max, sortByLikes, sortByReviewCount, CountAddedMeal) => {

   // console.log(search, category, min, max, sortByLikes, sortByReviewCount, CountAddedMeal);

    const axiosPublic = useAxiosPublic();
    const { user, loading } = useAuth();

    const { data: meals = [], isLoading, refetch } = useQuery({

        queryKey: ['meals', search, category, min, max, sortByLikes, sortByReviewCount, CountAddedMeal],
        enabled: !loading,
        queryFn: async () => {

            try {

                const endPoint = CountAddedMeal === 'countAddedMeal' ? `/meals?email=${user?.email}` : `/meals?search=${search}&category=${category}&min=${min}&max=${max}&sortByLikes=${sortByLikes}&sortByReviewCount=${sortByReviewCount}`

                const res = await axiosPublic.get(endPoint); //console.log(res.data);
                return res.data

            } catch (error) {
                console.log(error);
            }
        }
    })

    return { meals, isLoading, refetch }
};

export default useMeal;