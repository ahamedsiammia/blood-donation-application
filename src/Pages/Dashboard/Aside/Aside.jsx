import { Outlet, NavLink, useNavigate } from "react-router";
import { AiFillHome, AiFillDashboard, AiOutlineSetting, AiOutlineLogout, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { use, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { toast } from "react-toastify";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { FaUserNurse } from "react-icons/fa";
import { GiAnatomy } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { BiDonateBlood } from "react-icons/bi";

const Aside = () => {

    const {LogOut,role}=use(AuthContext);
    const navigate =useNavigate()
    const [open, setOpen] = useState(false);

    const handleLogout=()=>{
        LogOut()
        .then(result =>{
            toast.success("Your Logout Successfull")
            console.log(result);
            navigate('/')
        })
        .catch(error=>console.log(error))
    }

  return (
    <div className="flex min-h-screen">
    {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden p-4 text-2xl fixed top-2 left-2 z-50 bg-lime-500 text-white rounded-lg shadow-md"
      >
        {open ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>

      {/* ASIDE AREA */}
      <aside className={`
          fixed lg:static top-0 z-30 left-0 h-full w-64 bg-lime-500 text-white p-6 flex flex-col justify-between 
          transform transition-transform duration-300 
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
        <div>
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

          <nav className="space-y-3">
            {/* Home */}
            <NavLink
              to="/"
               onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  isActive ? "bg-indigo-600" : ""
                }`
              }
            >
              <AiFillHome size={20} />
              <span>Home</span>
            </NavLink>

            {/* Main Dashboard */}
            <NavLink
              to="/Dashboard"
               onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  isActive ? "bg-blue-600" : ""
                }`
              }
            >
              <AiFillDashboard size={20} />
              <span>Main Dashboard</span>
            </NavLink>

            {/* Add request */}
           {
            role == "donor" &&  <NavLink
              to="/Dashboard/Add-request"
               onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  isActive ? "bg-blue-600" : ""
                }`
              }
            >
              <VscGitPullRequestGoToChanges size={24} />
              <span>Add Request</span>
            </NavLink>

           }
            {/* Users */}
            {
              role == "admin" && <NavLink
              to="/Dashboard/All-user"
               onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  isActive ? "bg-green-600" : ""
                }`
              }
            >
              <FaUserNurse size={20} />
              <span>All Users</span>
            </NavLink>
            }

            {/* My Request */}
            {
              role == "donor" && 
              <NavLink
              to="/Dashboard/My-request"
               onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  isActive ? "bg-purple-600" : ""
                }`
              }
            >
              <BiDonateBlood size={20} />
              <span>My Request</span>
            </NavLink>
            }

            {/* all request */}
            {
              role == "admin" && <NavLink
              to="/Dashboard/All-request"
               onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  isActive ? "bg-purple-600" : ""
                }`
              }
            >
              <GiAnatomy size={20} />
              <span>All Request</span>
            </NavLink>
            }

            {
              role == "volunteer" && <NavLink
              to="/Dashboard/All-request"
               onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  isActive ? "bg-purple-600" : ""
                }`
              }
            >
              <GiAnatomy size={20} />
              <span>All Request</span>
            </NavLink>
            }


              {/* profile */}
            <NavLink
              to="/Dashboard/profile"
               onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  isActive ? "bg-yellow-600" : ""
                }`
              }
            >
              <CgProfile  size={20} />
              <span>Profile</span>
            </NavLink>



          </nav>
        </div>

         

        {/* LOGOUT BUTTON */}
        <button onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition">
          <AiOutlineLogout size={20} />
          Logout
        </button>
      </aside>



    </div>
  );
};

export default Aside;
