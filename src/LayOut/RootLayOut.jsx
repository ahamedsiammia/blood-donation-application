import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navber/Navber';
import Footer from '../Components/Footer/Footer';

const RootLayOut = () => {
    return (
        <div className='flex flex-col min-h-screen '>
            <Navbar></Navbar>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayOut;