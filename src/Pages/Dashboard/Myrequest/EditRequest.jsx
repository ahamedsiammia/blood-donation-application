import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../../Context/AuthContext';
import { toast } from 'react-toastify';

const EditRequest = () => {
    const {id} = useParams();
      const { user } = use(AuthContext);
      const [upazilas, setUpazilas] = useState([]);
      const [districts, setDistricts] = useState([]);
     const [data,setData]=useState(null)
     const navigate =useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:5000/Dashboard/edit-request/${id}`)
        .then(res =>{
            setData(res.data)
            console.log(res.data);
        })
        .catch(error =>{
            console.log(error);
        })
    },[id])


    
  const {
    register,
    handleSubmit,
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

  const onSubmit =async(data)=>{
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
    
       const formData = {
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
    };

    axios.put(`http://localhost:5000/Dashboard/update-request/${id}`,formData)
    .then(res =>{
        console.log(res.data);
        toast.success("your Update successfull")
            navigate("/Dashboard/My-request")
    })
    .catch(error =>{
        console.log(error);

    })

  }

    return (
            <div className="min-h-screen  flex items-center justify-center p-6">
      <div className="w-full max-w-2xl shadow-xl rounded-2xl p-6">
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Edit Your  Donation Request
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Requester Name */}
            <div>
              <label className="block mb-1 font-medium">Requester Name</label>
              <input
                type="text"
                readOnly
                value={user?.displayName || ""}
                placeholder={user?.displayName}
                className="w-full p-2 rounded-lg border bg-gray-100"
                {...register("requesterName")}
              />
            </div>

            {/* Requester Email */}
            <div>
              <label className="block mb-1 font-medium">Requester Email</label>
              <input
                type="email"
                readOnly
                value={user?.email || ""}
                placeholder={user?.email}
                className="w-full p-2 rounded-lg border bg-gray-100"
                {...register("requesterEmail")}
              />
            </div>

            {/* Recipient Name */}
            <div>
              <label className="block mb-1 font-medium">Recipient Name</label>
              <input
                type="text"
                className="w-full p-2 rounded-lg border"
                {...register("recipientName",{required:true})}
                defaultValue={data?.recipientName}
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
              defaultValue={data?.district}
              className="select w-full p-2 rounded-lg border-black"
              {...register("district",{required:true})}
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
              defaultValue={data?.upazila}
              className="select w-full p-2 rounded-lg border-black"
              {...register("upazila",{required:true})}
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
                defaultValue={data?.hospitalName}
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
                defaultValue={data?.fullAddress}
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
                {...register("blood" ,{required:true})}
              >
                <option >{data?.blood}</option>
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
                defaultValue={data?.donationDate}
              />
            </div>

            {/* Donation Time */}
            <div>
              <label className="block mb-1 font-medium">Donation Time</label>
              <input
                type="time"
                className="w-full p-2 rounded-lg border"
                {...register("donationTime", { required: true })}
                defaultValue={data?.donationTime}
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
                defaultValue={data?.requestMessage}
              ></textarea>
            </div>

            {/* Submit Button */}
           <div className='flex justify-between'>
             <Link to={"/Dashboard/My-request"}>
             <button
              
              className="text-lg py-3 btn bg-red-500 rounded-xl"
            >
              Cancel
            </button>
             </Link>

            <button
              type="submit"
              className=" text-lg py-3 btn bg-lime-500 rounded-xl"
            >
              Update Request
            </button>
           </div>
          </form>
        </div>
      </div>
    </div>

    );
};

export default EditRequest;