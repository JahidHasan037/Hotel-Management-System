import { useState } from "react";
import useMeal from "../../Hooks/useMeal";
import CustomTable from "../../shared-component/pagination-table/CustomTable";


const AdminAllMeals = () => {

    const [sortByLikes, setSortByLikes] = useState(false)
    const [sortByReviewCount, setSortByReviewCount] = useState(false);

    const { meals: data, isLoading, refetch } = useMeal(undefined, undefined, undefined, undefined, sortByLikes, sortByReviewCount); //console.log(meals);

    const info = {
        data,
        refetch,
        isLoading,
    }

    return (
        <div>

            {/* sort by likes and review count  */}

            <div className="w-[90%] mx-auto mt-12 text-white">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn w-32 bg-blue-500 text-white">Sort</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm space-y-3">

                        <li><button onClick={() => {
                            setSortByLikes(!sortByLikes);
                        }} className={`btn text-white ${sortByLikes ? 'bg-green-600' : 'bg-blue-600'}`}>{sortByLikes ? "SortedByLike" : "sortByLike"}</button></li>

                        <li><button onClick={() => {
                            setSortByReviewCount(!sortByReviewCount);
                        }} className={`btn text-white ${sortByReviewCount ? 'bg-green-600' : 'bg-blue-600'}`}>{sortByReviewCount ? "SortedByReviewCount" : "sortByReviewCount"}</button></li>
                    </ul>
                </div>
            </div>

            <CustomTable
                info={info}
            />
        </div>
    )
};

export default AdminAllMeals;