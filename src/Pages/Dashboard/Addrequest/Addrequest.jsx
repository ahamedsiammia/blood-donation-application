import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Addrequest = () => {
  const { user } = use(AuthContext);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);

  const axiosSecure =useAxiosSecure()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios.get("/upazilas.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("/districts.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const onSubmit = async (data) => {
    const {
      requestMessage,
      donationTime,
      donationDate,
      blood,
      fullAddress,
      hospitalName,
      upazila,
      district,
      recipientName,
      requesterEmail,
      requesterName, 
    } = data;

    const formData ={
        requestMessage,
      donationTime,
      donationDate,
      blood,
      fullAddress,
      hospitalName,
      upazila,
      district,
      recipientName,
      requesterEmail,
      requesterName,
      status:"panding"
    }

    await axiosSecure.post("/request",formData)
    .then(res =>{
        console.log(res.data);
        alert("Your Request Successfull")
    })
    .then(error =>{
        console.log(error)
        toast.error("Your Request Not Successfull")
    })



    console.log(data);
    reset();
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      <div className="w-full max-w-2xl shadow-xl rounded-2xl p-6">
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Blood Donation Request Form
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Requester Name */}
            <div>
              <label className="block mb-1 font-medium">Requester Name</label>
              <input
                type="text"
                readOnly
                placeholder={user?.displayName}
                className="w-full p-2 rounded-lg border"
                {...register("requesterName")}
              />
            </div>

            {/* Requester Email */}
            <div>
              <label className="block mb-1 font-medium">Requester Email</label>
              <input
                type="email"
                readOnly
                placeholder={user?.email}
                className="w-full p-2 rounded-lg border"
                {...register("requesterEmail")}
              />
            </div>

            {/* Recipient Name */}
            <div>
              <label className="block mb-1 font-medium">Recipient Name</label>
              <input
                type="text"
                className="w-full p-2 rounded-lg border"
                {...register("recipientName", { required: true })}
              />
              {errors.recipientName && (
                <p className="text-red-500 text-sm">
                  Recipient name is required
                </p>
              )}
            </div>

            {/* select district */}

            <label className="block font-medium">District</label>
            <select
              defaultValue={"Select Your District"}
              className="select w-full p-2 rounded-lg border-black"
              {...register("district")}
            >
              <option disabled={true}>Select Your District</option>
              {districts.map((district) => (
                <option key={district.id} value={district?.name}>
                  {district?.name}
                </option>
              ))}
            </select>

            {/* Upazila Selector */}
            <label className="block font-medium">Upazila</label>
            <select
              defaultValue={"Select Your Upazila"}
              className="select w-full p-2 rounded-lg border-black"
              {...register("upazila")}
            >
              <option disabled={true}>Select Your Upazila</option>
              {upazilas.map((upazila) => (
                <option key={upazila.id} value={upazila?.name}>
                  {upazila?.name}
                </option>
              ))}
            </select>

            {/* Hospital Name */}
            <div>
              <label className="block mb-1 font-medium">Hospital Name</label>
              <input
                type="text"
                className="w-full p-2 rounded-lg border"
                placeholder="Dhaka Medical College Hospital"
                {...register("hospitalName", { required: true })}
              />
            </div>

            {/* Full Address */}
            <div>
              <label className="block mb-1 font-medium">
                Full Address Line
              </label>
              <input
                type="text"
                className="w-full p-2 rounded-lg border"
                placeholder="Zahir Raihan Rd, Dhaka"
                {...register("fullAddress", { required: true })}
              />
            </div>

            {/* Blood Group Selector */}
            <div>
              <label className="block font-medium" htmlFor="bloodGroup">
                Blood Group
              </label>
              <select
                defaultValue={"Select Blood Group"}
                className="select w-full p-2 rounded-lg border-black"
                {...register("blood")}
              >
                <option disabled={true}>Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* Donation Date */}
            <div>
              <label className="block mb-1 font-medium">Donation Date</label>
              <input
                type="date"
                className="w-full p-2 rounded-lg border"
                {...register("donationDate", { required: true })}
              />
            </div>

            {/* Donation Time */}
            <div>
              <label className="block mb-1 font-medium">Donation Time</label>
              <input
                type="time"
                className="w-full p-2 rounded-lg border"
                {...register("donationTime", { required: true })}
              />
            </div>

            {/* Request Message */}
            <div>
              <label className="block mb-1 font-medium">Request Message</label>
              <textarea
                className="w-full p-2 rounded-lg border"
                rows={4}
                placeholder="Explain why blood is needed..."
                {...register("requestMessage", { required: true })}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-lg py-3 btn bg-lime-500 rounded-xl"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addrequest;
