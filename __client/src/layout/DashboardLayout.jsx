import { CgAdd, CgGift, CgProfile } from "react-icons/cg";
import { FaBurger, FaPaypal, FaUserGroup } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import { PiBowlFood } from "react-icons/pi";
import { FaGift, FaHome } from "react-icons/fa";
import useAdmin from "../Hooks/useAdmin";
import { MdOutlineUpcoming } from "react-icons/md";


const DashboardLayout = () => {

    const { isAdmin } = useAdmin(); //console.log('isAdmin from dashboard layout', isAdmin);

    return (
        <div className='flex min-h-screen'>
            {/* dashboard navigation sidebar  */}
            <div className='w-[20%] bg-cyan-600 dark:bg-slate-800 dark:text-white'>
                {/* navlinks in sidebar for routing */}
                <ul className="menu space-y-8 mt-8 lg:mt-12 w-[70%] md:scale-90 mx-auto">
                    {
                        isAdmin ? <>
                            {/* admin links  */}
                            <li><NavLink to={`/dashboard/admin-profile`}><CgProfile /><span className="hidden md:block">Admin Profile</span></NavLink></li>
                            <li><NavLink to={`/dashboard/manage-users`}><FaUserGroup /><span className="hidden md:block">Manage Users</span></NavLink></li>
                            <li><NavLink to={`/dashboard/all-reviews`}><FaGift /><span className="hidden md:block">All Reviews</span></NavLink></li>
                            <li><NavLink to={`/dashboard/all-meals`}><FaBurger /><span className="hidden md:block">All Meals</span></NavLink></li>
                            <li><NavLink to={`/dashboard/add-meal`}><CgAdd /><span className="hidden md:block">Add Meal</span></NavLink></li>
                            <li><NavLink to={`/dashboard/all-upcoming`}><MdOutlineUpcoming /><span className="hidden md:block">Meals Upcoming</span></NavLink></li>
                            <li><NavLink to={`/dashboard/serve-meal`}><PiBowlFood /><span className="hidden md:block">Serve Meal</span></NavLink></li>
                        </>
                            : <>
                                {/* user links  */}
                                <li><NavLink to={`/dashboard/user-profile`}><CgProfile /><span className="hidden md:block">My Profile</span></NavLink></li>
                                <li><NavLink to={`/dashboard/requested-meal`}><FaBurger /><span className="hidden md:block">Requested Meal</span></NavLink></li>
                                <li><NavLink to={`/dashboard/users-review`}><CgGift /><span className="hidden md:block">My Reviews</span></NavLink></li>
                                <li><NavLink to={`/dashboard/payment-history`}><FaPaypal /><span className="hidden md:block">Payment History</span></NavLink></li>
                            </>
                    }
                    <hr />
                    {/* shared links */}
                    <li><NavLink to={`/`}><FaHome /><span className="hidden md:block">Home</span></NavLink></li>
                    {/* <li><NavLink to={'/our-menu'}><FaSearch />Menu</NavLink></li>
                    <li><NavLink to={'/our-shop/salad'}><FaShoppingCart />Shop</NavLink></li>
                    <li><NavLink><FaEnvelope />Contact</NavLink></li> */}
                </ul>
            </div>
            {/* dashboard pages  */}
            <div className='w-[78%] dark:bg-slate-700'>
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default DashboardLayout;