import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { handleMealPublish } from "../../utility-functions/util";
import useUser from "../../Hooks/useUser";
import Skeleton from "../skeleton-loader/Skeleton";

const MealCard = ({ item, refetch }) => {

    const [upcomingLike, setUpcomingLike] = useState(item?.reactionCount);

    const { pathname } = useLocation(); //console.log(pathname);
    const { user, loading } = useAuth();
    const { users } = useUser('single'); //console.log(users);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    //loading while users role incoming

    if (!users.length) {
        return <Skeleton />
    }


    //checking upcoming meals route or not
    let isUpcoming = false;
    if (pathname.includes('upcoming')) isUpcoming = true;

    const { name, image, price, rating, _id } = item;

    const handleUpcomingLike = async () => {

        if (loading) return <span className="loading loading-bars loading-xs"></span>

        if (!user || users[0].membership == "Bronze") {

            Swal.fire({ icon: 'warning', title: `${!user ? "Please Login First" : "Please subscribe first"}` })
            navigate(`${!user ? '/login' : '/'}`);

        }

        setUpcomingLike((prev) => {
            const updatedCount = prev + 1;
            return updatedCount;
        });

        try {

            const res = await axiosSecure.patch(`/upcoming/reactionCount/${_id}`, { reactionCount: upcomingLike + 1 }); console.log(res.data);

            if (res.data.modifiedCount) {

                if (upcomingLike > 9) {
                    handleMealPublish(item, axiosSecure, refetch);
                    return;
                }
            }

        } catch (error) {

            console.log(error);
        }
    }

    return (
        <div className="card w-[90%] lg:w-[80%] bg-base-100 dark:bg-slate-800 shadow-xl mx-auto">
            <figure>
                <img
                    src={image}
                    alt={name}
                    className="w-full h-56 object-cover"
                />
            </figure>
            <div className="card-body space-y-3">
                <h2 className="card-title">{name}</h2>
                <p className="text-gray-600 dark:text-white font-bold">
                    Price: <span className="font-semibold">${price}</span>
                </p>
                <p className="text-gray-600 dark:text-white font-bold">
                    Rating: <span className="font-semibold">{rating} ⭐</span>
                </p>
                <div className="card-actions justify-end">
                    {
                        isUpcoming ? <div>
                            <button onClick={handleUpcomingLike} className="btn btn-primary">
                                Like ({upcomingLike})
                            </button>
                        </div> :
                            <Link to={`/meal-details/${_id}`}

                                className="btn btn-primary w-full"
                            >
                                Details
                            </Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default MealCard;