import React, { use } from "react";
import Donor from "./Donor";
import { AuthContext } from "../../../Context/AuthContext";
import Admin from "./Admin";
import DashboardChart from "./DashboardChart";

const MainDashboard = () => {
  const {user,role}=use(AuthContext);
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="text-2xl font-semibold">Welcome, {user?.displayName} 👋</h2>
          <p className="text-gray-500">
            Here are your recent donation requests
          </p>
        </div>
      </div>

      {
        role === "donor" && <Donor></Donor>
      }
      {
        role === "admin" && <>
        <Admin></Admin> 

        </>
      }
      
      {
        role === "volunteer" && <>
        <Admin></Admin>

        </>        
      }

      <div>
        <DashboardChart></DashboardChart>
      </div>
      
     
    </div>
  );
};

export default MainDashboard;
