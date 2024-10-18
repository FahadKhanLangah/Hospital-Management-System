import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header"
import { useEffect, useState } from "react"
import { addDoctor } from "../Redux/Actions/adminAction";
import { toast } from 'react-toastify';
const AddDoctor = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [degree, setDegree] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(v => v.doctor);
  useEffect(() => {
    if (loading) {
      toast.info("Adding doctor to database");
    }
    if (error) {
      toast.error(error)
    }
    if (message) {
      toast.info(message)
    }
  }, [loading, message, error])
  const handleSubmit = () => {
    const formData = {
      name, address, username, password, phone, degree, speciality, about
    }
    dispatch(addDoctor(formData));
  }
  return (
    <>
      <Header></Header>
      <div className="flex justify-center items-center flex-col relative">
        <h1 className="border-b-2 my-2">Login Details</h1>
        <div className="flex justify-center flex-wrap gap-3 sm:gap-10">
          <fieldset className="border-2 px-3 p-1 border-gray-600 min-w-72 rounded">
            <legend>Name</legend>
            <input value={name} onChange={e => setName(e.target.value)} type="text" className="focus:outline-none px-2 bg-transparent" placeholder="Doctor Name..." />
          </fieldset>
          <fieldset className="border-2 px-3 p-1 border-gray-600 rounded min-w-72">
            <legend>Username</legend>
            <input value={username} onChange={e => setUserName(e.target.value)} type="text" className="focus:outline-none px-2 w-full bg-transparent" placeholder="Username for later login.." />
          </fieldset>
          <fieldset className="border-2 px-3 p-1 border-gray-600 rounded min-w-72">
            <legend>Password</legend>
            <input value={password} onChange={e => setPassword(e.target.value)} type="text" className="focus:outline-none px-2 w-full bg-transparent" placeholder="Password for login later" />
          </fieldset>
        </div>
        <hr className="my-2" />
        <h1 className="border-b-2 my-2">Degree Details</h1>
        <div className="flex justify-center flex-wrap gap-3 sm:gap-10">
          <fieldset className="border-2 px-3 p-1 border-gray-600 min-w-72 rounded">
            <legend>Degree</legend>
            <input value={degree} onChange={e => setDegree(e.target.value)} type="text" className="focus:outline-none px-2 bg-transparent" placeholder="Doctor degree..." />
          </fieldset>
          <fieldset className="border-2 px-3 p-1 border-gray-600 rounded min-w-72">
            <legend>Speciality</legend>
            {/* <input value={speciality} onChange={e => setSpeciality(e.target.value)} type="text" className="focus:outline-none px-2 w-full" placeholder="Doctor speciality..." /> */}
            <select name="speciality" id="" onChange={e => setSpeciality(e.target.value)} className="focus:outline-none px-2 w-2/3 sm:w-full bg-transparent">
              <option value="None">None</option>
              <option value="Gyneacologist">Gyneacologist</option>
              <option value="Surgeon">Surgeon</option>
              <option value="Dentist">Dentist</option>
              <option value="Orthopaedic">Orthopaedic</option>
              <option value="Physician">Physician</option>
            </select>
          </fieldset>
          <fieldset className="border-2 px-3 p-1 border-gray-600 rounded min-w-72">
            <legend>Phone No.</legend>
            <input value={phone} onChange={e => setPhone(e.target.value)} type="text" className="focus:outline-none px-2 w-full bg-transparent" placeholder="Doctor phone number" />
          </fieldset>
        </div>
        <hr className="my-2" />
        <h1 className="border-b-2 my-2">Personal Info</h1>
        <div className="flex justify-center flex-wrap gap-3 sm:gap-10">
          <fieldset className="border-2 px-3 p-1 border-gray-600 min-w-72 rounded">
            <legend>Doctor Address</legend>
            <input value={address} onChange={e => setAddress(e.target.value)} type="text" className="focus:outline-none px-2 w-full bg-transparent" placeholder="Doctor living address..." />
          </fieldset>
          <fieldset className="border-2 px-3 p-1 border-gray-600 rounded min-w-72">
            <legend>About</legend>
            <input value={about} onChange={e => setAbout(e.target.value)} type="text" className="focus:outline-none px-2 w-full bg-transparent" placeholder="about doctor..." />
          </fieldset>
        </div>
        <hr className="my-5" />
        <div className="w-full sm:w-[60%] relative">
          <button onClick={handleSubmit} className="absolute right-10 px-4 py-2 bg-orange-500 font-semibold rounded-sm text-lg hover:text-white">Register</button>
        </div>
      </div>
    </>
  )
}

export default AddDoctor