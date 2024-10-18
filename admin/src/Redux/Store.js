import { configureStore } from '@reduxjs/toolkit';
import { adminReducer, doctorReducer, patientReducer } from './Reducers/adminReducer';

const allReducers = {
  admin: adminReducer,
  doctor: doctorReducer,
  patient: patientReducer
}
const adminStore = configureStore({
  reducer: allReducers
})

export default adminStore;