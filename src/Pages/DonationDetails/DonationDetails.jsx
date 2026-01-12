import { HeartHandshake } from 'lucide-react';
import React, { use, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import Loading from '../../Components/Loading/Loading';

const DonationDetails = () => {
    const navigate =useNavigate()
    const [details,setDetails]=useState(null)
    const {id}=useParams();
    const axiosSecure =useAxiosSecure();
    const {user,loading}=use(AuthContext);
    useEffect(()=>{
      axios.get(`https://project11-server.vercel.app/donation-details/${id}`)
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
  denyButtonText: `Don't Donate`
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

    if(loading){
      return <Loading></Loading>
    }
   
    return (
 
    <div className="min-h-screen  flex items-center justify-center p-4">
    <div className="w-full max-w-5xl  rounded-3xl shadow-xl overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-red-500 p-8 text-center text-white">
        <HeartHandshake className="w-12 h-12 mx-auto mb-3" />
        <h1 className="text-3xl font-bold">Donation Request Details</h1>
        <p className="text-sm opacity-90 mt-1">
          Help save a life by donating blood
        </p>
      </div>

      {/* Body */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-pink-500 border-b pb-2">
            Request Information
          </h2>

          <p><span className="font-semibold">Requester Name:</span> {details?.requesterName}</p>
          <p><span className="font-semibold">Requester Email:</span> {details?.requesterEmail}</p>
          <p><span className="font-semibold">Recipient Name:</span> {details?.recipientName}</p>
          <p><span className="font-semibold">Blood Group:</span> 
            <span className="ml-2 px-3 py-1 rounded-full bg-red-100 text-red-600 font-semibold">
              {details?.blood}
            </span>
          </p>
        </div>

        {/* Right Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-pink-500 border-b pb-2">
            Location & Status
          </h2>

          <p><span className="font-semibold">District:</span> {details?.district}</p>
          <p><span className="font-semibold">Upazila:</span> {details?.upazila}</p>
          <p><span className="font-semibold">Hospital:</span> {details?.hospitalName}</p>
          <p><span className="font-semibold">Full Address:</span> {details?.fullAddress}</p>

          <div>
            <span className="font-semibold">Status:</span>
            <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold
              ${details?.status === "pending" ? "bg-yellow-100 text-yellow-600" : 
                details?.status === "inprogress" ? "bg-blue-100 text-blue-600" : 
                "bg-green-100 text-green-600"}`}>
              {details?.status}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <div className="p-8 flex justify-center">
        <button
          onClick={() => hendleDonate(details?._id, "inprogress")}
          className="px-10 py-3 rounded-full bg-gradient-to-r from-pink-500 to-red-500 
          text-white font-semibold text-lg shadow-md hover:scale-105 transition-transform"
        >
          Donate Now 
        </button>
      </div>
    </div>
  </div>
  
    );
};

export default DonationDetails;