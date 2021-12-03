import React from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import AuthService from './services/auth.service';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const location = useLocation();
    
    return (
    <Route {...rest}>
        {!AuthService.getCurrentUser === true ? <Component /> : <Navigate to={{ pathname: "/", state: { from: location }}} />}
    </Route>
    );
};

export default PrivateRoute;
