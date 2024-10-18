import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Doctor = () => {
  const { doctors, error } = useSelector(v => v.doctors);
  useEffect(() => {
    if (error) {
      toast(error)
    }
  }, [error]);
  return (
    <div>
      <h1 className="text-2xl font-semibold ">
        All Doctors
      </h1>
      <div className='grid grid-cols-2 my-4 sm:grid-cols-5 place-items-center justify-items-center gap-4'>
        {doctors && doctors.map((v, i) =>
          <div key={i} className='w-36 relative h-56 bg-gray-300 hover:-translate-y-2 flex justify-center items-center flex-col border cursor-pointer rounded'>
            <img className='w-32 rounded absolute top-2' src={v.avatar?.url} alt="" />
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
    </div>
  )
}

export default Doctor