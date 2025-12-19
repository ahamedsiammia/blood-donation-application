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
        <div className='container mx-auto mt-10 p-4'>
            <h1 className='text-red-500 font-bold text-4xl text-center'>Funding Details</h1>
            <div>
                <form onSubmit={handleCheckout} >
                    <div className='lg:flex  gap-5 mt-5 '>
                        <input name='donateAmount' type="number" className=' appearance-none rounded-lg border border-gray-300 p-2  focus:outline-none focus:ring-2 focus:ring-teal-400 ' placeholder='Amount'  min={1} />

                    <button type='submit' className='btn  text-red-500 p-5 '> <span><BiDonateBlood size={20} /></span> Give Funding </button>
                    </div>
                </form>

                <div className="overflow-x-auto mt-5 ">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th> Funding Date</th>
                  </tr>
                </thead>
                <tbody>
                    {
                      funding.map((fund,index)=><tr key={index}>
                      <td>{index+1}</td>
                      <td>{fund?.donorName}</td>
                      <td>{fund?.amount}</td>
                      <td>{fund?.paidAt}</td>
                    </tr> )
                    }
                </tbody>
              </table>
            </div>
            </div>
        </div>
    );
};

export default Funding;