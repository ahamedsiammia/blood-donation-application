import React, { use } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({children}) => {
    const {user,loading,roleLoading}=use(AuthContext);

    const location =useLocation();

    if(loading || roleLoading){
        return <p>loading...</p>
    }

    if(user){
        return children
    }

    return <Navigate state={location.pathname} to="/Login" ></Navigate>
};

export default PrivetRoute;