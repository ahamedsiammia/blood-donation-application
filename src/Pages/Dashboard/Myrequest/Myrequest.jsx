import React, { use, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext";

const Myrequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const [totalRequest, setTotalRequest] = useState(0);
  const [myrequest, setMyrequest] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axiosSecure
      .get(`/My-request?page=${currentPage - 1}&size=${itemPerPage}`)
      .then((res) => {
        setMyrequest(res.data.request);
        setTotalRequest(res.data.totalRequest);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user, axiosSecure, currentPage, itemPerPage]);

  const numberofPages = Math.ceil(totalRequest / itemPerPage);

  const pages = [...Array(numberofPages).keys()].map(e=>e+1)

  const handlePre =()=>{
    if(currentPage >1){
        setCurrentPage(currentPage -1)
    }
  }
  const handleNext = ()=>{
    if(currentPage <pages.length){
        setCurrentPage(currentPage+1)
    }
  }
  return (
    <div>
      <div className="max-w-7xl mx-auto p-6">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            {/* Page Title */}
            <h2 className="text-2xl font-semibold mb-4">
              🩸 My Donation Requests
            </h2>

            {/* Filter Section (Static UI Only) */}
            <div className="flex flex-wrap gap-3 mb-4">
              <button className="btn btn-sm btn-outline">All</button>
              <button className="btn btn-sm btn-outline">Pending</button>
              <button className="btn btn-sm btn-outline">In Progress</button>
              <button className="btn btn-sm btn-outline">Done</button>
              <button className="btn btn-sm btn-outline">Canceled</button>
            </div>

            {/* Donation Requests Table */}
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Recipient Name</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Blood Group</th>
                    <th>Status</th>
                    <th>Donor Info</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Pending Row */}
                  {myrequest.map((request, index) => (
                    <tr>
                      <td>{ (currentPage*10)+(index+1)-10}</td>
                      <td>{request.recipientName}</td>
                      <td>{request.hospitalName}</td>
                      <td>{request.donationDate}</td>
                      <td>{request.donationTime}</td>
                      <td>
                        <span className="badge badge-error">
                          {request.blood}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-info">
                          {request.status}
                        </span>
                      </td>
                      <td>-</td>
                      <td className="space-x-1">
                        <button className="btn btn-xs btn-outline">Edit</button>
                        <button className="btn btn-xs btn-outline btn-error">
                          Delete
                        </button>
                        <button className="btn btn-xs btn-outline">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-12 gap-5">
        <button onClick={handlePre} className="btn">pre</button>
        {pages.map((page) => (
          <button
          onClick={()=> setCurrentPage(page)}
            className={`btn ${
              page === currentPage
             ? " bg-[#435585] text-white ": " " }`}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNext} className="btn">Next</button>
      </div>
    </div>
  );
};

export default Myrequest;
