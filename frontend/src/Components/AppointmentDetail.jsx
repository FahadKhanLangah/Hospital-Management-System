import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, clearMessages, getMyAppointments } from '../Redux/Actions/userAction';
import ActionButton from './ActionButton';
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
  }, [dispatch, appointments]);
  // [...appointments] ensures that we should not modify the original state bcoz it creates copy
  const sortedAppointments = [...appointments].sort((a, b) => {
    if (a.cancel && !b.cancel) return 1; // A is cancelled true and b is false a is placed after b bcoz of return 1
    if (!a.cancel && b.cancel) return -1; // A is cancelled false and b is true a is placed before b bcoz of return -1

    const dateA = new Date(`2024-01-01 ${a.bookedDate?.time}`);
    const dateB = new Date(`2024-01-01 ${b.bookedDate?.time}`);

    if (a.bookedDate?.date?.dayNumber !== b.bookedDate?.date?.dayNumber) {
      return a.bookedDate?.date?.dayNumber - b.bookedDate?.date?.dayNumber;
    }
    return dateA - dateB;
  });

  return (
    <>
      {
        sortedAppointments && sortedAppointments.length > 0 &&
        sortedAppointments.map((v, i) => {
          const doctor = doctors.find(d => d._id === v.doctor);
          return (
            <div key={i} className={`${v.cancel ? 'bg-blue-100 rounded-md' : ''} flex my-5 py-2 border-b-8 sm:flex-row flex-col gap-4 flex-wrap`}>
              <div className="sm:w-[40%] p-4 border-r-2">
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
              <div className="sm:w-[35%] p-4 border-r-2">
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
              {v.cancel ?
                <div className='sm:w-[20%] text-2xl font-semibold text-center sm:pt-14 '>Your Appointment was cancelled</div> : <ActionButton id={v._id}></ActionButton>
              }
            </div>
          )
        }
        )
      }
    </>
  )
}

export default AppointmentDetail