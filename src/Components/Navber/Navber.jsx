import React, {useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { BiLogOutCircle,} from 'react-icons/bi';
import { LuLayoutDashboard } from 'react-icons/lu';
import { FaTint } from 'react-icons/fa';

const Navbar = () => {
    const { user, LogOut ,loading} =useContext(AuthContext)
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
        LogOut()
            .then(() => {
                toast.success('Logged out successfully')
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return (
      <div className='shadow-lg lg:sticky lg:top-0 lg:z-50 lg:bg-base-100'>
          <div className="flex flex-col gap-3 md:flex-row justify-between items-center p-5   max-w-screen-xl mx-auto">
            <div className="flex items-center gap-1 mb-3 ">
                <FaTint className="text-white text-3xl text-red-500 animate-bounce" size={40} color='red' />
                <h2 className="text-2xl  font-bold tracking-wide"><span className='text-red-500'>Blood</span> Donation</h2>
            </div>
            <div className="nav flex flex-col md:flex-row gap-5 items-center text-lg ">
                <NavLink to="/" className={({ isActive }) => isActive ?
                    "text-red-600 underline" : ""}>Home</NavLink>

                    {/* donation request  */}
                <NavLink to="/donation-request" className={({ isActive }) => isActive ?
                    "text-red-600 underline" : ""}>Donation Request</NavLink>

                <NavLink to="/blog" className={({ isActive }) => isActive ?
                    "text-red-600 underline" : ""}>Blog</NavLink>

                <NavLink to="/search-request" className={({ isActive }) => isActive ?
                    "text-red-600 underline" : ""}>Search </NavLink>


                <NavLink to="/funding" className={({ isActive }) => isActive ?
                    "text-red-600 underline" : ""}>Funding</NavLink>

            </div>

            <div className='flex justify-center items-center gap-4'>
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

                                    <Link to={"/Dashboard"} className='text-lg' > <span><LuLayoutDashboard /></span> Dashboard</Link>
                                </li>

                                <li>
                                    <button onClick={handleLogout} className='text-lg'> <span><BiLogOutCircle /></span> Logout</button>
                                </li>
                            </ul>

                        </div>
                    ) : (
                        <div className='flex gap-3 '>
                            <div className="login-btn">
                                <Link to='/login' className="btn text-white bg-red-500  px-10 ">Login</Link>
                            </div>
                            <div className="login-btn">
                                <Link to='/register' className="btn text-white bg-red-500 px-10 ">Sign Up</Link>
                            </div>
                        </div>
                    )
                }

<ToastContainer></ToastContainer>

            </div>
        </div>
      </div>
    );
};

export default Navbar;