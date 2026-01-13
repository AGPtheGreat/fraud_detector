import {useAuth} from "./UseAuth.jsx";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoutesManager = () => {
    const {user, userRole} = useAuth()

    return (user && userRole === 'manager') ? <Outlet /> : <Navigate to="/login"/>;
}

export default PrivateRoutesManager;