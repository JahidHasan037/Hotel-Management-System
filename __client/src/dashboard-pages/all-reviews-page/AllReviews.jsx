import useReviews from "../../Hooks/useReviews";
import CustomTable from "../../shared-component/pagination-table/CustomTable";
import Skeleton from "../../shared-component/skeleton-loader/Skeleton";


const AllReviews = () => {
    const { reviews: data, refetch, isLoading } = useReviews(null, null); //console.log(data);

    if (isLoading) return <Skeleton />

    if (!data) {
        return <div className="grid h-[60vh] place-content-center bg-white px-4">
            <h1 className="uppercase tracking-widest text-gray-500">Please | Review First</h1>
        </div>
    }

    const info = {
        data,
        refetch,
        isLoading,
    }

    return <CustomTable
        info={info}
    />
};

export default AllReviews;