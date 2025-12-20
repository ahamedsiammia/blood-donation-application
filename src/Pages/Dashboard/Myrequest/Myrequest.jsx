import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router";

const Myrequest = () => {
  const axiosSecure = useAxiosSecure();
  const [totalRequest, setTotalRequest] = useState(0);
  const [myrequest, setMyrequest] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('');


   const handleStatusChange =(event)=>{
    const value = event.target.value;
    setSelectedStatus(value);
    setCurrentPage(1)
  }

  const fetchRequest = () => {
    axiosSecure
      .get(`/My-request?page=${currentPage - 1}&size=${itemPerPage}&status=${selectedStatus}`)
      .then((res) => {
        setMyrequest(res.data.request);
        setTotalRequest(res.data.totalRequest);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchRequest();
  }, [axiosSecure, currentPage, itemPerPage,selectedStatus]);

  const numberofPages = Math.ceil(totalRequest / itemPerPage);

  const pages = [...Array(numberofPages).keys()].map((e) => e + 1);

  const handlePre = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // delete

  const handleDelete = (id) => {
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
        axiosSecure
          .delete(`/Delete-request?id=${id}`)
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              title: "Deleted!",
              text: "Your Request has been deleted.",
              icon: "success",
            });
            fetchRequest();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  // cenceled
  const hendleCencel = (id, status) => {
    axiosSecure
      .patch(`/cancel-request?id=${id}&status=${status}`)
      .then((res) => {
        console.log(res.data);
        fetchRequest();
        toast.success("your request cencel successfull");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Done
  const hendleDone = (id, status) => {
    axiosSecure
      .patch(`/done-request?id=${id}&status=${status}`)
      .then((res) => {
        fetchRequest();
        toast.success("Your request done");
        console.log(res.data);
      })
      .catch((error) => {
        toast.error("your request not done");
        console.log(error);
      });
  };

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
        <div className="text-black mb-4">
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="select lg:w-[200px] sm:w-auto p-2 rounded-lg border-black bg-lime-300"
          >
            <option value=" " disabled={true} >Filter with Status</option>
            <option value="panding">panding</option>
            <option value="Done">Done</option>
            <option value="inprogress">inprogress</option>
            <option value="canceled">canceled</option>
          </select>
        </div>
    
        {/* Donation Requests Table */}

        <div className="overflow-x-auto">
          <div className="sm:hidden">
            
              {
                  myrequest.length === 0 && <p className=" my-5 text-xl text-red-500 text-center font-bold">No Request Found Please Add Request</p>
                }


            {/* Mobile Card Layout */}
            {myrequest.map((request, index) => (
              <div key={request._id} className="bg-base-200 rounded-lg p-4 mb-4 shadow">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">#{currentPage * 10 + (index + 1) - 10}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                        request.status === "panding"
                          ? "bg-yellow-500"
                          : request.status === "inprogress"
                          ? "bg-blue-500"
                          : request.status === "canceled"
                          ? "bg-red-500"
                          : request.status === "Done"
                          ? "bg-green-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Recipient Name: </span>
                    <span>{request.recipientName}</span>
                  </div>
                  <div>
                    <span className="font-medium">Location: </span>
                    <span>{request.hospitalName}</span>
                  </div>
                  <div>
                    <span className="font-medium">Date: </span>
                    <span>{request.donationDate}</span>
                  </div>
                  <div>
                    <span className="font-medium">Time: </span>
                    <span>{request.donationTime}</span>
                  </div>
                  <div>
                    <span className="font-medium">Blood Group: </span>
                    <span className="badge badge-error">{request.blood}</span>
                  </div>
                  {request.status === "inprogress" && (
                    <div>
                      <span className="font-medium">Donor Email: </span>
                      <span>{request.requesterEmail}</span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Link to={`/dashboard/view-request/${request._id}`}>
                      <button className="btn btn-xs btn-outline">View</button>
                    </Link>
                    {request.status === "inprogress" && (
                      <>
                        <button
                          onClick={() => hendleDone(request._id, "Done")}
                          className="btn btn-xs btn-outline"
                        >
                          Done
                        </button>
                        <button
                          onClick={() =>
                            hendleCencel(request._id, "canceled")
                          }
                          className="btn btn-xs btn-outline btn-error"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {request.status === "pending" && (
                      <>
                        <Link to={`/dashboard/edit-request/${request._id}`}>
                          <button className="btn btn-xs btn-outline text-green-500">Edit</button>
                        </Link>
                        <button
                          onClick={() => handleDelete(request._id)}
                          className="btn btn-xs btn-outline"
                        >
                          <RiDeleteBin6Line size={15} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          

          {/* Desktop Table Layout */}
          <div className="hidden sm:block">
             <table className="table table-zebra w-full">
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
                      <td>{currentPage * 10 + (index + 1) - 10}</td>
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

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                            request.status === "panding"
                           ? "bg-yellow-500"
                          : request.status === "inprogress"
                          ? "bg-blue-500"
                          : request.status === "canceled"
                          ? "bg-red-500"
                          : request.status === "Done"
                          ? "bg-green-500"
                          : "bg-gray-500"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      {request.status === "inprogress" ? (
                        <>{request.requesterEmail}</>
                      ) : (
                        "-"
                      )}
                      <td className="space-x-1">
                        {request.status === "inprogress" && (
                          <>
                            <button
                              onClick={() => hendleDone(request._id, "Done")}
                              className="btn btn-xs btn-outline"
                            >
                              Done
                            </button>
                            <button
                              onClick={() =>
                                hendleCencel(request._id, "canceled")
                              }
                              className="btn btn-xs btn-outline btn-error"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        
                        <Link to={`/Dashboard/view-request/${request._id}`} ><button  className="btn btn-xs btn-outline">View</button></Link>

                       {
                        request.status === "panding" && <> 

                          <Link to={`/Dashboard/edit-request/${request._id}`}><button className="btn btn-xs btn-outline text-green-500">Edit</button></Link>

                         <button
                          onClick={() => handleDelete(request._id)}
                          className="btn btn-xs btn-outline "
                        >
                          <RiDeleteBin6Line size={15} />
                        </button>
                        </>
                       }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              
                {
                  myrequest.length === 0 && <p className=" my-20 text-4xl text-red-500 text-center font-bold">No Request Found Please Add Request</p>
                }

          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="flex justify-center mt-12 gap-5 flex-wrap">
    <button onClick={handlePre} className="btn">
      pre
    </button>
    {pages.map((page) => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`btn ${
          page === currentPage ? " bg-[#435585] text-white " : " "
        }`}
      >
        {page}
      </button>
    ))}
    <button onClick={handleNext} className="btn">
      Next
    </button>
  </div>
</div>

  );
};

export default Myrequest;
