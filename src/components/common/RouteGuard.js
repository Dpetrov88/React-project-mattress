import { Navigate, Outlet } from "react-router-dom"
import { useContext } from "react";

import {AuthContext} from '../../contexts/AuthContext'

export const RouteGuard = ({
    children,
}) => {
    const {isAuthenticated} = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to='/login'/>
    }

    return children ? children : <Outlet />;
};