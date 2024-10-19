import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, clearMessages, getMyAppointments } from '../Redux/Actions/userAction';
const AppointmentDetail = () => {
  const dispatch = useDispatch();
  const { loading, appointments, error } = useSelector(a => a.myAppointment);
  const { doctors } = useSelector(v => v.doctors);
  useEffect(() => {
    if (loading) {
      toast.info("Please wait data is being fetched")
    }
    if (error) {
      toast.error(error);
    }
    return () => {
      dispatch(clearErrors());
      dispatch(clearMessages());
    }
  }, [error, loading, dispatch]);
  useEffect(() => {
    if (!appointments) {
      dispatch(getMyAppointments());
    }
  }, [dispatch, appointments])
  return (
    <>
      {
        appointments && appointments.length > 0 &&
        appointments.map((v, i) => {
          const doctor = doctors.find(d => d._id === v.doctor);
          return (
            <div key={i} className="flex my-5 py-2 border-b-8 sm:flex-row flex-col gap-4 flex-wrap">
              <div className="sm:w-[40%] border-r-2">
                <b>Doctor Detail</b>
                <div className='flex gap-6'>
                  <img className='w-40 rounded my-2' src={doctor?.avatar.url} alt="" />
                  <div className='flex flex-col justify-center'>
                    <strong className='text-2xl text-gray-500'>{doctor?.name}</strong>
                    <b>{doctor?.speciality}</b>
                    <b>+{doctor?.phone.length < 11 ? "92 - " : ""}{doctor?.phone} </b>
                  </div>
                </div>
              </div>
              <div className="sm:w-[35%] border-r-2">
                <b className='text-3xl'>Booked Detail</b>
                <div className='sm:mt-4'>
                  <strong>{v.bookedDate?.date?.dayNumber} {v.bookedDate?.date?.weekday}, {v.bookedDate?.time}</strong>
                  <br />
                  <span>At HM Hospital</span>
                </div>
                <hr className='my-2' />
                <div>
                  <b>Payment Info</b>
                  <p className={`font-medium ${v.payment === 'pending' ? 'text-red-600' : 'text-green-500'}`}>{v.payment}</p>
                </div>
              </div>
              <div className="sm:w-[20%]">
                <b>Actions</b>
                <div className='flex flex-col gap-3 mt-4 sm:mt-10'>
                  <button className='bg-orange-500 hover:bg-blue-600'>Cancel</button>
                  <button className='bg-orange-500 hover:bg-blue-600'>Pay Challan</button>
                </div>
              </div>
            </div>
          )
        }
        )
      }
    </>
  )
}

export default AppointmentDetail