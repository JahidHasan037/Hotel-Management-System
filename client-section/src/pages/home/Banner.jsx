

const Banner = () => {
    return (

        <section
            className="relative bg-[url(https://images.pexels.com/photos/30338813/pexels-photo-30338813/free-photo-of-chef-preparing-fresh-handmade-pasta-in-kitchen.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] bg-cover bg-center bg-no-repeat"
        >
            <div
                className="absolute inset-0 bg-gray-900/75 dark:bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
            ></div>

            <div
                className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-[93vh] lg:items-center lg:px-8"
            >
                <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                    <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
                        Streamline Effortlessly

                        <strong className="block font-extrabold text-rose-500">  Get Meal   </strong>
                    </h1>

                    <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
                        Manage rooms, meals, and student activities in one place. Enhance efficiency and improve the hostel experience with ease!
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 text-center">
                        <label className="input">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                            <input type="search" className="grow" placeholder="Search" />
                            <kbd className="kbd kbd-sm dark:text-black">⌘</kbd>
                            <kbd className="kbd kbd-sm dark:text-black">K</kbd>
                        </label>

                        <a
                            href="#"
                            className="hidden lg:block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                        >
                            Find Meal
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;