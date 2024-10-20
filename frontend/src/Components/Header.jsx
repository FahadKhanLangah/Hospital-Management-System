import docWithoutbg from '../assets/bg.png'
import { ReactTyped } from 'react-typed'
import { Link } from 'react-router-dom'

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
              <img className='w-10 h-10 rounded-full object-cover' src="https://images.herzindagi.info/image/2021/Mar/gynae-checks-main.jpg" alt="" />
              <img className='w-10 h-10 rounded-full object-cover -ml-2' src="https://enshrinehealthcaresystems.com/img/products/112b7f29-a719-4e72-8d57-987556260be6.jpg" alt="" />
            </div>
            <p className=' font-medium text-sm text-white'>
              {/* Browse our Trusted Doctors, <br />schedule your appointed hassle-free */}
              <ReactTyped backDelay={500} strings={data} typeSpeed={100} backSpeed={20} loop></ReactTyped>
            </p>
          </div>
          <Link to={'/doctors'}><button>Book Appointment</button></Link>
        </div>
      </div>
      <div className='sm:min-w-[50%] w-1/3 relative'>
        <img className='absolute h-2/3 bottom-0 sm:h-full' src={docWithoutbg} alt="" />
      </div>
    </div>
  )
}

export default Header