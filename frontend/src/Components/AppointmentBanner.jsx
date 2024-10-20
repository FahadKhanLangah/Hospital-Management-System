import { useState } from 'react';
import girl from '../assets/appoint.png'
import { Link } from 'react-router-dom'
import { ReactTyped } from 'react-typed';
import { useSelector } from 'react-redux'
const AppointmentBanner = () => {
  const { atoken } = useSelector(v => v.user);
  const data = [
    "Book Appointment, With 100+ Available Doctors"
  ]
  const [key, setKey] = useState(0);
  const handleComplete = () => {
    setTimeout(() => {
      setKey(key + 1);
    }, 5000);
  }

  return (
    <div className="bg-blue-600 overflow-hidden max-h-52 sm:max-h-72 rounded-md flex my-4 justify-center items-center">
      <div className="sm:w-[60%] w-[70%] text-center px-10 text-white">
        <h1 className="sm:text-4xl text-xl font-medium">
          {/* Book Appointment, <br /> With 100+ Available Doctors */}
          <ReactTyped backDelay={500} key={key} strings={data} typeSpeed={80} backSpeed={20} onComplete={handleComplete} loop={false}></ReactTyped>
        </h1>
        <>{
          !atoken ?
            <Link to={'/login'}><button className="bg-white w-full px-5 text-black mt-4">Create Acount</button></Link>
            :
            <Link to={'/doctors'}><button className="bg-white w-full px-5 text-black mt-4">Book Appointment</button></Link>
        }
        </>
      </div>
      <div className='sm:w-[40%] w-[30%] flex justify-end'>
        <img className='sm:h-[380px] h-[300px] w-full mt-16 sm:mt-12 object-fill sm:px-10' src={girl} alt="" />
      </div>
    </div>
  )
}

export default AppointmentBanner