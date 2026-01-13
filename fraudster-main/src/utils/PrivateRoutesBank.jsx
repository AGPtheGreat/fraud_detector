import {useAuth} from "./UseAuth.jsx";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoutesBank = () => {
    const {user, userRole} = useAuth()

    return (user && userRole === 'bank') ? <Outlet /> : <Navigate to="/login"/>;
}

export default PrivateRoutesBank;