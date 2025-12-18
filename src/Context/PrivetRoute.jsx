import React, { use } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading/Loading';

const PrivetRoute = ({children}) => {
    const {user,loading,roleLoading,status}=use(AuthContext);

    const location =useLocation();

    if(loading || roleLoading){
        return <Loading></Loading>
    }

    if(!user || !status == "active"){
        return <Navigate state={location.pathname} to="/Login" ></Navigate>
    }

    return children
};

export default PrivetRoute;