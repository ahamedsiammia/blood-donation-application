import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Link } from 'react-router';
import { RiDeleteBin6Line } from 'react-icons/ri';

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
              console.log(res);
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
          console.log(res);
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
          🩸 Resent Donation Requests
        </h2>

        {/* Donation Requests - Responsive Layout */}
        <div className="overflow-x-auto">
          {/* Desktop Table (visible on sm and above) */}
          <div className="hidden sm:block">
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
                {myrequest.map((request, index) => (
                  <tr key={request._id}>
                    <td>{index + 1}</td>
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
                    <td>
                      {request.status === "inprogress" ? (
                        request.requesterEmail
                      ) : (
                        "-"
                      )}
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
                      
                      <Link to={`/Dashboard/view-request/${request._id}`}>
                        <button className="btn btn-xs btn-outline">View</button>
                      </Link>

                      {request.status === "panding" && (
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="sm:hidden space-y-5">
            {myrequest.map((request, index) => (
              <div key={request._id} className="card bg-base-200 shadow-lg rounded-xl overflow-hidden">
                <div className="card-body p-5">
                  {/* Header: Serial + Status */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-primary">Request #{index + 1}</h3>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold text-white shadow-md ${
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
                      {request.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">👤 Recipient:</span>
                      <span>{request.recipientName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">🏥 Location:</span>
                      <span>{request.hospitalName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">📅 Date:</span>
                      <span>{request.donationDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">🕐 Time:</span>
                      <span>{request.donationTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">🩸 Blood Group:</span>
                      <span className="badge badge-error badge-lg">{request.blood}</span>
                    </div>

                    {request.status === "inprogress" && (
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">✉️ Donor Email:</span>
                        <span className="text-xs break-all">{request.requesterEmail}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="card-actions justify-end mt-5 pt-4 border-t border-base-300">
                    <div className="flex flex-wrap gap-2">
                      <Link to={`/Dashboard/view-request/${request._id}`}>
                        <button className="btn btn-sm btn-outline btn-primary">View</button>
                      </Link>

                      {request.status === "inprogress" && (
                        <>
                          <button
                            onClick={() => hendleDone(request._id, "Done")}
                            className="btn btn-sm btn-outline btn-success"
                          >
                            Done
                          </button>
                          <button
                            onClick={() => hendleCencel(request._id, "canceled")}
                            className="btn btn-sm btn-outline btn-error"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {request.status === "panding" && (
                        <>
                          <button className="btn btn-sm btn-outline btn-success">
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(request._id)}
                            className="btn btn-sm btn-outline btn-error"
                          >
                            <RiDeleteBin6Line size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Link to={"/Dashboard/My-request"}>
            <button className='btn bg-lime-500 hover:bg-lime-600'>My All Donation Request</button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>

    );
};

export default Donor;