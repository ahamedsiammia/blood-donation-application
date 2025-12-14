import React, {useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Alluser = () => {
    const axiosSecure =useAxiosSecure();
    const [users,setUsers]=useState([]);

    const fetchUser =()=>{
         axiosSecure.get("/All-user")
        .then(res=>{
            setUsers(res.data)
            console.log(res.data);
        })
        .catch(error =>{
            console.log(error);
        })
    }

    useEffect(()=>{
       fetchUser()
    },[])

    const handleChangeStatus =(email,status)=>{
        axiosSecure.patch(`/update/status?email=${email}&status=${status}`)
        .then(res =>{
            console.log(res.data);
            fetchUser()
        })
    }


    return (
        <div>
            
        <div className="lg:max-w-6xl  mx-auto p-6">
  <div className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <h2 className="card-title text-xl mb-4">All Users</h2>

       {/* User Table  */}
      <div className="overflow-x-auto">
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
            {/* Row 1: Active User  */}
            {
                users.map((user,index)=>(
                    <tr key={index}>
              <td>{index+1}</td>
              <td>
                <div className="avatar">
                  <div className="lg:w-10 rounded-full">
                    <img src={user?.image} alt="avatar" />
                  </div>
                </div>
              </td>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.role}</td>
              <td>
                <span className="badge badge-success">{user?.status}</span>
              </td>

              {
                user?.status == "active" ? <td>
                <button onClick={()=>handleChangeStatus(user?.email,"blocked")} className="btn btn-sm btn-error">Blocked</button>
              </td>: <td>
                <button onClick={()=>handleChangeStatus(user?.email,"active")} className="btn btn-sm btn-ghost">Unblock</button>
              </td>
              }
             
              
              
              
            </tr>
                ))
            }

          </tbody>
        </table>
      </div>

    </div>
  </div>
</div>


        </div>
    );
};

export default Alluser;