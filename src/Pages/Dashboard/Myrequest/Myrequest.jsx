import React, { use, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Myrequest = () => {
  const axiosSecure = useAxiosSecure();
  const [totalRequest, setTotalRequest] = useState(0);
  const [myrequest, setMyrequest] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchRequest =()=>{
       axiosSecure
      .get(`/My-request?page=${currentPage - 1}&size=${itemPerPage}`)
      .then((res) => {
        setMyrequest(res.data.request);
        setTotalRequest(res.data.totalRequest);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchRequest()
  }, [axiosSecure, currentPage, itemPerPage]);

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


  // delete 

    const handleDelete = (id) => {
      console.log(id);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
         axiosSecure.delete(`/Delete-request?id=${id}`)
         .then(res=>{
           Swal.fire({
            title: "Deleted!",
            text: "Your Request has been deleted.",
            icon: "success",
          });
          fetchRequest()
         })
         .catch(error =>{
          console.log(error);
         })
        }
      });
    };


    // cenceled 
    const hendleCencel =(id,status)=>{
      axiosSecure.patch(`/cancel-request?id=${id}&status=${status}`)
      .then(res =>{
        console.log(res);
        toast.success("your cencel successfull")
      })
      .catch(error =>{
        console.log(error);
      })
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
                      {
                        request.status === "inprogress" ? <>
                        {request.requesterEmail}
                        </> : "-"
                      }
                      <td className="space-x-1">
                        {
                          request.status === "inprogress" && 
                         <>
                           <button className="btn btn-xs btn-outline">Done</button>
                        <button onClick={()=>hendleCencel(`${request._id},"canceled"`)} className="btn btn-xs btn-outline btn-error">
                          Cancel
                        </button>
                         </>
                        }
                        <button className="btn btn-xs btn-outline">View</button>

                        <button  onClick={()=>handleDelete(`${request._id}`)} className="btn btn-xs btn-outline">Delete</button>
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
