import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading/Loading";

const Profile = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [dbuser, setDbuser] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading,setLoading]=useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchUser =()=>{
    axiosSecure.get(`user-profile?email=${user?.email}`).then((res) => {
      setDbuser(res.data);
    });
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    axios.get("/upazilas.json").then((res) => {
      setUpazilas(res.data.upazilas);
      setLoading(false)
    });

    axios.get("/districts.json").then((res) => {
      setDistricts(res.data.districts);
      setLoading(false)
    });
  }, []);

  const onSubmit = async(data) => {
    const { name, district, upazila, blood ,photo } = data;
    const file =photo[0];

    const formData =new FormData()
    formData.append("image",file)

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=039ed19dd7ea9e86d51e69b5a3528627`,
      formData
    );

    const image =res.data.data.display_url
    const updateData ={
      name,
      district,
      upazila,
      blood,
      image
    }

    axiosSecure.patch("/update-profile",updateData)
    .then(res=>{
      updateProfile(user,{
        displayName:name,photoURL:image,upazila:upazila,district:district,blood:blood
      })
      console.log(res);
       fetchUser()
       setIsEditing(false)
        Swal.fire({
          title: "Your update successfull",
          icon: "success",
          draggable: true
        });
    })
    
  };

  if(loading){
    return <Loading></Loading>
  }
  return (

    <div className="max-w-6xl mx-auto bg-white border border-slate-200 rounded-lg p-8">

  {/* Profile Header */}
  <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b pb-8">
    
    {/* Profile Image */}
    <div className="flex flex-col items-center gap-4">
      <img
        src={dbuser.image}
        alt="Profile"
        className="w-40 h-40 rounded-full object-cover border-4 border-slate-200"
      />

      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="px-6 py-2 text-sm font-medium bg-red-500 text-white rounded-md hover:bg-red-800 transition"
        >
          Edit Profile
        </button>
      )}
    </div>

    {/* Basic Info */}
    <div className="flex-1 w-full">
      <h2 className="text-xl font-semibold text-slate-800">
        {user.displayName}
      </h2>
      <p className="text-sm text-slate-500 mt-1">
        Manage your personal and donation-related information
      </p>
    </div>
  </div>

  {/* Form */}
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
  >

    {/* Email */}
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        Email Address
      </label>
      <input
        type="text"
        readOnly
        value={dbuser.email}
        {...register("email")}
        className="w-full px-3 py-2 text-slate-700 rounded-md border border-slate-300 bg-slate-100 text-sm"
      />
    </div>

    {/* Name */}
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        Full Name
      </label>
      <input
        type="text"
        disabled={!isEditing}
        defaultValue={dbuser.name}
        {...register("name", { required: "please fill name" })}
        className="w-full px-3 py-2 text-slate-700 rounded-md border border-slate-300 text-sm disabled:bg-slate-100"
      />
      {errors.name && (
        <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
      )}
    </div>

    {/* Photo */}
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        Profile Photo
      </label>
      <input
        type="file"
        {...register("photo", { required: "please fill photo" })}
        className="w-full text-slate-700 text-sm px-3 py-2 border border-slate-300 rounded-md"
      />
      {errors.photo && (
        <p className="text-xs text-red-500 mt-1">{errors.photo.message}</p>
      )}
    </div>

    {/* Blood Group */}
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        Blood Group
      </label>
      <select
        disabled={!isEditing}
        {...register("blood", { required: "please fill blood group" })}
        className="w-full px-3 text-slate-700 py-2 rounded-md border border-slate-300 text-sm disabled:bg-slate-100"
      >
        <option>{dbuser.blood}</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>
      {errors.blood && (
        <p className="text-xs text-red-500 mt-1">{errors.blood.message}</p>
      )}
    </div>

    {/* District */}
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        District
      </label>
      <select
        disabled={!isEditing}
        {...register("district", { required: "please fill district" })}
        className="w-full px-3 py-2 text-slate-700 rounded-md border border-slate-300 text-sm disabled:bg-slate-100"
      >
        <option>{dbuser.district}</option>
        {districts.map((district) => (
          <option key={district.id} value={district.name}>
            {district.name}
          </option>
        ))}
      </select>
      {errors.district && (
        <p className="text-xs text-red-500 mt-1">{errors.district.message}</p>
      )}
    </div>

    {/* Upazila */}
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        Upazila
      </label>
      <select
        disabled={!isEditing}
        {...register("upazila", { required: "please fill upazila" })}
        className="w-full px-3 py-2 text-slate-700 rounded-md border border-slate-300 text-sm disabled:bg-slate-100"
      >
        <option>{dbuser.upazila}</option>
        {upazilas.map((upazila) => (
          <option key={upazila.id} value={upazila.name}>
            {upazila.name}
          </option>
        ))}
      </select>
      {errors.upazila && (
        <p className="text-xs text-red-500 mt-1">{errors.upazila.message}</p>
      )}
    </div>

    {/* Save Button */}
    {isEditing && (
      <div className="md:col-span-2 flex justify-end pt-4">
        <button
          type="submit"
          className="px-8 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition"
        >
          Save Changes
        </button>
      </div>
    )}

  </form>
</div>


  );
};

export default Profile;
