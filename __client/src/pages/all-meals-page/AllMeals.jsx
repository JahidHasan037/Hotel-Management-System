import { useState } from "react";
import useMeal from "../../Hooks/useMeal";
import FoodGrid from "../../shared-component/food-grid/FoodGrid";
import SectionTitle from "../../shared-component/section-title/SectionTitle";
import Skeleton from "../../shared-component/skeleton-loader/Skeleton";


const AllMeals = () => {

    const [search, setSearch] = useState(undefined);
    const [category, setCategory] = useState(undefined);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);
    const { meals, isLoading } = useMeal(search, category, min, max);

    // console.log(meals);

    if (isLoading) <Skeleton />

    return (
        <div className="mt-8 lg:mt-12 space-y-8 lg:space-y-12">

            <SectionTitle title={"All Meals"} />

            <div className="w-11/12 mx-auto lg:flex items-center lg:justify-between justify-start">

                {/* search field + filter by cat field  */}
                <div className="flex gap-4">
                    {/* search field  */}

                    <div className="flex-3">
                        <label className="input dark:bg-slate-800 dark:text-white">

                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>

                            <input type="search" onChange={(e) => {

                                const text = e.target.value.toLowerCase();
                                setSearch(text)

                            }}
                            className=""
                             required placeholder="Search" />

                        </label>
                    </div>

                    {/* filter by category field  */}

                    <select

                        onChange={(e) => {
                            setCategory(e.target.value);
                        }}
                        className="select select-bordered flex-1 dark:bg-slate-800"
                    >
                        <option value="">All Categories</option>
                        <option value="salad">salad</option>
                        <option value="drinks">drinks</option>
                        <option value="dessert">Desserts</option>
                    </select>
                </div>

                {/* filter by price range  */}

                <div className="flex flex-row gap-3 items-start justify-between mt-2">


                    {/* Min Price Input */}
                    <div className="">
                        {/* <label className="text-sm font-medium  text-gray-600">Min:</label> */}
                        <input
                            type="number"
                            placeholder="Min Price"
                            className="input input-bordered lg:w-32 w-[35vw] dark:bg-slate-800"
                            onChange={(e) => {
                                const minPrice = e.target.value; //console.log(minPrice);
                                setMin(minPrice);
                            }}
                        />
                    </div>

                    {/* Max Price Input */}
                    <div className="">
                        {/* <label className="text-sm font-medium text-gray-600">Max:</label> */}
                        <input
                            type="number"
                            placeholder="Max Price"
                            className="input input-bordered lg:w-32 w-[35vw] dark:bg-slate-800"
                            onChange={(e) => {
                                const maxPrice = e.target.value
                                setMax(maxPrice);
                            }}
                        />
                    </div>

                </div>

            </div>

            <FoodGrid items={meals} />
        </div>
    );
};

export default AllMeals;