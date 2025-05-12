import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


export const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
};

export default useAuth;