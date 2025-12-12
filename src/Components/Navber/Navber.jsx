import React, {useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { FaPaw } from 'react-icons/fa';
import { AuthContext } from '../../Context/AuthContext';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';

const Navbar = () => {
    const { user, LogOut } =useContext(AuthContext)
    const [theme, setTheme] = useState(localStorage.getItem('theme') || "light")

    useEffect(() => {
        const html = document.querySelector('html')
        html.setAttribute("data-theme", theme)
        localStorage.setItem("theme", theme)
    }, [theme])


    const handleTheme = (checked) => {
        setTheme(checked ? "dark" : "light")
    }


    const handleLogout = () => {
        // console.log('user try to logout');
        LogOut()
            .then(() => {
                toast.success('Logged out successfully')
            })
            .catch((error) => {
                console.log(error);
            });

    }
    return (
        <div className="flex flex-col gap-3 md:flex-row justify-between items-center p-5  shadow-sm">
            {/* <div className=''>{user && user.email}</div> */}
            <div className="flex items-center gap-2 mb-3">
                <FaPaw className="text-3xl text-yellow-400" />
                <h2 className="text-2xl text-orange-900 font-bold tracking-wide">PawMart</h2>
            </div>
            <div className="nav flex flex-col md:flex-row gap-5 items-center">
                <NavLink to="/" className={({ isActive }) => isActive ?
                    "text-orange-700 underline" : ""}>Home</NavLink>

                {
                    user && (
                        <>
                            <NavLink to="add-listing" className={({ isActive }) => isActive ?
                                "text-orange-700 underline" : ""}>Add Listing</NavLink>
                        </>
                    )
                }

            </div>

            <div className='flex justify-center items-center gap-4'>
                {
                    user ? (
                        <div className="dropdown dropdown-end">

                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="User Avatar"
                                        src={user.photoURL || 'https://img.icons8.com/?size=64&id=115318&format=png'}
                                    />
                                </div>
                            </div>



                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box lg:w-52 space-y-5 "
                            >
                                <li>
                                    {/* <span className="font-semibold">
                                        {user.displayName || user.email}
                                    </span> */}
                                    <Link to={"/Dashboard"} className='text-lg' >Dashboard</Link>
                                </li>
                                {/* update profile */}

                                {/* <li>
                                    <span className="font-semibold">
                                        <Link to='/myprofile'>Update Profile</Link>
                                    </span>
                                </li> */}
                                <li>
                                    <div className="flex items-center gap-2">
                                        <span >
                                            <MdOutlineLightMode size={24} />
                                        </span>
                                        <input
                                            onChange={(e) => handleTheme(e.target.checked)}
                                            type="checkbox"
                                            defaultChecked={localStorage.getItem('theme') === "dark"}
                                            className="toggle"
                                        />
                                        <span>
                                            <MdDarkMode size={24} />
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className='text-lg'>Logout</button>
                                </li>
                            </ul>

                        </div>
                    ) : (
                        <div className='flex gap-3'>
                            <div className="login-btn">
                                <Link to='/login' className="btn btn-primary px-10 ">Login</Link>
                            </div>
                            <div className="login-btn">
                                <Link to='/register' className="btn btn-primary px-10 ">Sign Up</Link>
                            </div>
                        </div>
                    )
                }

<ToastContainer></ToastContainer>

            </div>
        </div>
    );
};

export default Navbar;