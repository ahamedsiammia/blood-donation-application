import React, { use } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({children}) => {
    const {user,loading,roleLoading,status}=use(AuthContext);

    const location =useLocation();

    if(loading || roleLoading){
        return <p>loading...</p>
    }

    if(!user || !status == "active"){
        <Navigate state={location.pathname} to="/Login" ></Navigate>
    }

    return children
};

export default PrivetRoute;