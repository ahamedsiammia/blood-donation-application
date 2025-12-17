import axios from 'axios';
import React, { use } from 'react';
import { BiDonateBlood } from 'react-icons/bi';
import { AuthContext } from '../../Context/AuthContext';

const Funding = () => {
    const {user}=use(AuthContext);
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
    }
    return (
        <div className='container mx-auto mt-10 p-4'>
            <h1 className='text-red-500 font-bold text-4xl text-center'>Funding Details</h1>
            <div>
                <form onSubmit={handleCheckout} >
                    <div className='lg:flex  gap-5 mt-5 '>
                        <input name='donateAmount' type="number" className=' appearance-none rounded-lg border border-gray-300 p-2  text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 ' placeholder='Amount' />

                    <button type='submit' className='btn text-teal-700 p-5 '> <span><BiDonateBlood size={20} /></span> Give Funding </button>
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
                    <tr>
                      <td>er</td>
                      <td>request.recipientName</td>
                      <td>request.hospitalName</td>
                      <td>request.hospitalName</td>
                    </tr> 
                </tbody>
              </table>
            </div>
            </div>
        </div>
    );
};

export default Funding;