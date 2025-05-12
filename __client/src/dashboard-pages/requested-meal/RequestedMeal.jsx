
import useRequested from "../../Hooks/useRequested";
import CustomTable from "../../shared-component/pagination-table/CustomTable";
import Skeleton from "../../shared-component/skeleton-loader/Skeleton";


const RequestedMeal = () => {

    const { requestedMeals: data, isLoading, refetch } = useRequested('single'); console.log(data);

    if (isLoading) return <Skeleton />

    if (!data) {
        return <div className="grid h-[60vh] place-content-center px-4">
            <h1 className="uppercase tracking-widest text-gray-500 dark:text-white">Please | Request Food First</h1>
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

export default RequestedMeal;