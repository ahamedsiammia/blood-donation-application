import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { BiDonateBlood } from 'react-icons/bi';
import { AuthContext } from '../../Context/AuthContext';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Components/Loading/Loading';

const Funding = () => {
    const {user}=use(AuthContext);
    const axiosSecure =useAxiosSecure();
    const [funding,setFunding]=useState([])
    const [loading,setLoading]=useState(true)

    const handleCheckout =(e)=>{
        e.preventDefault()
        const donateAmount =e.target.donateAmount.value;
        const donorEmail =user?.email;
        const donorName =user?.displayName;
     
        const formdata ={
            donorEmail,
            donorName,
            donateAmount
        }
        axios.post("http://localhost:5000/create-payment-checkout",formdata)
        .then(res =>{
            console.log(res.data);
            window.location.href=res.data.url
        })
        .catch(error =>{
          console.log(error);
        })
    }

    useEffect(()=>{
      axiosSecure.get("/payment-details")
      .then(res=>{
        setFunding(res.data)
        setLoading(false)
      })
      .catch(error =>{
        console.log(error);
      })
    },[axiosSecure])


if(loading){
  return <Loading></Loading>
}


    return (
        <div className="container mx-auto mt-10 p-4">
  <h1 className="text-red-500 font-bold text-2xl sm:text-4xl text-center">
    Funding Details
  </h1>

  <div>

    {/*  Donation Form  */}

    <form onSubmit={handleCheckout}>
      <div className="flex flex-col lg:flex-row gap-4 mt-5 items-center">
        <input
          name="donateAmount"
          type="number"
          className="appearance-none rounded-lg border border-gray-300 p-2 w-full lg:w-64 focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Amount"
          min={1}
        />

        <button
          type="submit"
          className="btn text-red-500 p-5 w-full lg:w-auto flex gap-2 items-center justify-center"
        >
          <BiDonateBlood size={20} /> Give Funding
        </button>
      </div>
    </form>

    {/*  DESKTOP TABLE  */}

    <div className="hidden md:block overflow-x-auto mt-5">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Funding Date</th>
          </tr>
        </thead>

        <tbody>
          {funding.map((fund, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{fund?.donorName}</td>
              <td>{fund?.amount}</td>
              <td>{fund?.paidAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/*  MOBILE CARD VIEW */}

    <div className="block md:hidden mt-5 space-y-4">
      {funding.map((fund, index) => (
        <div
          key={index}
          className="card bg-base-100 shadow border"
        >
          <div className="card-body p-4 text-sm space-y-1">
            <p>
              <b>#</b> {index + 1}
            </p>
            <p>
              <b>Name:</b> {fund?.donorName}
            </p>
            <p>
              <b>Amount:</b> {fund?.amount}
            </p>
            <p>
              <b>Funding Date:</b> {fund?.paidAt}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
    );
};

export default Funding;