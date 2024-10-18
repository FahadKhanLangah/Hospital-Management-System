import { useEffect } from 'react'
import gynea from '../assets/gynea.png'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDoctors } from '../Redux/Actions/doctorAction';
import { toast } from 'react-toastify';
const TopDoctors = () => {
  const dispatch = useDispatch();
  const { doctors, error } = useSelector(v => v.doctors);
  useEffect(() => {
    if (error) {
      toast(error)
    }
  }, [error]);
  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch])
  return (
    <div className="my-3">
      <h1 className='text-center text-3xl my-3 font-medium'>Top Doctors to Book</h1>
      <div className='grid grid-cols-2 mt-6 sm:grid-cols-5 place-items-center justify-items-center gap-4'>
        {doctors && doctors.map((v, i) =>
          <div key={i} className='w-36 relative h-56 bg-gray-300 hover:-translate-y-2 flex justify-center items-center flex-col border cursor-pointer rounded'>
            <img className='w-32 rounded absolute top-2' src={v.avatar?.url || gynea} alt="" />
            <div className='p-1 mt-36 flex flex-col'>
              <div className='flex justify-start items-center gap-3 text-green-600 font-medium'>
                <p className='w-2 h-2 bg-green-600 rounded-full'></p><p>Available</p>
              </div>
              <h1 className='font-bold text-md'>{v.name}</h1>
              <p className='text-gray-600'>{v.speciality}</p>
            </div>
          </div>
        )}
      </div>
      <button className='my-4 w-full'>More Doctors</button>
    </div>
  )
}

export default TopDoctors