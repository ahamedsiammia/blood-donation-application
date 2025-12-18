import { HeartHandshake } from 'lucide-react';
import React, { use, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

const DonationDetails = () => {
    const navigate =useNavigate()
    const [details,setDetails]=useState(null)
    const {id}=useParams();
    const axiosSecure =useAxiosSecure();
    const {user}=use(AuthContext);
    useEffect(()=>{
      axios.get(`http://localhost:5000/donation-details/${id}`)
      .then(res=>{
        setDetails(res.data)
      })
      .catch(error =>{
        console.log(error);
      })
    },[id])

    // donate 
    const hendleDonate =(id,status)=>{
      Swal.fire({
  title:`Do you want to Donate?  ${user?.email}  `,
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: "Donate",
  denyButtonText: `Don't save`
}).then((result) => {
  if (result.isConfirmed) {
    
  axiosSecure.patch(`/donate?id=${id}&status=${status}`)
  .then(res=>{
    Swal.fire("Your Donate success", "", "success");
    console.log(res.data);
    navigate("/donation-request")
  })
  .catch(error =>{
    console.log(error);
  })

  } else if (result.isDenied) {
    Swal.fire("Your Donate Not Successfull", "", "info");
  }
});
    }
   
    return (
        <div>
             <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <HeartHandshake className="w-10 h-10 text-pink-500 mb-2" />
          <h1 className="text-2xl font-semibold text-pink-500">
            Donation Requests Details
          </h1>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <p className='text-lg'><span className="font-semibold">Requester Name:</span> {details?.requesterName}</p>

            <p className='text-lg'><span className="font-semibold">Recipient Name:</span> {details?.recipientName}</p>

            <p className='text-lg'><span className="font-semibold">District:</span> {details?.district}</p>

            <p className='text-lg'><span className="font-semibold">Full Address:</span> {details?.fullAddress}</p>
            
         
          </div>

          <div className="space-y-3">
            <p className='text-lg'><span className="font-semibold">Requester email:</span> {details?.requesterEmail}</p>

            <p className='text-lg'><span className="font-semibold">Blood Group:</span> {details?.blood}</p>

            <p className='text-lg'><span className="font-semibold">Upazila:</span> {details?.upazila}</p>

            <p className='text-lg'><span className="font-semibold">Hospital Name:</span> {details?.hospitalName}</p>
          
            <p className="text-orange-500 text-lg font-semibold">Status: {details?.status}</p>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-10">
          <button onClick={()=>hendleDonate( details?._id, "inprogress")} className="px-8 py-2 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition">
            Donate
          </button>
        </div>
      </div>
    </div>
        </div>
    );
};

export default DonationDetails;