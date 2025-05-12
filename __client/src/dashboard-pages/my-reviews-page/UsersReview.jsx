import useReviews from "../../Hooks/useReviews";
import CustomTable from "../../shared-component/pagination-table/CustomTable";
import Skeleton from "../../shared-component/skeleton-loader/Skeleton";

const UsersReview = () => {

    const { reviews: data, refetch, isLoading } = useReviews(null, 'single'); //console.log(data);

    if (isLoading) return <Skeleton />

    const info = {
        data,
        refetch,
        isLoading,
    }

    return <CustomTable
        info={info}
    />
};

export default UsersReview;