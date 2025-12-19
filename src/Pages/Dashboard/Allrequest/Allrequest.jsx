import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import Loading from "../../../Components/Loading/Loading";

const Allrequest = () => {
  const axiosSecure = useAxiosSecure();
  const [allrequest, setAllrequest] = useState([]);
  const [totalRequest, setTotalRequest] = useState(0);
  const [itemPerPage,setItePerPage]=useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading,setLoading]=useState(true);

  const handleStatusChange =(event)=>{
    const value = event.target.value;
    setSelectedStatus(value);
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
      <div className="max-w-7xl mx-auto p-6">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            {/* Page Title */}
            <h2 className="text-2xl font-semibold mb-4">
              🩸 My Donation Requests
            </h2>
            {/* Filter Section (Static UI Only) */}
        
             <div className="text-black">
              <select
                value={selectedStatus}
                onChange={handleStatusChange}
                className="select  p-2 rounded-lg border-black bg-lime-300"
                
              >
                <option value=" " disabled={true} >Filer with Status</option>
                <option value="panding">panding</option>
                <option value="Done">Done</option>
                <option value="inprogress">inprogress</option>
                <option value="canceled">canceled</option>
              </select>
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
                  {allrequest.map((request, index) => (
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
                              : request.status === "done"
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
            </div>
          </div>
        </div>
      </div>

      { 
        allrequest.length == 0 && <p className="text-4xl text-red-500 font-bold text-center">No Reusest Found</p>
      }

      <div className="flex justify-center mt-12 gap-5">
        <button onClick={handlePre} className="btn">
          pre
        </button>
        {pages.map((page) => (
          <button
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

export default Allrequest;
