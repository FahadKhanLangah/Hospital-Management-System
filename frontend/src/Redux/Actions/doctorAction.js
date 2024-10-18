import { GET_ALL_DOCTORS_FAIL, GET_ALL_DOCTORS_REQUEST, GET_ALL_DOCTORS_SUCCESS } from "../Constants/adminConstants"
import axios from 'axios';

export const getAllDoctors = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_DOCTORS_REQUEST,
    })
    const { data } = await axios.get("/api/v1/admin/all-doctor");
    dispatch({
      type: GET_ALL_DOCTORS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GET_ALL_DOCTORS_FAIL,
      payload:  error.response?.data?.message || error.message
    })
  }
}