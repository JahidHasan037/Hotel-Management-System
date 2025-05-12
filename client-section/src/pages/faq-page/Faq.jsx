import SectionTitle from "../../shared-component/section-title/SectionTitle";


const Faq = () => {
    return (
        <section id="faq">

            <SectionTitle title={"frequently asked questions"}/>

            <div className="space-y-4">
                <details
                    className="group border-s-4 border-green-500 dark:border-blue-300 dark:bg-slate-600 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
                    open
                >
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                            How can I book a room in the hostel?
                        </h2>

                        <span className="shrink-0 rounded-full bg-white dark:bg-blue-300 p-1.5 text-gray-900 dark:text-white sm:p-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </summary>

                    <p className="mt-4 leading-relaxed text-gray-700 dark:text-white">
                        To book a room, log in to your account, go to the "Room Booking" section, choose an available room, and confirm your booking.
                    </p>
                </details>

                <details
                    className="group border-s-4 border-green-500 dark:border-blue-300 dark:bg-slate-600 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
                >
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                            Can I change or cancel my meal plan?
                        </h2>

                        <span className="shrink-0 rounded-full bg-white dark:bg-blue-300 p-1.5 text-gray-900 dark:text-white sm:p-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </summary>

                    <p className="mt-4 leading-relaxed text-gray-700 dark:text-white">
                        Yes, you can change or cancel your meal plan by visiting the "Meal Management" section in your dashboard and selecting the desired option.
                    </p>
                </details>

                <details
                    className="group border-s-4 border-green-500 dark:border-blue-300 dark:bg-slate-600 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
                >
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                            How can I submit a review for a meal?
                        </h2>

                        <span className="shrink-0 rounded-full bg-white dark:bg-blue-300 p-1.5 text-gray-900 dark:text-white sm:p-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </summary>

                    <p className="mt-4 leading-relaxed text-gray-700 dark:text-white">
                        After logging in, visit the "Meal Details" page for the meal you want to review, and fill out the review form.
                    </p>
                </details>

                <details
                    className="group border-s-4 border-green-500 dark:border-blue-300 dark:bg-slate-600 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
                >
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                            What are the subscription packages available?
                        </h2>

                        <span className="shrink-0 rounded-full bg-white dark:bg-blue-300 p-1.5 text-gray-900 dark:text-white sm:p-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </summary>

                    <p className="mt-4 leading-relaxed text-gray-700 dark:text-white">
                        We offer Bronze, Silver, Gold, and Platinum subscription packages with varying features, including exclusive access to premium meals.
                    </p>
                </details>
            </div>
        </section>
    );
};

export default Faq;