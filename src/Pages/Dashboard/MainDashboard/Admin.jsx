import React, { useEffect, useState } from 'react';
import { FaHandHoldingUsd, FaHeartbeat, FaUsers } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { GiTakeMyMoney } from 'react-icons/gi';

const Admin = () => {
const axiosSecure=useAxiosSecure()
const [user,setUser]=useState('')
const [totalRequest,setTotalRequest]=useState("")
const [funding,setFunding]=useState([])


    useEffect(()=>{
         axiosSecure.get("/All-user")
        .then(res=>{
            setUser(res.data.totaluser)
            console.log(res.data);
        })
        .catch(error =>{
            console.log(error);
        })

          axiosSecure.get(`/All-request`)
      .then((res) => {
        console.log(res.data);
        setTotalRequest(res.data.totalRequest);
      })
      .catch((error) => {
        console.log(error);
      });
    },[axiosSecure])



     useEffect(()=>{
      axiosSecure.get("/payment-details")
      .then(res=>{
        setFunding(res.data)
      })
      .catch(error =>{
        console.log(error);
      })
    },[axiosSecure])

        const totalAmount = funding.reduce((total, payment) => {
                 return total + payment.amount;
           }, 0);



    return (
           <section className="w-full py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Total Users */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body flex flex-row items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-500 uppercase">
                Total Users
              </h3>
              <p className="text-3xl font-bold text-primary mt-2">
                {user}
              </p>
            </div>
            <div className="p-4 rounded-full bg-primary/10">
              <FaUsers className="text-3xl text-primary" />
            </div>
          </div>
        </div>

        {/* Total Funding */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body flex flex-row items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-500 uppercase">
                Total Funding
              </h3>
              <p className="text-3xl font-bold text-secondary mt-2 flex gap-3 items-center">
                 {totalAmount} <GiTakeMyMoney  />
              </p>
            </div>
            <div className="p-4 rounded-full bg-secondary/10">
              <FaHandHoldingUsd className="text-3xl text-secondary" />
            </div>
          </div>
        </div>

        {/* Total Donation Requests */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body flex flex-row items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-500 uppercase">
                Total Requests
              </h3>
              <p className="text-3xl font-bold text-accent mt-2">
                {totalRequest}
              </p>
            </div>
            <div className="p-4 rounded-full bg-accent/10">
              <FaHeartbeat className="text-3xl text-accent" />
            </div>
          </div>
        </div>

      </div>
    </section>
    );
};

export default Admin;