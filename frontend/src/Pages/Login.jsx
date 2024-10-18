import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../Redux/Actions/userAction';
import { CLEAR_ERRORS } from '../Redux/Constants/userConstant';

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loginSuccess, error } = useSelector(v => v.user);
  useEffect(() => {
    if (error) {
      toast(error);
      dispatch({ type: CLEAR_ERRORS })
    }
  }, [error, dispatch]);
  const navigate = useNavigate()
  useEffect(() => {
    if (loginSuccess) {
      navigate('/')
    }
  }, [navigate, loginSuccess]);
  const handleSubmit = () => {
    const formdata = {
      phone, password
    }
    dispatch(loginUser(formdata));
  }
  return (
    <div className='flex justify-center items-center'>
      <div className='w-[320px] sm:mt-4 mt-40 bg-slate-200 m-2 px-4 py-2 shadow-lg rounded shadow-black'>
        <div className='mt-4 flex flex-col gap-3'>
          <h1 className='text-3xl font-semibold text-center'>Login Form</h1>
          <p className='text-sm text-gray-500' >Login To Book Appointment</p>
        </div>
        <div className='flex flex-col my-2 gap-1'>
          <span className='font-semibold'>Phone</span>
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder='Registered Phone Number' className='text-sm py-1 px-3 font-semibold bg-transparent border rounded-md border-black' type="text" />
        </div>
        <div className='flex flex-col my-2 gap-1'>
          <span className='font-semibold'>Password</span>
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder='Your Password Please' className='text-sm py-1 px-3 font-semibold bg-transparent border rounded-md border-black' type="text" />
        </div>
        <div className='flex flex-col my-4'>
          <button onClick={handleSubmit} className='h-10 hover:bg-green-600'>Login Now</button>
        </div>
        <div className='flex flex-col my-5'>
          <span>Don`t have any Acount ???
            <Link to={'/create-acount'}><span className='bg-transparent cursor-pointer font-semibold text-black hover:text-red-600'> Creat Acount</span></Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login