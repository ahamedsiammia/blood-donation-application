import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Donor = () => {
  const axiosSecure =useAxiosSecure()
  const [myrequest,setMyrequest]=useState([])

  const fetchRequest=()=>{
    axiosSecure.get("/resent-request")
    .then(res=>{
      console.log(res.data);
      setMyrequest(res.data)
    })
    .catch(error =>{
      console.log(error);
    })
  }

  useEffect(()=>{
    fetchRequest()
  },[])
  
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
          axiosSecure
            .delete(`/Delete-request?id=${id}`)
            .then((res) => {
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
                      <td> {index + 1} </td>
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

                          <button className="btn btn-xs btn-outline text-green-500">Edit</button>

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
    </div>
    );
};

export default Donor;