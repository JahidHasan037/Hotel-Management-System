import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link, useLocation } from "react-router-dom";
import Skeleton from "../skeleton-loader/Skeleton";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { handleMealPublish } from "../../utility-functions/util";



const CustomTable = ({ info }) => {

    const { pathname } = useLocation(); //console.log(pathname);

    const { data, refetch } = info; //console.log(data)

    if (!data || !data.length) return <Skeleton />

    //checking upcoming meals route or not
    let isReview = false;
    if (pathname.includes('review')) isReview = true; //console.log('is upcoming',isUpcoming)
    //checking upcoming meals route or not
    let isUpcoming = false;
    if (pathname.includes('upcoming')) isUpcoming = true; //console.log('is upcoming',isUpcoming)
    //checking all meals route or not
    let isAllMeals = false;
    if (pathname.includes('all-meals')) isAllMeals = true;
    //checking payment route or not
    let isPayment = false;
    if (pathname.includes('payment')) isPayment = true;
    //checking requested meal route or not 
    let isRequested = false;
    if (pathname.includes('requested')) isRequested = true;
    //checking serve meal route or not 
    let isServeMeal = false;
    if (pathname.includes('serve')) isServeMeal = true; console.log('is serve meal', isServeMeal);


    //---------------------------------------------------pagination related starts-------------------------------------------
    //all the things related to calculation of page
    const [currentPage, setCurrentPage] = useState(0);
    const recordsPerPage = 10;

    const firstIndex = currentPage * recordsPerPage;
    const lastIndex = firstIndex + recordsPerPage;

    const totalPages = Math.ceil(data.length / recordsPerPage);// console.log(totalPages)// here 5 is records per page . we can make it dynamic later

    //all things related showing data in a page
    const records = data.slice(firstIndex, lastIndex);

    //all things related to page number
    const pageNumbers = [...Array(totalPages).keys()];  // console.log(pageNumbers);
    // ---------------------------------------------------pagination related ends-----------------------------------------------

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const handleReviewDelete = async (id) => {

        try {
            const res = await axiosSecure.delete(`/review/${id}`)
            if (res.data.deletedCount) {
                refetch();
                Swal.fire({ icon: 'success', title: 'Review Deleted' })
            }
        } catch (error) {
            console.log(error);
        }

    }

    const handleMakeAdmin = async (id) => {
        try {
            const res = await axiosSecure.patch(`/user/admin/${id}`)
            if (res.data.modifiedCount) {
                refetch();
                Swal.fire({ icon: 'success', title: 'Role Updated' })
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleMealDelete = async (id) => {

        try {
            const res = await axiosSecure.delete(`/meal/${id}`)
            if (res.data.deletedCount) {
                refetch();
                Swal.fire({ icon: 'success', title: 'Meal Deleted' })
            }
        } catch (error) {
            console.log(error);
        }

    }
    // const handleMealPublish = async (each) => {
    //     //console.log(id);
    //     try {

    //         const deleteRes = await axiosSecure.delete(`/upcoming/${each?._id}`);

    //         if (deleteRes.data.deletedCount) {

    //             //deleting id because it will create problem while inserting in mongodb
    //             delete each._id; //console.log('for security checking item', each)

    //             const addRes = await axiosSecure.post(`/meals`, each);

    //             if (addRes.data.insertedId) {
    //                 refetch();
    //                 Swal.fire({ icon: "success", title: "Meal Published" })
    //             }
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }
    const handleRequestDelete = async (id) => {

        try {
            const res = await axiosSecure.delete(`/requested-meal/${id}`); console.log(res);
            if (res.data.deletedCount) {
                refetch();
                Swal.fire({ icon: 'success', title: ' Request canceled' })
            }
        } catch (error) {
            console.log(error);
        }

    }
    const handleMealServe = async (id) => {
        try {
            const res = await axiosSecure.patch(`/requested-meal/${id}`); console.log(res.data);
            if (res.data.modifiedCount) {
                refetch();
                Swal.fire({ icon: 'success', title: 'Meal Delivered' })
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="rounded-lg border border-gray-200 w-[90%] mt-12 lg:mt-16 mx-auto">
            <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white  dark:bg-slate-600 dark:text-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        {
                            // if review user is accessing the table 
                            isReview && <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Title</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Likes</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Review</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white ">Actions</th>
                            </tr>
                        }
                        {
                            //if ManageUsers is accessing the table
                            data[0]?.email && <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Name</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Email</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Role</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Action</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white ">Status</th>
                            </tr>
                        }
                        {
                            //if ManageUsers is accessing the table
                            isAllMeals && <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Meal Title</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Likes</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Review Count</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Rating</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Distributor Name</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Actions</th>
                            </tr>
                        }
                        {
                            isUpcoming && <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Meal Title</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Image</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Likes</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Actions</th>
                            </tr>

                        }
                        {
                            isPayment && <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Email</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Price</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">TransactionId</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Time</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">status</th>
                            </tr>
                        }
                        {
                            isRequested && <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Title</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Likes</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Reviews Count</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">status</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Action</th>
                            </tr>
                        }
                        {
                            isServeMeal && <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Title</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">User Name</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">User Email</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">status</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Action</th>
                            </tr>
                        }
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {
                            records.map((each, index) => {
                                if (isReview) {
                                    return (
                                        // if review user is accessing the table 
                                        <tr key={index} >
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{each?.meal_name}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{each?.likes_count}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{each?.reviewText}</td>
                                            <td className="whitespace-nowrap flex gap-3 px-4 py-2 text-gray-700 dark:text-white ">
                                                <Link state={each} to={`/dashboard/review-edit`} className="btn btn-ghost"><FaEdit className="text-blue-500 " /></Link>
                                                <button onClick={() => handleReviewDelete(each?._id)} className="btn btn-ghost"><FaTrash className="text-red-500 " /></button>
                                                <Link to={`/meal-details/${each?.meal_id}`} className="btn btn-ghost">view</Link>
                                            </td>
                                        </tr>
                                    )
                                }
                                if (each?.email) {
                                    return (
                                        <tr key={index}>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {each?.name}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                                                {each?.email}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                                                {each?.role ? "Admin" : "User"}
                                            </td>
                                            <td className="whitespace-nowrap  px-4 py-2 text-gray-700 dark:text-white">
                                                <button
                                                    onClick={() => handleMakeAdmin(each?._id)}
                                                    className="btn "
                                                >
                                                    Make Admin
                                                </button>
                                            </td>
                                            <td className={`whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white ${each?.membership == 'Bronze' ? 'text-yellow-700' : 'text-red-600'}`}>
                                                {each?.membership}
                                            </td>
                                        </tr>
                                    )
                                }
                                if (isAllMeals) {
                                    return (
                                        <tr key={index}>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{each?.name}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{each?.reactionCount}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{each?.reviews_count}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{each?.rating}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{each?.distributorName}</td>
                                            <td className="whitespace-nowrap flex gap-3 px-4 py-2 text-gray-700 dark:text-white ">
                                                <Link state={each} to={`/dashboard/update-meal`} className="btn btn-ghost">
                                                    <FaEdit className="text-blue-500 " />
                                                </Link>
                                                <button onClick={() => handleMealDelete(each?._id)} className="btn btn-ghost">
                                                    <FaTrash className="text-red-500 " />
                                                </button>
                                                <Link to={`/meal-details/${each?._id}`} className="btn btn-ghost">view</Link>
                                            </td>
                                        </tr>

                                    )
                                }
                                if (isUpcoming) {
                                    return <tr key={index}>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{each?.name}</td>

                                        <td className="whitespace-nowrap px-4 py-2">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={each?.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{each?.reactionCount}</td>

                                        <td className="whitespace-nowrap flex gap-3 px-4 py-2 text-gray-700 dark:text-white ">
                                            {/* publish button  */}
                                            <button onClick={() => handleMealPublish(each, axiosSecure, refetch)} className="btn btn-primary">Publish</button>
                                            {/* upcoming meal add Link */}
                                            <Link state={each} to={`/dashboard/add-upcoming`} className="btn btn-primary">
                                                Add
                                            </Link>
                                        </td>
                                    </tr>
                                }
                                if (isPayment) {
                                    return <tr key={index}>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{each?.user_email}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{each?.price}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-blue-500">{each?.transactionId}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{each?.payment_date}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-green-600">{each?.status}</td>
                                    </tr>
                                }
                                if (isRequested) {
                                    return <tr key={index}>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{each?.meal_name}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{each?.reactionCount}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-blue-500">{each?.reviews_count}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-yellow-400">{each?.status}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                            <button onClick={() => handleRequestDelete(each?._id)} className="btn btn-error text-white">
                                                Cancel
                                            </button>
                                        </td>

                                    </tr>
                                }
                                if (isServeMeal) {
                                    return <tr key={index}>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{each?.meal_name}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{each?.user_name}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{each?.user_email}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-yellow-400">{each?.status}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                            <button onClick={() => handleMealServe(each?._id)} className="btn btn-success text-white">
                                                {each?.status == "pending" ? "Serve" : "Served"}
                                            </button>
                                        </td>

                                    </tr>
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>

            {/* pagination component */}

            <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
                <ol className="flex justify-end gap-1 text-xs font-medium">

                    {/* previous button  */}
                    <li>
                        <button
                            onClick={() => {
                                currentPage > 0 ? setCurrentPage(currentPage - 1) : Swal.fire({ icon: 'warning', title: 'No more page forward' })
                            }}
                            className="btn"
                        >
                            <span className="sr-only">Prev Page</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </li>

                    {/* all pages with number 1,2,3... */}

                    {
                        pageNumbers.map((pageNumber, index) => {
                            // console.log('page',pageNumber , typeof(pageNumber));
                            return <li key={index}>
                                <button
                                    className={`btn ${currentPage === pageNumber ? "btn-active" : ""}`}
                                    onClick={() => {
                                        setCurrentPage(pageNumber)
                                    }}
                                >
                                    {pageNumber}
                                </button>
                            </li>
                        })
                    }

                    {/* next button  */}

                    <li>
                        <button
                            onClick={() => {
                                currentPage < pageNumbers.length - 1 ? setCurrentPage(currentPage + 1) :
                                    Swal.fire({ icon: 'warning', title: 'end of the page' })
                            }}
                            className="btn"
                        >
                            <span className="sr-only">Next Page</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default CustomTable;