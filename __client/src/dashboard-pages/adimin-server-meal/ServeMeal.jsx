import { useState } from "react";
import useRequested from "../../Hooks/useRequested";
import CustomTable from "../../shared-component/pagination-table/CustomTable";
import Skeleton from "../../shared-component/skeleton-loader/Skeleton";
import SearchButton from "../../shared-component/search button/SearchButton";


const ServeMeal = () => {


    const [searchName, setSearchName] = useState(undefined);// console.log(searchName);
    const [searchMail, setSearchMail] = useState(undefined); //console.log(searchMail);

    const { requestedMeals: data, isLoading, refetch } = useRequested(undefined, searchName, searchMail); //console.log(data);


    if (!data) {
        return <div className="grid h-[60vh] place-content-center bg-white px-4">
            <h1 className="uppercase tracking-widest text-gray-500">NO | Food Request  </h1>
        </div>
    }


    const info = {
        data,
        refetch,
        isLoading,
    }
    const inputStates = {
        setSearchName,
        setSearchMail,
    }

    return <div>

        <SearchButton inputStates={inputStates} />

        <CustomTable
            info={info}
        />
    </div>
};

export default ServeMeal;