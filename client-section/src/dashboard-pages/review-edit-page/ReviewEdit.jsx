import { useRef } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ReviewEdit = () => {

    const { state } = useLocation();

    const textareaRef = useRef();
    const axiosSecure = useAxiosSecure();

    const handleReviewUpdate = async () => {

        let reviewText = textareaRef.current.value

        try {
            const res = await axiosSecure.patch(`/review/${state._id}`, { reviewText });// console.log(res.data);

            if (res.data.modifiedCount) {
                Swal.fire({ icon: 'success', title: 'review updated' })
                reviewText = '';
            }
        } catch (error) {

        }

    }

    return (
        <div className="w-[90%] mx-auto mt-12 lg:mt-16">
            <label htmlFor="OrderNotes" className="sr-only">Order notes</label>

            <div
                className="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
                <textarea
                    id="OrderNotes"
                    className="w-full resize-none border-none align-top p-4 focus:ring-0 sm:text-sm"
                    rows="4"
                    placeholder="Enter any additional order notes..."
                    defaultValue={state?.reviewText}
                    ref={textareaRef}
                ></textarea>

                <div className="flex items-center justify-end gap-2 bg-white p-3">
                    <button
                        onClick={() => {
                            textareaRef.current.value = '';
                        }}
                        type="button"
                        className="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
                    >
                        Clear
                    </button>

                    <button
                        onClick={handleReviewUpdate}
                        type="button"
                        className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewEdit;