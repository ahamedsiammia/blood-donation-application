import React, {useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Components/Loading/Loading';
import { BiMenuAltLeft } from 'react-icons/bi';
import { RiMenuSearchLine } from 'react-icons/ri';

const Alluser = () => {
    const axiosSecure =useAxiosSecure();
    const [users,setUsers]=useState([]);
    const [loading,setLoading]=useState(true)

    const fetchUser =()=>{
         axiosSecure.get("/All-user")
        .then(res=>{
            setUsers(res.data.user)
            setLoading(false)
        })
        .catch(error =>{
            console.log(error);
        })
    }

    useEffect(()=>{
       fetchUser()
    },[axiosSecure])

    const handleChangeStatus =(email,status)=>{
        axiosSecure.patch(`/update/status?email=${email}&status=${status}`)
        .then(res =>{
            console.log(res.data);
            fetchUser()
        })
    }

    const handlerole =(email,role)=>{
      axiosSecure.patch(`/update/role?email=${email}&role=${role}`)
      .then(res=>{
        console.log(res.data);
        fetchUser()
      })
      .catch(error =>{
        console.log(error);
      })
    }

    if(loading){
      return <Loading></Loading>
    }


    return (
//         <div>
            
//         <div className="lg:max-w-6xl  mx-auto p-6">
//   <div className="card bg-base-100 shadow-xl">
//     <div className="card-body">
//       <h2 className="card-title text-xl mb-4">All Users</h2>

//        {/* User Table  */}
//       <div className="overflow-x-auto">
//         <table className="table table-zebra">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Avatar</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Row 1: Active User  */}
//             {
//                 users.map((user,index)=>(
//                     <tr key={index}>
//               <td>{index+1}</td>
//               <td>
//                 <div className="avatar">
//                   <div className="lg:w-10 rounded-full">
//                     <img src={user?.image} alt="avatar" />
//                   </div>
//                 </div>
//               </td>
//               <td>{user?.name}</td>
//               <td>{user?.email}</td>
//               <td>{user?.role}</td>
//               <td>
//                 <span className={`badge ${user?.status === 'active' ? "badge-success":"badge-error"}`}>{user?.status}</span>
//               </td>

//               <td>
//    <div className="dropdown dropdown-end bg-lime-300">
//     <label tabIndex={0} className="btn btn-sm btn-outline">
//       Actions
//     </label>

//     <ul
//       tabIndex={0}
//       className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
//     >
//       {/* Block / Unblock */}
//       {
//         user?.status === "active" ? (
//           <li>
//             <button
//               onClick={() => handleChangeStatus(user?.email, "blocked")}
//               className="text-red-500"
//             >
//               Block User
//             </button>
//           </li>
//         ) : (
//           <li>
//             <button
//               onClick={() => handleChangeStatus(user?.email, "active")}
//               className="text-green-500"
//             >
//               Unblock User
//             </button>
//           </li>
//         )
//       }

//       {/* Role Actions */}
//       <li>
//         <button onClick={()=>{handlerole(user?.email,"volunteer")}}>
//           Make Volunteer
//         </button>
//       </li>

//       <li>
//         <button onClick={()=>{handlerole(user?.email,"admin")}}>
//           Make Admin
//         </button>
//       </li>
//     </ul>
//   </div>
// </td>
//             </tr>
//                 ))
//             }

//           </tbody>
//         </table>
//       </div>

//     </div>
//   </div>
// </div>


//         </div>
  <div>
  <div className="lg:max-w-6xl mx-auto p-4 sm:p-6">
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">

        <h2 className="card-title text-lg sm:text-xl mb-4 text-center sm:text-left">
          All Users
        </h2>

        {/* DESKTOP TABLE  */}


        <div className="hidden md:block overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td>
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={user?.image} alt="avatar" />
                      </div>
                    </div>
                  </td>

                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td className={`badge mt-5 ${
                    user?.role === "admin" ? "badge-error text-white" : user?.role === "donor"  ? "badge-info" :"badge-primary"
                  }`}>{user?.role}</td>

                  <td>
                    <span
                      className={`badge ${
                        user?.status === "active"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {user?.status}
                    </span>
                  </td>

                  <td>
                    <div className="dropdown dropdown-end">
                      <label
                        tabIndex={0}
                        
                      >
                        <RiMenuSearchLine size={24} />
                      </label>

                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
                      >
                        {user?.status === "active" ? (
                          <li>
                            <button
                              onClick={() =>
                                handleChangeStatus(
                                  user?.email,
                                  "blocked"
                                )
                              }
                              className="text-red-500"
                            >
                              Block User
                            </button>
                          </li>
                        ) : (
                          <li>
                            <button
                              onClick={() =>
                                handleChangeStatus(
                                  user?.email,
                                  "active"
                                )
                              }
                              className="text-green-500"
                            >
                              Unblock User
                            </button>
                          </li>
                        )}

                        <li>
                          <button
                            onClick={() =>
                              handlerole(user?.email, "volunteer")
                            }
                          >
                            Make Volunteer
                          </button>
                        </li>

                        <li>
                          <button
                            onClick={() =>
                              handlerole(user?.email, "admin")
                            }
                          >
                            Make Admin
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD VIEW  */}

        <div className="block md:hidden space-y-4">
          {users.map((user, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow border"
            >
              <div className="card-body p-4 text-sm space-y-2">

                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src={user?.image} alt="avatar" />
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-xs text-gray-500">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <p>
                  <b>Role:</b> {user?.role}
                </p>

                <p>
                  <b>Status:</b>{" "}
                  <span
                    className={`badge badge-sm ${
                      user?.status === "active"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {user?.status}
                  </span>
                </p>

                <div className="pt-2">
                  <div className="dropdown ">
                    <label
                      tabIndex={0}
                      className="btn btn-xs btn-outline w-full"
                    >
                      Actions <BiMenuAltLeft />
                    </label>

                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
                    >
                      {user?.status === "active" ? (
                        <li>
                          <button
                            onClick={() =>
                              handleChangeStatus(
                                user?.email,
                                "blocked"
                              )
                            }
                            className="text-red-500"
                          >
                            Block User
                          </button>
                        </li>
                      ) : (
                        <li>
                          <button
                            onClick={() =>
                              handleChangeStatus(
                                user?.email,
                                "active"
                              )
                            }
                            className="text-green-500"
                          >
                            Unblock User
                          </button>
                        </li>
                      )}

                      <li>
                        <button
                          onClick={() =>
                            handlerole(user?.email, "volunteer")
                          }
                        >
                          Make Volunteer
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={() =>
                            handlerole(user?.email, "admin")
                          }
                        >
                          Make Admin
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  </div>
</div>
    );
};

export default Alluser;