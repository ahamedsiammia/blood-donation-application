import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Allrequest = () => {
  const axiosSecure = useAxiosSecure();
  const [allrequest, setAllrequest] = useState([]);
  const [totalRequest, setTotalRequest] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchRequest = ()=>{
        axiosSecure
      .get(`/All-request?page=${currentPage - 1}&size=${itemPerPage}`)
      .then((res) => {
        console.log(res.data);
        setAllrequest(res.data.request);
        setTotalRequest(res.data.totalRequest);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchRequest()

  }, []);

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



  return (
    <div>
      <div className="max-w-7xl mx-auto p-6">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            {/* Page Title */}
            <h2 className="text-2xl font-semibold mb-4">
              🩸 All Donation Requests
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
                        <span className="badge badge-info">
                          {request.status}
                        </span>
                      </td>
                      <td>-</td>
                      <td className="space-x-1">
                        <button className="btn btn-xs btn-outline">Edit</button>
                        <button
                          onClick={()=>handleDelete(`${request._id}`)}
                          className="btn btn-xs btn-outline btn-error"
                        >
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
