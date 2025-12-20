import axios from 'axios';
import React, {  useEffect, useState } from 'react';
import Loading from '../../Components/Loading/Loading';

const SearchRequest = () => {
    const [upazila, setUpazila] = useState("");
  const [district, setDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading,setLoading]=useState(true)
  const [filterData,setFilterData]=useState([]);

  useEffect(() => {
    axios.get("/upazilas.json").then((res) => {
      setUpazilas(res.data.upazilas);
      setLoading(false)
    });
  }, []);

  useEffect(() => {
    axios.get("/districts.json").then((res) => {
      setDistricts(res.data.districts);
      setLoading(false)
    });
  }, []);

  const hendleSearch =(e)=>{
    e.preventDefault();
    const bloodGroup = e.target.blood.value;

    axios.get(`https://project11-server.vercel.app/search-request?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
    .then(res =>{
       setFilterData(res.data);
       setLoading(false)
       
    })
  }

  if(loading){
    return <Loading></Loading>
  }
 

    return (
        <div>


            <section className="min-h-screen bg-base-100 py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Page Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-orange-500 mb-3">
            Search Blood Donors
          </h2>
          <p className="text-base-content max-w-2xl mx-auto">
            Browse available blood donors based on blood group and location.
          </p>
        </div>

        {/* Search Filter UI (Display Only) */}
        <div className="bg-base-200 rounded-2xl shadow-lg p-8 max-w-5xl mx-auto mb-16">
          <form onSubmit={hendleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
          {/* <label>Chose Blood Group</label> */}
            <label>Chose Blood Group</label>
          <select
            name="blood"
            defaultValue="Chose blood group"
            className="select"
          >
            <option disabled={true} >Chose Blood Group</option>
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

           <div>
          {/* district field */}
          <label>Chose Blood district</label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="select"
          >
            <option disabled selected value=" ">
              Select Your district
            </option>
            {districts.map((d) => (
              <option value={d?.name} key={d.id}>
                {d?.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* upazila */}
              <div>
          <label>Chose Blood upazila</label>
          <select
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
            className="select"
          >
            <option disabled selected value=" ">
              Select Your upazila
            </option>
            {upazilas.map((u) => (
              <option value={u?.name} key={u.id}>
                {u?.name}
              </option>
            ))}
          </select>
        </div>

            <button type='submit' className="btn text-white bg-orange-400 lg:mt-6">
              Search
            </button>
          </form>
        </div>

        
        {
            filterData.length == 0 ? <h1 className='text-orange-500 text-center font-bold text-4xl'>No Request Found</h1>
  
             :<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            filterData.map(data => <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h3 className="text-xl font-bold text-orange-500">
                Blood Group: {data.blood}
              </h3>
              <p className="text-sm">Recipient Name: {data.recipientName}</p>
              <p className="text-sm">Location: {data.hospitalName}</p>
              <p className="text-sm">Requester Email: {data.requesterEmail}</p>
            </div>
          </div>)
          }

         
        

        </div>
        }

      </div>
    </section>

        </div>
    );

};

export default SearchRequest;