import useUpcoming from "../../Hooks/useUpcoming";
import CustomTable from "../../shared-component/pagination-table/CustomTable";


const AdminAllUpcoming = () => {

    const sorted = true;

    const { upcoming: data, refetch } = useUpcoming(sorted);

    const info = {
        data,
        refetch,
    }
    return (
        <div>
            <CustomTable info={info} />
        </div>
    );
};

export default AdminAllUpcoming;