import React from 'react';
import { Link } from 'react-router';

const ShowDonationRequest = ({data}) => {
    const {blood,recipientName,fullAddress,donationDate,createAt,_id}=data;
    return (
        <div>
             <div className="bg-white  transition-all duration-300 ease-out 
      hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.03] rounded-2xl shadow-md p-6 border border-gray-100 flex flex-col justify-between "
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-100 pb-3">
                Blood Needs For:{" "}
                <span className="text-gray-900">{blood}</span>
              </h2>

              <div className="space-y-3 text-[15px] text-gray-600">
                <p>
                  <span className="font-bold text-gray-800">Recipient:</span>{" "}
                  {recipientName}
                </p>

                <p className="leading-relaxed">
                  <span className="font-bold text-gray-800">Address:</span>{" "}
                  {fullAddress}
                </p>

                <div className="flex justify-between items-start pt-2">
                  <p>
                    <span className="font-bold text-gray-800">Date:</span>{" "}
                    { donationDate || "2025-12-13"}
                  </p>
                  <p className="max-w-[120px] text-right">
                    <span className="font-bold text-gray-800">Time:</span>{" "}
                    {createAt || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50">
              <Link
                to={`/donation-details/${_id}`}
                className="bg-[#ff2d55] hover:bg-[#e6264a] text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-all active:scale-95 w-full"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
    );
};

export default ShowDonationRequest;