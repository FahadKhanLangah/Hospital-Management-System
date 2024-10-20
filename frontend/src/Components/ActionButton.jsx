import { useEffect } from 'react'
import { cancelAppointment, clearErrors, clearMessages, getMyAppointments } from '../Redux/Actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ActionButton = (id) => {
  const dispatch = useDispatch();
  const { loading, isSuccess, message, error } = useSelector(a => a.appointment);
  useEffect(() => {
    if (loading) {
      toast.dark("Please wait")
    }
    if (isSuccess) {
      dispatch(getMyAppointments());
    } if (message) {
      toast.success(message)
    } if (error) {
      toast.error(error)
    }
    return()=>{
      dispatch(clearErrors());
      dispatch(clearMessages());
    }
  }, [error, message, isSuccess, loading,dispatch])
  const handleCancel = ({ id }) => {
    dispatch(cancelAppointment(id));
  }
  return (
    <div className="sm:w-[20%]">
      <b>Actions</b>
      <div className='flex flex-col gap-3 mt-4 sm:mt-10'>
        <button onClick={() => handleCancel(id)} className='bg-orange-500 hover:bg-blue-600'>Cancel</button>
        <button className='bg-orange-500 hover:bg-blue-600'>Pay Challan</button>
      </div>
    </div>
  )
}

export default ActionButton