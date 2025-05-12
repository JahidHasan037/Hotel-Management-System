import useUpcoming from "../../Hooks/useUpcoming";
import FoodGrid from '../../shared-component/food-grid/FoodGrid'
import Skeleton from '../../shared-component/skeleton-loader/Skeleton'


const UpcomingMeals = () => {

    const { upcoming, refetch } = useUpcoming();

    if (!upcoming || !upcoming.length) return <Skeleton />

    return (
        <div>
            <FoodGrid items={upcoming} refetch={refetch} />
        </div>
    );
};

export default UpcomingMeals;