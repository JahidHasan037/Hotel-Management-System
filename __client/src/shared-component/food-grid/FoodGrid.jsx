import MealCard from "../meal-card/MealCard";
// import InfiniteScroll from 'react-infinite-scroll-component';

const FoodGrid = ({ items, refetch }) => {

    // console.log(items);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 lg:mt-12'>
            {
                items.map((item, index) => {
                    return <MealCard key={index} item={item} refetch={refetch} />
                })
            }
        </div>


    );
};

export default FoodGrid;