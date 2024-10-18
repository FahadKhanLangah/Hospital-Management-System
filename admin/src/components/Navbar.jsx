import { Link } from 'react-router-dom'
import imgPng from '../assets/test.png'
import { useDispatch, useSelector } from 'react-redux';
import { logoutAdmin } from '../Redux/Actions/adminAction';
const Navbar = () => {
  const { admin } = useSelector(v => v.admin);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAdmin());
  }
  return (
    <div>
      <div className='flex cursor-pointer flex-col justify-center items-center my-2'>
        <img className='w-32 h-32 rounded-full' src={imgPng} alt="" />
        <h1>{admin?.name}</h1>
        <button onClick={handleLogout} className='bg-gray-200 hover:bg-blue-800 hover:text-white font-semibold px-4 py-2 text-black rounded'>Logout</button>
      </div>
      <hr />
      <div className='list-none px-1 flex flex-col gap-2 mt-2 text-lg sm:text-2xl'>
        <Link to={'/doctor-list'}><li className='bg-blue-800 duration-300 p-1 shadow-lg hover:ml-6 cursor-pointer hover:text-orange-600'>Doctors</li></Link>
        <Link to={'/patient-list'}><li className='bg-blue-800 duration-300 p-1 shadow-lg hover:ml-6 cursor-pointer hover:text-orange-600'>Patients</li></Link>
        <li className='bg-blue-800 duration-300 p-1 shadow-lg hover:ml-6 cursor-pointer hover:text-orange-600'>Appointments</li>
        <li className='bg-blue-800 duration-300 p-1 shadow-lg hover:ml-6 cursor-pointer hover:text-orange-600'>Reviews</li>
        <li className='bg-blue-800 duration-300 p-1 shadow-lg hover:ml-6 cursor-pointer hover:text-orange-600'>Update</li>
      </div>
    </div>
  )
}

export default Navbar