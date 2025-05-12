import { useRef } from "react";
import useAuth from "../../Hooks/useAuth";
import useReviews from "../../Hooks/useReviews";
import Swal from "sweetalert2";
import SectionTitle from "../../shared-component/section-title/SectionTitle";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ReviewSection = ({ info }) => {

    const {
        name,
        image,
        category,
        price,
        mealType,
        _id,
        like
    } = info;

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { reviews, refetch } = useReviews(undefined, undefined, _id);
    const textareaRef = useRef();


    const handleAddReview = () => {

        const userReview = {
            reviewText: textareaRef.current.value,
            meal_name: name,
            meal_id: _id,
            meal_category: category,
            meal_type: mealType,
            user_email: user?.email,
            likes_count: like,
        }
        try {
            axiosSecure.post('/review', userReview)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({ icon: "success", title: "your review added successfully" });
                        textareaRef.current.value = '';
                    }
                    refetch();
                })
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className="min-h-[50vh] space-y-12 my-12 lg:space-y-16">
            {/* <h2 className="text-3xl lg:text-4xl text-center text-green-500 font-semibold animate-bounce italic"> User Reviews ({reviewCount})</h2> */}
            <SectionTitle title={`user reviews (${reviews.length})`} />

            <div className={`grid grid-cols-1 lg:${reviews.length ? 'grid-cols-2 gap-2' : 'grid-cols-1 w-[80vw]'} mx-auto`}>

                {/* container for showing reviews  */}
                <div>
                    {
                        reviews.map((review, index) => {
                            return <article key={index} className="rounded-xl border-2 border-gray-100 mb-2">
                                <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">

                                    <div>
                                        <h3 className="font-medium sm:text-lg">
                                            <a href="#" className="hover:underline"> {review?.meal_name} </a>
                                        </h3>

                                        <p className="line-clamp-2 text-sm text-gray-700">
                                            {review?.reviewText}
                                        </p>

                                        <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                                            <div className="flex items-center gap-1 text-gray-500">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="size-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                                                    />
                                                </svg>

                                                <p className="text-xs">14 words</p>
                                            </div>

                                            <span className="hidden sm:block" aria-hidden="true">&middot;</span>

                                            <p className="hidden sm:block sm:text-xs sm:text-gray-500">
                                                Posted by
                                                <a href="#" className="font-medium underline hover:text-gray-700"> {review?.user_email} </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <strong
                                        className="-me-[2px] -mb-[2px] inline-flex items-center gap-1 rounded-ss-xl rounded-ee-xl bg-green-600 px-3 py-1.5 text-white"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                            />
                                        </svg>

                                        <span className="text-[10px] font-medium sm:text-xs">Good Review!</span>
                                    </strong>
                                </div>
                            </article>
                        })
                    }
                </div>
                {/* container for posting reviews  */}
                <div className="w-full mx-auto">
                    <label htmlFor="OrderNotes" className="sr-only">Order notes</label>

                    <div
                        className="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                        <textarea
                            id="OrderNotes"
                            className="w-full resize-none border-none align-top focus:ring-0 sm:text-sm p-4"
                            rows="4"
                            placeholder="Please Enter Your review for this food..."
                            ref={textareaRef}
                        ></textarea>

                        <div className="flex items-center justify-end gap-2 p-3">
                            <button
                                onClick={(e) => {
                                    textareaRef.current.value = '';
                                }}
                                type="button"
                                className="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
                            >
                                Clear
                            </button>

                            <button
                                onClick={handleAddReview}
                                type="button"
                                className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewSection;