import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchButton = ({ inputStates }) => {

    const [isLoading, setIsLoading] = useState(true); // Manage loading state
    const {
        setSearchName,
        setSearchMail,
    } = inputStates;

    return (
        // <div className="w-[90%] mx-auto mt-12">
        //     <div className="dropdown">
        //         <div tabIndex={0} role="button" className="btn m-1"><FaSearch />Search</div>
        //         <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 space-y-2 shadow-sm">
        //             <li>
        //                 <label className="input">
        //                     <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
        //                     <input
        //                         onChange={(e) => {

        //                             setSearchName(e.target.value.toLowerCase())
        //                         }}
        //                         type="search"
        //                         required
        //                         placeholder="Search By userName" />
        //                 </label>
        //             </li>
        //             <li>
        //                 <label className="input">
        //                     <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
        //                     <input
        //                         onChange={(e) => {

        //                             setSearchMail(e.target.value.toLowerCase())
        //                         }}
        //                         type="search"
        //                         required
        //                         placeholder="Search By Email" />
        //                 </label>
        //             </li>
        //         </ul>
        //     </div>
        // </div>
        <div className="w-[90%] mx-auto mt-12">
            <div className="dropdown">
                <div
                    tabIndex={0}
                    role="button"
                    className="btn m-1"
                // No need for toggle function, DaisyUI will manage the dropdown visibility
                >
                    <FaSearch />Search
                </div>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 space-y-2 shadow-sm"
                    open={isLoading ? "true" : setIsLoading(false)} // Keep it open while loading
                >
                    <li>
                        <label className="input">
                            <svg
                                className="h-[1em] opacity-50"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input
                                onChange={(e) => {
                                    setSearchName(e.target.value.toLowerCase());
                                }}
                                type="search"
                                required
                                placeholder="Search By userName"
                            />
                        </label>
                    </li>
                    <li>
                        <label className="input">
                            <svg
                                className="h-[1em] opacity-50"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input
                                onChange={(e) => {
                                    setSearchMail(e.target.value.toLowerCase());
                                }}
                                type="search"
                                required
                                placeholder="Search By Email"
                            />
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SearchButton;