import { useState } from "react";
import useUser from "../../Hooks/useUser";
import CustomTable from "../../shared-component/pagination-table/CustomTable";
import SearchButton from "../../shared-component/search button/SearchButton";



const ManageUsers = () => {

    const [searchName, setSearchName] = useState(undefined); //console.log(searchName);
    const [searchMail, setSearchMail] = useState(undefined); //console.log(searchMail);

    const { users: data, refetch } = useUser(undefined, searchName, searchMail); console.log(data);

    const info = {
        data,
        refetch,
    }

    const inputStates = {
        setSearchName,
        setSearchMail,
    }

    return (
        <div>
            <SearchButton inputStates={inputStates} />
            <CustomTable info={info} />
        </div>

    );
};

export default ManageUsers;