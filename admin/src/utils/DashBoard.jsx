import { Link } from 'react-router-dom'
import doctorPng from '../assets/bg.png'
import patientPng from '../assets/R.png'
import pa from '../assets/Appoint.png'
import { useSelector } from 'react-redux'
const DashBoard = () => {
  const { doctors } = useSelector(v => v.doctor);
  const { patients } = useSelector(v => v.patient);
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex flex-wrap gap-4 justify-between w-[70%] my-4'>
        <Link to={'/doctor-list'}>
          <div className='duration-200 h-64 bg-blue-500 hover:scale-110 cursor-pointer w-64 rounded-full m-2 gap-2 flex flex-col overflow-hidden justify-center items-center'>
            <h1 className='text-center'>Doctors</h1>
            <img className='max-w-44 ' src={doctorPng} alt="Doctor Png" />
            <h1>{doctors.length < 10 ? "0" : ""}{doctors.length}+</h1>
          </div>
        </Link>
        <Link to={'/patient-list'}>
          <div className='duration-200 h-64 gap-2 hover:scale-110 cursor-pointer bg-yellow-400 w-64 rounded-full m-2 flex flex-col overflow-hidden justify-center items-center'>
            <h1 className='text-center'>Patients</h1>
            <img className='max-w-44 max-h-32' src={pa} alt="Patient Png" />
            <h1>{patients.length < 10 ? "0" : ""}{patients.length}+</h1>
          </div>
        </Link>
        <div className='duration-200 h-64 gap-2 hover:scale-110 cursor-pointer bg-gray-400 w-64 rounded-full m-2 flex flex-col overflow-hidden justify-center items-center'>
          <h1 className='text-center text-lg mt-3'>Appointments</h1>
          <img className='max-w-44 max-h-32' src={patientPng} alt="Doctor Png" />
          <h1>10+</h1>
        </div>
      </div>
    </div>
  )
}

export default DashBoard