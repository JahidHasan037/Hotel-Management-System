import {
    createBrowserRouter,
} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/home/Home";
import ErrorPage from "../pages/error-page/ErrorPage";
import Login from "../pages/auth-page/Login";
import Register from "../pages/auth-page/Register";
import MealDetails from "../pages/meal-details-page/MealDetails";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import AllMeals from "../pages/all-meals-page/AllMeals";
import DashboardLayout from "../layout/DashboardLayout";
import UserProfile from "../dashboard-pages/user-profile-page/UserProfile";
import Private from "./Private";
import UsersReview from "../dashboard-pages/my-reviews-page/UsersReview";
import ReviewEdit from "../dashboard-pages/review-edit-page/ReviewEdit";
import AdminRoute from "./AdminRoute";
import AdminProfile from "../dashboard-pages/admin-profile/AdminProfile";
import ManageUsers from "../dashboard-pages/manage-users/ManageUsers";
import AllReviews from "../dashboard-pages/all-reviews-page/AllReviews";
import AdminAllMeals from "../dashboard-pages/all-meals/AdminAllMeals";
import AddOrUpdateMeal from "../dashboard-pages/add-meal-admin-page/AddOrUpdateMeal";
import UpcomingMeals from "../pages/upcoming-meals-page/UpcomingMeals";
import AdminAllUpcoming from "../dashboard-pages/all-upcoming-meals/AdminAllUpcoming";
import Payment from "../pages/checkout-page/Payment";
import PaymentHistory from "../dashboard-pages/payment-history/PaymentHistory";
import RequestedMeal from "../dashboard-pages/requested-meal/RequestedMeal";
import ServeMeal from "../dashboard-pages/adimin-server-meal/ServeMeal";


const axiosPublic = useAxiosPublic();


export const router = createBrowserRouter([
    //normal routes
    {
        path: '',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'meals',
                element: <AllMeals />
            },
            {
                path: 'upcoming-meals',
                element: <UpcomingMeals />,
            },
            {
                path: 'meal-details/:id',
                element: <MealDetails />,
                loader: ({ params }) => axiosPublic.get(`/meals/${params.id}`)
            },
            {
                path: 'payment/:package',
                element: <Private><Payment /></Private>,
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    },
    //dashboard routes
    {
        path: 'dashboard',
        element: <Private> <DashboardLayout /></Private>,
        errorElement: <ErrorPage />,
        children: [
            // user routes 
            {
                path: 'user-profile',
                element: <UserProfile />
            },
            {
                path: 'users-review',
                element: <UsersReview />,
            },
            {
                path: 'review-edit',
                element: <ReviewEdit />
            },
            {
                path: 'payment-history',
                element: <PaymentHistory />
            },
            {
                path: 'requested-meal',
                element: <RequestedMeal />
            },
            //admin routes
            {
                path: 'admin-profile',
                element: <AdminRoute><AdminProfile /></AdminRoute>
            },
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers /></AdminRoute>
            },
            {
                path: 'all-reviews',
                element: <AdminRoute><AllReviews /></AdminRoute>
            },
            {
                path: 'all-meals',
                element: <AdminRoute><AdminAllMeals /></AdminRoute>
            },
            {
                path: 'add-meal',
                element: <AdminRoute><AddOrUpdateMeal /></AdminRoute>
            },
            {
                path: 'update-meal',
                element: <AdminRoute><AddOrUpdateMeal /></AdminRoute>
            },
            {
                path: 'all-upcoming',
                element: <AdminRoute><AdminAllUpcoming /></AdminRoute>
            },
            {
                path: 'add-upcoming',
                element: <AdminRoute><AddOrUpdateMeal /></AdminRoute>
            },
            {
                path: 'serve-meal',
                element: <AdminRoute><ServeMeal /></AdminRoute>
            },
        ]
    }

]);