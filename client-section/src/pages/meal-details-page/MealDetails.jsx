
import {useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import ReviewSection from "./ReviewSection";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Skeleton from "../../shared-component/skeleton-loader/Skeleton";
import useUser from "../../Hooks/useUser";


const MealDetails = () => {

    //hooks
    const { data } = useLoaderData(); if (!data) return <Skeleton />
    const { user, loading } = useAuth();// console.log(user);
    const { users, isLoading: isUserLoading } = useUser('single'); //console.log(users);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    // console.log(data);

    // state 
    const [like, setLike] = useState(data?.reactionCount || 0);

    const { image, name, category, price, _id, details, ingredients, mealType, distributorName, postTime, rating } = data;

    if (isUserLoading) return <Skeleton />

    const handleLike = async () => {

        if (loading) return <span className="loading loading-bars loading-xs"></span>

        if (!user) {

            Swal.fire({ title: "Please Login First", icon: 'warning' })
            navigate('/login');

        }

        setLike(like + 1);



        try {

            const res = await axiosSecure.patch(`/meal/like/${_id}`, { reactionCount: like + 1 })

        } catch (error) {

            console.log(error);
        }

    }

    const handleRequestMeal = async () => {

        if (!user) {
            return Swal.fire({ title: "Please Login First", icon: 'warning' })
        }

        if (users[0]?.membership == "Bronze" || !users[0]?.membership) {
            Swal.fire({ icon: "warning", title: "Please Subscribe to Gold/Silver" })
            navigate('/payment/Gold')
            return;
        }

        const reqItem = {
            user_name: user?.displayName,
            user_email: user?.email,
            meal_name: name,
            reviews_count: data?.reviews_count || 0,
            reactionCount: data?.reactionCount || 0,
            meal_category: category,
            meal_id: _id,
            status: "pending",
        }

        try {

            const reqRes = await axiosSecure.post('/requested-meal', reqItem); //console.log(reqRes.data);

            if (reqRes.data.insertedId) {
                Swal.fire({ icon: 'success', title: 'Meal Requested' })
            }

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>

            <div className="max-w-[95vw] min-h-screen lg:flex lg:gap-12 justify-between  items-center mx-auto p-6 dark:text-white">
                {/* Food Image */}
                <img
                    src={image}
                    alt={name}
                    className=" lg:w-[40%]  object-cover rounded-md"
                />



                {/* Food Details ---Text Content */}

                <div className='space-y-8'>

                    <h1 className="text-4xl font-bold mt-6 text-green-500">{name}</h1>

                    <p className="text-gray-700 dark:text-blue-300">{details}</p>

                    <div className="space-y-3">
                        <p className=" font-semibold text-gray-700 dark:text-blue-300">Category: <span className=" text-gray-600 dark:text-white text-sm ml-3">{category}</span></p>

                        <p className=" font-semibold text-gray-700 dark:text-blue-300">price: <span className=" text-gray-600 dark:text-white text-sm ml-3">${price}</span></p>

                        <p className=" font-semibold text-gray-700 dark:text-blue-300">Meal Type: <span className=" text-gray-600 dark:text-white text-sm ml-3">{mealType}</span></p>

                        <p className=" font-semibold text-gray-700 dark:text-blue-300">Post Time: <span className=" text-gray-600 dark:text-white text-sm ml-3">{postTime}</span></p>

                        <p className=" font-semibold text-gray-700 dark:text-blue-300">Rating: <span className=" text-gray-600 dark:text-white text-sm ml-3">{rating}</span></p>

                        <p className=" font-semibold text-gray-700 dark:text-blue-300">Likes: <span className=" text-gray-600 dark:text-white text-sm ml-3">{like}</span></p>

                        {/* <p ><SlLike className="text-2xl text-blue-700" /></p> */}

                    </div>



                    <div className="mt-4">
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-blue-300">Ingredients</h2>
                        <ul className="list-disc list-inside mt-2 space-y-2  text-gray-600 dark:text-white">
                            {
                                Array.isArray(ingredients) && ingredients.map((ingredient, index) => {
                                    return <li key={index} className="font-medium">{ingredient}</li>
                                })
                            }

                        </ul>
                    </div>

                    {/* Donator Information */}
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-blue-300">Distributor</h2>
                        <div className="flex items-center mt-4">
                            <img
                                src={""}
                                alt={distributorName}
                                className="w-16 h-16 rounded-full object-cover border border-gray-200"
                            />
                            <div className="ml-4">
                                <p className="text-lg font-semibold">{distributorName}</p>
                                <p className="text-gray-600 dark:text-white">{ }</p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-6 flex gap-3">
                        <button onClick={handleRequestMeal} className="btn bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg">
                            Request Food
                        </button>

                        <button onClick={handleLike} className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                            Like Food
                        </button>

                    </div>
                </div>

            </div >

            {/* review section  */}

            <ReviewSection info={{
                name,
                image,
                category,
                price,
                mealType,
                _id,
                like
            }} />

        </div>
    );
};

export default MealDetails;