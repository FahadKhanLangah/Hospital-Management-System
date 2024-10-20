import { configureStore } from '@reduxjs/toolkit';
import { adminReducer, doctorReducer, patientReducer } from './Reducers/adminReducer';
import { appointmentReducer } from './Reducers/appointmentReducer';

const allReducers = {
  admin: adminReducer,
  doctor: doctorReducer,
  patient: patientReducer,
  appointment: appointmentReducer
}
const adminStore = configureStore({
  reducer: allReducers
})

export default adminStore;