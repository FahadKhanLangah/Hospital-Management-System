import { useEffect, useState } from 'react'
import { ReactTyped } from 'react-typed';
import bg from '../assets/bg.webp'
import { useDispatch, useSelector } from 'react-redux'
import { loginAdmin } from '../Redux/Actions/adminAction';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const { loading, error, isAuth, message } = useSelector(v => v.admin);
  const navigate = useNavigate()
  useEffect(() => {
    if (loading) {
      toast("Please wait")
    }
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.dark(message)
    }
    if (isAuth) {
      navigate('/')
    }
  }, [error, loading, isAuth, navigate, message]);
  const handleLogin = () => {
    const formdata = {
      username, password
    }
    dispatch(loginAdmin(formdata));
  }
  return (
    <div className="flex justify-center items-center sm:flex-row flex-col gap-28 sm:gap-5">
      <div className='sm:w-[50%] order-2 sm:order-1 flex flex-col justify-center items-center gap-4'>
        <h1>
          <ReactTyped strings={["Welcome Again!"]} typeSpeed={180} backSpeed={20} loop />
        </h1>
        <div className="relative">
          <fieldset className="border border-gray-300 p-2 rounded">
            <legend className="text-sm px-1">UserName</legend>
            <input
              type="text"
              placeholder="Enter your UserName"
              className="border-none bg-transparent px-2 focus:outline-none min-w-72 sm:min-w-64"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </fieldset>
        </div>
        <div className="relative">
          <fieldset className="border border-gray-300 p-2 rounded">
            <legend className="text-sm px-1">Your Password</legend>
            <input
              type="password"
              placeholder="Enter Your Password"
              className="border-none bg-transparent px-2 focus:outline-none w-full min-w-72 sm:min-w-64"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
        </div>
        <div className='flex gap-2 justify-end sm:min-w-64'>
          <button className='px-3 py-1 text-white hover:underline hover:bg-transparent hover:text-black bg-orange-600 rounded'>Forget Password</button>
          <button onClick={handleLogin} className='bg-gray-300 hover:bg-blue-800 hover:text-white font-semibold px-4 py-2 text-black rounded'>Login</button>
        </div>
      </div>
      <div className='sm:w-[50%] order-1 sm:order-2'>
        <img className='sm:w-full h-[300px] rounded-bl-full sm:rounded-b-none sm:h-[600px] object-cover rounded-sm sm:rounded-tl-full' src={bg} alt="" />
      </div>
    </div>
  )
}

export default Login