import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { useParams } from 'react-router';
import axios from 'axios';

const Viewmyrequest = () => {
    const {user}=use(AuthContext);
    const {id}=useParams()
    const [data,setData]=useState(null)
    console.log(data);
    useEffect(()=>{
        axios.get(`http://localhost:5000/Dashboard/view-request/${id}`)
        .then(res =>{
            setData(res.data)
        })
    },[id])
    return (
        <div className="max-w-xl mx-auto">
  <div className="card bg-base-100 shadow-xl border border-base-300">
    
    {/* Header */}
    <div className="flex items-center justify-between px-6 py-4 border-b">
      <div>
        <h2 className="text-lg font-bold text-primary">
          {data?.recipientName}
        </h2>
        <p className="text-sm text-gray-500">
          Requested by {data?.requesterName}
        </p>
      </div>

      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
          data?.status === "pending"
            ? "bg-yellow-500"
            : data?.status === "inprogress"
            ? "bg-blue-500"
            : data?.status === "canceled"
            ? "bg-red-500"
            : "bg-green-500"
        }`}
      >
        {data?.status}
      </span>
    </div>

    {/* Body */}
    <div className="card-body space-y-4">
      {/* Blood + Hospital */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-red-50 text-center">
          <p className="text-sm text-gray-500">Blood Group</p>
          <p className="text-2xl font-bold text-red-600">
            {data?.blood}
          </p>
        </div>

        <div className="p-4 rounded-lg bg-blue-50">
          <p className="text-sm text-gray-500">Hospital</p>
          <p className="font-semibold">
            {data?.hospitalName}
          </p>
        </div>
      </div>

      {/* Location */}
      <div>
        <p className="text-sm text-gray-500">Location</p>
        <p className="font-medium">
          {data?.fullAddress}, {data?.upazila}, {data?.district}
        </p>
      </div>

      {/* Date & Time */}
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500">Donation Date</p>
          <p className="font-medium">{data?.donationDate}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Time</p>
          <p className="font-medium">{data?.donationTime}</p>
        </div>
      </div>

      {/* Message */}
      <div className="bg-base-200 p-4 rounded-lg">
        <p className="text-sm text-gray-500 mb-1">Request Message</p>
        <p className="text-sm">{data?.requestMessage}</p>
      </div>
    </div>

    {/* Footer */}
    <div className="px-6 py-4 border-t text-sm text-gray-500 flex justify-between">
      <span>Email: {data?.requesterEmail}</span>
      <span>
        Created: {new Date(data?.createAt).toLocaleDateString()}
      </span>
    </div>
  </div>
</div>

    );
};

export default Viewmyrequest;