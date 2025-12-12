import React, { use } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({children}) => {
    const {user,loading}=use(AuthContext);

    const location =useLocation();

    if(loading){
        return <p>loading...</p>
    }

    if(user){
        return children
    }

    return <Navigate state={location.pathname} to="/" ></Navigate>
};

export default PrivetRoute;