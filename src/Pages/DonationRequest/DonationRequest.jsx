import React, { useEffect, useState } from "react";
import ShowDonationRequest from "./ShowDonationRequest";
import axios from "axios";

const DonationRequest = () => {
  const [pnadingData, setPandingData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/donation-page").then((res) => {
      console.log(res.data);
      setPandingData(res.data)
    })
    .catch(error =>{
        console.log(error);
    })
  }, []);

  if(pnadingData.length == 0){
    return   <div className="text-center text-gray-500 mt-10">
          No requests found.
        </div>
  }

  return (
    <div className="container mx-auto">
      <div className="text-center text-3xl font-bold mt-3 mb-10">
        <h1 className="text-red-500">All Donation Requests</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6">
        {
            pnadingData.map((data,index)=> <ShowDonationRequest key={index} data={data} ></ShowDonationRequest>)
        }
      </div>
    </div>
  );
};

export default DonationRequest;
