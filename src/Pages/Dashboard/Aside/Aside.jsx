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
    const [active,setActive]=useState("dashboard")

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
        className="lg:hidden p-4 text-2xl fixed top-2 left-2 z-50 bg-red-500 text-white rounded-lg shadow-md"
      >
        {open ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>

      {/* ASIDE AREA */}
      <aside className={`
          fixed lg:static top-0 z-30 left-0 h-full w-64 bg-orange-600 text-white p-6 flex flex-col justify-between 
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
              to="/dashboard"
               onClick={() => {setOpen(false);setActive("dashboard")}}
              className={ 
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  active === "dashboard" ? "bg-green-500" : ""
                }`
              }
            >
              <AiFillDashboard size={20} />
              <span>Main Dashboard</span>
            </NavLink>

            {/* Add request */}
           {
            role == "donor" &&  <NavLink
              to="/dashboard/Add-request"
              onClick={() => {setOpen(false);setActive("Add-request")}}
              className={ 
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  active === "Add-request" ? "bg-green-500" : ""
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
              to="/dashboard/All-user"
               onClick={() => {setOpen(false);setActive("All-user")}}
              className={ 
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  active === "All-user" ? "bg-green-500" : ""
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
              to="/dashboard/My-request"
               onClick={() => {setOpen(false);setActive("My-request")}}
              className={ 
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  active === "My-request" ? "bg-green-500" : ""
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
              to="/dashboard/All-request"
               onClick={() => {setOpen(false);setActive("All-request")}}
              className={ 
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  active === "All-request" ? "bg-green-500" : ""
                }`
              }
            >
              <GiAnatomy size={20} />
              <span>All Request</span>
            </NavLink>
            }

            {
              role == "volunteer" && <NavLink
              to="/dashboard/All-request"
                onClick={() => {setOpen(false);setActive("All-request")}}
              className={ 
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  active === "All-request" ? "bg-green-500" : ""
                }`
              }
            >
              <GiAnatomy size={20} />
              <span>All Request</span>
            </NavLink>
            }


              {/* profile */}
            <NavLink
              to="/dashboard/profile"
               onClick={() => {setOpen(false);setActive("profile")}}
              className={ 
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  active === "profile" ? "bg-green-500" : ""
                }`
              }
            >
              <CgProfile  size={20} />
              <span>Profile</span>
            </NavLink>



          </nav>
        </div>

         

        {/* LOGOUT BUTTON */}
       <div className="border-t ">
         <button onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-lg w-full hover:bg-red-600 transition ">
          <AiOutlineLogout size={20} />
          Logout
        </button>
       </div>
      </aside>



    </div>
  );
};

export default Aside;
