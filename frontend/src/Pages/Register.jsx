import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../Redux/Actions/userAction';
import { toast } from 'react-toastify';

const Register = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const dispatch = useDispatch();
  const { message, error, success } = useSelector(v => v.update);
  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      navigate("/")
    }
  }, [navigate, success])
  useEffect(() => {
    if (message) {
      toast(message);
    }
    if (error) {
      toast.error(error)
    }
  }, [error, message, dispatch])
  const handleSubmit = () => {
    const formdata = {
      phone: phone,
      name: name,
      password,
      dob,
      gender,
      address
    }
    dispatch(registerUser(formdata));
  }
  return (
    <div className='flex justify-center items-center'>
      <div className='w-[320px] bg-slate-200 m-2 px-4 py-2 shadow-lg rounded shadow-black'>
        <div className='mt-4 flex flex-col gap-3'>
          <h1 className='text-3xl font-semibold text-center'>Registration Form</h1>
          <p className='text-sm text-gray-500' >Register To explore Appointment world</p>
        </div>
        <div className='flex flex-col my-2 gap-1'>
          <span className='font-semibold'>Name</span>
          <input value={name} onChange={e => setName(e.target.value)} placeholder='Your Good Name' className='text-sm py-1 px-3 font-semibold bg-transparent border rounded-md border-black' type="text" />
        </div>
        <div className='flex flex-col my-2 gap-1'>
          <span className='font-semibold'>Phone</span>
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder='Phone Number for later Login' className='text-sm py-1 px-3 font-semibold bg-transparent border rounded-md border-black' type="text" />
        </div>
        <div className='flex flex-col my-2 gap-1'>
          <span className='font-semibold'>Password</span>
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder='Your Password Please' className='text-sm py-1 px-3 font-semibold bg-transparent border rounded-md border-black' type="text" />
        </div>
        <div className='flex my-2 justify-around'>
          <div className='flex text-sm gap-2'>
            <h1 className='font-semibold'>DOB</h1>
            <input value={dob} onChange={e => setDob(e.target.value)} className='bg-transparent w-20 border-black border rounded font-semibold' type="date" />
          </div>
          <div className='flex gap-3'>
            <span className='font-semibold flex gap-1 justify-center'>
              <h6>Male</h6>
              <input name='gender' value="male" onChange={e => setGender(e.target.value)} type="radio" />
            </span>
            <span className='font-semibold flex gap-1'>
              <h6>Female</h6>
              <input name='gender' value="female" onChange={e => setGender(e.target.value)} type="radio" />
            </span>
          </div>
        </div>
        <div className='flex flex-col my-2 gap-1'>
          <span className='font-semibold'>Address</span>
          <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder='Your complete address' className='text-sm py-1 px-3 font-semibold bg-transparent border rounded-md border-black' type="text" />
        </div>
        <div className='flex flex-col my-4'>
          <button onClick={handleSubmit} className='h-10 hover:bg-green-600'>Create Acount</button>
        </div>
        <div className='flex flex-col my-2'>
          <span>Already have any Acount ???
            <Link to={'/login'}><span className='bg-transparent cursor-pointer font-semibold text-black hover:text-red-600'> Login</span></Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Register