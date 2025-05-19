import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo/hostel-logo.jpg'
import { CgBell } from "react-icons/cg";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useDarkMode } from "../../Provider/DarkModeProvider";

const Navbar = () => {

    const { user, logoutUser } = useAuth();
    const { isDark, setIsDark } = useDarkMode();

    const navOptions = <>

        <li>
            <NavLink
                to="/"
                className={({ isActive }) => isActive ? "text-blue-500 font-bold" : "text-gray-700 dark:text-white"}
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/meals"
                className={({ isActive }) => isActive ? "text-blue-500 font-bold" : "text-gray-700 dark:text-white"}
            >
                Meals
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/upcoming-meals"
                className={({ isActive }) => isActive ? "text-blue-500 font-bold" : "text-gray-700 dark:text-white"}
            >
                Upcoming Meals
            </NavLink>
        </li>

    </>

    const handleLogout = () => {
        logoutUser()
            .then(res => {
                // console.log(res);
                Swal.fire({ icon: 'success', title: 'User Logged Out Successfully' })
            })
    }

    return (
        <div className="navbar bg-base-300 shadow-sm px-[3.6vw] fixed z-10 top-0 dark:bg-slate-800 dark:text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 dark:bg-slate-700 dark:text-white rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navOptions}
                    </ul>
                </div>
                {/* logo with website name  */}
                <div className="flex items-center">
                    <img className="h-15 rounded-2xl hidden lg:block" src={logo} alt="" />
                    <Link className="btn btn-ghost text-xl">Chill Hotel</Link>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end space-x-4">
                <CgBell className="text-2xl" />
                {/* toggle button  */}

                <input type="checkbox"
                    onChange={(e) => {
                        const darkMode = e.target.checked;
                        setIsDark(darkMode); //console.log('is dark mode', darkMode);
                        localStorage.setItem('darkMode', darkMode);
                    }}
                    className="toggle dark:text-blue-600"
                    checked={isDark}
                />

                {/* ------------------------ */}
                {
                    user ? <div>
                        <div className="dropdown dropdown-end">
                            {/* Profile Picture */}
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL} alt="Profile" />
                                </div>
                            </label>

                            {/* Dropdown Menu */}
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu p-2 shadow bg-base-100 dark:bg-slate-700 dark:text-white rounded-box w-52"
                            >
                                <li>
                                    <span >{user?.displayName}</span> {/* Non-clickable */}
                                </li>
                                <li>
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                        :
                        <Link to={`/login`} className="btn btn-primary rounded-2xl">Join Us</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;