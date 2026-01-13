import { Outlet, Navigate } from 'react-router-dom'
import {useAuth} from "./UseAuth.jsx";

const PrivateRoutesCustomer = () => {
    const {user, userRole} = useAuth()

    return (user && userRole === 'customer') ? <Outlet /> : <Navigate to="/login"/>
}

export default PrivateRoutesCustomer