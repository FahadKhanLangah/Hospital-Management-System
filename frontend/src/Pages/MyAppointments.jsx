import AppointmentDetail from "../Components/AppointmentDetail"


const MyAppointments = () => {

  return (
    <div>
      <h1 className='text-3xl font-bold'>MyAppointments</h1>
      <hr className="h-2 my-3 bg-gray-400" />
      <AppointmentDetail></AppointmentDetail>
    </div>
  )
}

export default MyAppointments