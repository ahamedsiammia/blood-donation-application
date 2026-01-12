import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const DashboardChart = () => {


const COLORS = ["#EF4444", "#3B82F6"];
const axiosSecure= useAxiosSecure()

const [value,setValue]=useState([])
const [donorvalue,setDonorvalue]=useState([])
const newvalue = donorvalue.length

  useEffect(()=>{
    axiosSecure.get("/All-request")
    .then(res=>{
      setValue(res.data.totalRequest); 
    })
    .catch(error =>{
      console.log(error);
    })
  },[axiosSecure,value])

  useEffect(()=>{
    axiosSecure.get("/donors")
    .then(res=>{
      setDonorvalue(res.data)
    })
    .catch(error=>{
      console.log(error);
    })
  },[axiosSecure])

  const data = [
  { name: "Blood Requests", value: value },
  { name: "Donors", value: newvalue },
];

  return (
        <div className="bg-gradient-to-br from-white/70 to-gray-100 rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Donors vs Blood Requests
      </h2>

      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={50}
              paddingAngle={5}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: "14px", fontWeight: 500 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;

