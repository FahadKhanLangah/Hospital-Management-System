import { configureStore } from '@reduxjs/toolkit'
import { doctorReducer } from './Reducers/doctorReducer';
import { appointmentReducer, myAppointmentReducer, updateUserReducer, userReducer } from './Reducers/userReducer';

const allReducers = {
  doctors: doctorReducer,
  user: userReducer,
  update: updateUserReducer,
  appointment: appointmentReducer,
  myAppointment: myAppointmentReducer
}
const store = configureStore({
  reducer: allReducers
})

export default store;