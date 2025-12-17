import React from 'react';

const Donor = () => {
    return (
        <div className='max-w-7xl mx-auto'>
             <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h3 className="text-xl font-semibold mb-4">
            Recent Donation Requests
          </h3>

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
                {/* Row 1: Inprogress */}
                <tr>
                  <td>1</td>
                  <td>Karim Ahmed</td>
                  <td>Dhaka, Dhanmondi</td>
                  <td>12 Oct 2025</td>
                  <td>10:00 AM</td>
                  <td>
                    <span className="badge badge-error">O+</span>
                  </td>
                  <td>
                    <span className="badge badge-warning">In Progress</span>
                  </td>
                  <td>
                    <div className="text-sm">
                      <p>Rahim</p>
                      <p className="text-gray-500">rahim@mail.com</p>
                    </div>
                  </td>
                  <td className="space-x-1">
                    <button className="btn btn-xs btn-success">Done</button>
                    <button className="btn btn-xs btn-error">Cancel</button>
                    <button className="btn btn-xs btn-outline">Edit</button>
                    <button className="btn btn-xs btn-outline btn-error">
                      Delete
                    </button>
                    <button className="btn btn-xs btn-outline">View</button>
                  </td>
                </tr>

                {/* Row 2: Pending */}
                <tr>
                  <td>2</td>
                  <td>Salma Khatun</td>
                  <td>Chattogram, Panchlaish</td>
                  <td>15 Oct 2025</td>
                  <td>02:30 PM</td>
                  <td>
                    <span className="badge badge-error">A+</span>
                  </td>
                  <td>
                    <span className="badge badge-info">Pending</span>
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

                {/* Row 3: Done */}
                <tr>
                  <td>3</td>
                  <td>Hasan Ali</td>
                  <td>Rajshahi, Boalia</td>
                  <td>05 Oct 2025</td>
                  <td>11:00 AM</td>
                  <td>
                    <span className="badge badge-error">B+</span>
                  </td>
                  <td>
                    <span className="badge badge-success">Done</span>
                  </td>
                  <td>-</td>
                  <td>
                    <button className="btn btn-xs btn-outline">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* View All Button */}
          <div className="mt-6 text-right">
            <a
              href="/dashboard/my-donation-requests"
              className="btn btn-primary"
            >
              View My All Requests
            </a>
          </div>
        </div>
      </div>
        </div>
    );
};

export default Donor;