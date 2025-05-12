import usePayment from "../../Hooks/usePayment";
import CustomTable from "../../shared-component/pagination-table/CustomTable";
import Skeleton from "../../shared-component/skeleton-loader/Skeleton";

const PaymentHistory = () => {

    const { payments: data, refetch, isPaymentLoading: isLoading } = usePayment(); //console.log(data);

    if (isLoading) return <Skeleton />

    if (!data.length) {
        return <div className="grid h-[60vh] place-content-center px-4">
            <h1 className="uppercase tracking-widest text-gray-500 dark:text-white">Please | Make Payment First</h1>
        </div>
    }

    const info = {
        data,
        refetch,
        isLoading,
    }

    return (
        <div>
            <CustomTable info={info} />
        </div>
    );
};

export default PaymentHistory;