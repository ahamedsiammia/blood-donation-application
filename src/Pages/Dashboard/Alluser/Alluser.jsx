import React, {  useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Alluser = () => {
    const axiosSecure =useAxiosSecure();
    const [users,setUsers]=useState([]);
    
    useEffect(()=>{
        axiosSecure.get("/All-user")
        .then(res=>{
            setUsers(res.data)
        })
        .catch(error =>{
            console.log(error);
        })
    },[axiosSecure])

    console.log(users);


    return (
        <div>
            
        <div class="max-w-6xl mx-auto p-6">
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-xl mb-4">All Users</h2>

       {/* User Table  */}
      <div class="overflow-x-auto">
        <table class="table table-zebra">
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
                <div class="avatar">
                  <div class="w-10 rounded-full">
                    <img src={user?.image} alt="avatar" />
                  </div>
                </div>
              </td>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.role}</td>
              <td>
                <span class="badge badge-success">{user?.status}</span>
              </td>
              <td>
                <button class="btn btn-sm btn-error">Block</button>
              </td>
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