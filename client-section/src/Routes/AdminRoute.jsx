import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";


const AdminRoute = ({ children }) => {

    const { user, loading } = useAuth();

    const { isAdmin, isAdminLoading } = useAdmin(); //console.log('isAdmin from admin route', isAdmin);

    const { pathname } = useLocation();

    // console.log(pathname);

    if (loading || isAdminLoading) {
        return <>Loading...</>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate state={pathname} to={`/login`}></Navigate>
};

export default AdminRoute;