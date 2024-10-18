import docImg from '../assets/doctor.jfif'
import docWithoutbg from '../assets/bg.png'
import { ReactTyped } from 'react-typed'

const Header = () => {
  const data = [
    "Browse our Trusted Doctors, <br />schedule your appointed hassle-free"
  ]
  return (
    <div className="bg-blue-600 text-white flex justify-between h-[230px] sm:h-[320px]">
      <div className='flex justify-center items-center w-2/3 sm:w-[50%]'>
        <div className='flex flex-col gap-2 p-3 sm:p-4'>
          <h1 className='sm:text-4xl text-2xl font-semibold'>
            Book Appointment <br /> With Trusted Doctors
          </h1>
          <div className='flex sm:flex-row flex-col sm:gap-4'>
            <div className='flex relative'>
              <img className='w-10 h-10 rounded-full object-cover' src={docImg} alt="" />
              <img className='w-10 h-10 rounded-full object-cover -ml-2' src={docImg} alt="" />
            </div>
            <p className='text-black font-medium text-sm text-white'>
              {/* Browse our Trusted Doctors, <br />schedule your appointed hassle-free */}
              <ReactTyped backDelay={500} strings={data} typeSpeed={100} backSpeed={20} loop></ReactTyped>
            </p>
          </div>
          <button>Book Appointment</button>
        </div>
      </div>
      <div className='sm:min-w-[50%] w-1/3 relative'>
        <img className='absolute h-2/3 bottom-0 sm:h-full' src={docWithoutbg} alt="" />
      </div>
    </div>
  )
}

export default Header