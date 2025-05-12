import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const Private = ({ children }) => {

    const { user, loading } = useAuth();

    const { pathname } = useLocation();

    // console.log(pathname);


    if (loading) {
        return <span className="loading loading-ball loading-xl"></span>
    }

    if (user) {
        return children;
    }

    return <Navigate state={pathname} to={`/login`}></Navigate>

};

export default Private;