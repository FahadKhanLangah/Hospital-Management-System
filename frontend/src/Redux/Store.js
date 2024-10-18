import { configureStore } from '@reduxjs/toolkit'
import { doctorReducer } from './Reducers/doctorReducer';
import { updateUserReducer, userReducer } from './Reducers/userReducer';

const allReducers = {
  doctors: doctorReducer,
  user: userReducer,
  update : updateUserReducer
}
const store = configureStore({
  reducer: allReducers
})

export default store;