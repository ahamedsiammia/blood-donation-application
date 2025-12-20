import React, { use, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import Loading from "../../../Components/Loading/Loading";
import { AuthContext } from "../../../Context/AuthContext";

const Allrequest = () => {
  const axiosSecure = useAxiosSecure();
  const [allrequest, setAllrequest] = useState([]);
  const [totalRequest, setTotalRequest] = useState(0);
  const [itemPerPage,setItePerPage]=useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading,setLoading]=useState(true);
  const {role}=use(AuthContext);

  const handleStatusChange =(event)=>{
    const value = event.target.value;
    setSelectedStatus(value);
    setCurrentPage(1)
  }

console.log(selectedStatus);

  const fetchRequest = ()=>{
        axiosSecure
      .get(`/All-request?page=${currentPage - 1}&size=${itemPerPage}&status=${selectedStatus}`)
      .then((res) => {
        console.log(res.data);
        setAllrequest(res.data.request);
        setTotalRequest(res.data.totalRequest);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }


  useEffect(() => {
    
    fetchRequest()
  }, [axiosSecure,currentPage ,itemPerPage,selectedStatus]);

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

  // handle delete

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
  const hendleCencel = (id, status) => {
    axiosSecure
      .patch(`/cancel-request?id=${id}&status=${status}`)
      .then((res) => {
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


  if(loading){
    return <Loading></Loading>
  }


  return (

<div>
  <div className="max-w-7xl mx-auto p-4 sm:p-6">
    <div className="card bg-base-100 shadow">
      <div className="card-body">

        {/* Page Title */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left">
          🩸 My Donation Requests
        </h2>

        {/* Filter */}
        <div className="text-black mb-4 flex justify-center sm:justify-start">
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="select p-2 rounded-lg border-black bg-lime-300 w-full sm:w-64"
          >
            <option value=" " disabled>Filter with Status</option>
            <option value="panding">panding</option>
            <option value="Done">Done</option>
            <option value="inprogress">inprogress</option>
            <option value="canceled">canceled</option>
          </select>
        </div>

        {/*  DESKTOP TABLE  */}

        <div className="hidden md:block overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Recipient Name</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Blood</th>
                <th>Status</th>
                <th>Donor</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {allrequest.map((request, index) => (
                <tr key={request._id}>
                  <td>{currentPage * 10 + (index + 1) - 10}</td>
                  <td>{request.recipientName}</td>
                  <td>{request.hospitalName}</td>
                  <td>{request.donationDate}</td>
                  <td>{request.donationTime}</td>

                  <td>
                    <span className="badge badge-error">{request.blood}</span>
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
                          : request.status === "done"
                          ? "bg-gray-500"
                          : "bg-green-500"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>

                  <td>
                    {request.status === "inprogress"
                      ? request.requesterEmail
                      : "-"}
                  </td>

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
                          onClick={() => hendleCencel(request._id, "canceled")}
                          className="btn btn-xs btn-outline btn-error"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    <Link to={`/dashboard/view-request/${request._id}`}>
                      <button className="btn btn-xs btn-outline">View</button>
                    </Link>

                    {request.status === "panding" && (
                      <>
                        {role !== "volunteer" && (
                          <Link to={`/dashboard/edit-request/${request._id}`}>
                            <button className="btn btn-xs btn-outline text-green-500">
                              Edit
                            </button>
                          </Link>
                        )}

                        <button
                          onClick={() => handleDelete(request._id)}
                          className="btn btn-xs btn-outline"
                        >
                          <RiDeleteBin6Line size={15} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/*MOBILE CARD VIEW */}

        <div className="block md:hidden space-y-4">
          {allrequest.map((request, index) => (
            <div key={request._id} className="card bg-base-100 shadow border">
              <div className="card-body p-4 text-sm space-y-1">

                <p><b>#</b> {currentPage * 10 + (index + 1) - 10}</p>
                <p><b>Recipient:</b> {request.recipientName}</p>
                <p><b>Hospital:</b> {request.hospitalName}</p>
                <p><b>Date:</b> {request.donationDate}</p>
                <p><b>Time:</b> {request.donationTime}</p>

                <p>
                  <b>Blood:</b>
                  <span className="badge badge-error ml-2">
                    {request.blood}
                  </span>
                </p>

                <p>
                  <b>Status:</b>
                  <span
                    className={`ml-2 px-2 py-1 rounded text-white text-xs ${
                      request.status === "panding"
                        ? "bg-yellow-500"
                        : request.status === "inprogress"
                        ? "bg-blue-500"
                        : request.status === "canceled"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {request.status}
                  </span>
                </p>

                {request.status === "inprogress" && (
                  <p><b>Donor:</b> {request.requesterEmail}</p>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  <Link to={`/Dashboard/view-request/${request._id}`}>
                    <button className="btn btn-xs btn-outline">View</button>
                  </Link>

                  {request.status === "panding" && role !== "volunteer" && (
                    <Link to={`/Dashboard/edit-request/${request._id}`}>
                      <button className="btn btn-xs btn-outline text-green-500">
                        Edit
                      </button>
                    </Link>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  </div>

  {allrequest.length === 0 && (
    <p className="text-xl sm:text-4xl text-red-500 font-bold text-center">
      No Request Found
    </p>
  )}

  {/* Pagination */}
  <div className="flex flex-wrap justify-center mt-10 gap-2">
    <button onClick={handlePre} className="btn btn-sm sm:btn-md">Pre</button>

    {pages.map((page) => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`btn btn-sm sm:btn-md ${
          page === currentPage ? "bg-[#435585] text-white" : ""
        }`}
      >
        {page}
      </button>
    ))}

    <button onClick={handleNext} className="btn btn-sm sm:btn-md">Next</button>
  </div>
</div>
  
  );
};

export default Allrequest;
