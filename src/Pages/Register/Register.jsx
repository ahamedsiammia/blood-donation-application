import React, { use, useEffect, useState,  } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaTint } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";




const Register = () => {
  const [show, setShow] = useState(false);
  const { Creatuser,setUser } = use(AuthContext);
  const [upazilas,setUpazilas]= useState([]);
  const [districts,setDistricts]=useState([]);
  const navigate =useNavigate()

  useEffect(()=>{
    axios.get("/upazilas.json")
    .then(res =>{
      setUpazilas(res.data.upazilas);
    })

    axios.get("/districts.json")
    .then(res =>{
      setDistricts(res.data.districts);
    })
  },[])


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();



  const onSubmit = async (data) => {
    const { name, password, email, photo,blood,district,upazila ,Confirmpassword} = data;
    const file = photo[0];
    
    const formData = new FormData()
    formData.append("image", file)

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=039ed19dd7ea9e86d51e69b5a3528627`,
      formData
    );

    const image =res.data.data.display_url
    
    const userData ={
        name,
        password,
        email,
        image,
        blood,
        district,
        upazila
    }
    
    if(password == Confirmpassword){

       await Creatuser(email,password)
    .then(result=>{
        const user =result.user;
        updateProfile(user,{
          displayName: name,
          photoURL:image
        })
        setUser({...user,displayName:name,photoURL:image})
        console.log(result.user)

        // post user in database
        axios.post("https://project11-server.vercel.app/user",userData)
        .then(res =>{
          console.log(res);
            toast.success("your log register successfull")
            navigate('/')
        })
        .catch(error=>console.log(error))

    })
    .catch(error => {
        console.log(error)
    })
    reset()

    }
    else{
      toast.error("password did not match")
    }
   


  };



  return (
    <div className="flex justify-center my-5 min-h-screen items-center relative ">
      <div className="absolute left-35 ">
            <img className="  block md:hidden lg:block" src="https://i.postimg.cc/KjhpQqn0/freepik-upload-48477-removebg-preview.png" alt="" />
      </div>
      <div className="card bg-base-100 shrink-0 shadow-2xl ">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
          <h1 className="text-2xl font-bold text-red-400 text-center flex justify-center">  <FaTint className="text-white text-3xl text-red-500 animate-bounce" size={40} color='red' />
            Regester your account
          </h1>
          <fieldset className="fieldset grid grid-cols-1 lg:grid-cols-2">
            {/* Name field */}
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                placeholder="Your Name"
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 20,
                    message: "Name cannot be long",
                  },
                })}
              />

              {errors.name && (
                <p className="text-red-500 text-xs mt-l">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* email field */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please Enter the valid email",
                  },
                })}
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-l">
                  {errors.email.message}
                </p>
              )}
            </div>

              {/* Photo field */}
           <div>
             <label className="label">Photo Url</label>
            <input
              type="file"
              className="input"
              placeholder="Your Photo Url"
              {...register("photo", { required: "photo is required" })}
            />

           </div>

              {/* blood group */}
      
            <div>
              <label for="bloodGroup">Blood Group</label>
            <select defaultValue={"Select Blood Group"} className="select" {...register("blood")}>
              <option disabled={true} >Select Blood Group</option>
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

              {/* select district */}

               <div>
              <label for="district">District</label>
            <select defaultValue={"Select Your District"} className="select" {...register("district")}>
              <option disabled={true} >Select Your District</option>
              {
                districts.map(district => <option key={district.id} value={district?.name}>{district?.name}</option>)
              }
            </select>

            </div>

            {/* select upazila */}

            <div>
                <label for="district">Upazila</label>
            <select defaultValue={"Select Your Upazila"} className="select" {...register("upazila")}>
              <option disabled={true} >Select Your Upazila</option>
              {
                upazilas.map(upazila => <option key={upazila.id} value={upazila?.name}>{upazila?.name}</option>)
              }
            </select>

           </div>

            {/* password field */}
            <div className="relative">
              <label className="label">Password</label>
              <input
                type={show ? "text" : "password"}
                className="input"
                placeholder="Password"
                {...register("password", {
                  required: "password is required",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{6,}$/,
                    message: "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, and be at least 6 characters long.",
                  },
                })}
              />

              <span
                onClick={() => setShow(!show)}
                className="absolute top-6 right-6 z-50"
              >
                {show ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
              </span>

              {errors.password && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* confirm password */}

             <div className="relative">
              <label className="label">Confirm Password</label>
              <input
                type={show ? "text" : "password"}
                className="input"
                placeholder="Password"
                {...register("Confirmpassword", {required:true, pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{6,}$/,
                    message: "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, and be at least 6 characters long.",
                  }} )}
              />

              <span
                onClick={() => setShow(!show)}
                className="absolute top-6 right-6 z-50"
              >
                {show ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
              </span>

              {errors.password && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.Confirmpassword.message}
                </p>
              )}
            </div>

            <button type="submit" className="btn bg-red-500  lg:col-span-2 mt-4">
              Create Account
            </button>

          </fieldset>

            <p className="font-semibold text-center">
              Already Have An Account ?{" "}
              <Link className="text-green-600" to="/Login">
                Login
              </Link>
            </p>
        </form>
      </div>
    </div>

  );
};

export default Register;
