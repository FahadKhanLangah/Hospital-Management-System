import { ADD_DOCTORS_FAIL, ADD_DOCTORS_REQUEST, ADD_DOCTORS_SUCCESS, CLEAR_ERRORS, CLEAR_MESSAGES, GET_ALL_DOCTORS_FAIL, GET_ALL_DOCTORS_REQUEST, GET_ALL_DOCTORS_SUCCESS, GET_ALL_PATIENTS_FAIL, GET_ALL_PATIENTS_REQUEST, GET_ALL_PATIENTS_SUCCESS, LOGIN_ADMIN_FAIL, LOGIN_ADMIN_REQUEST, LOGIN_ADMIN_SUCCESS, LOGOUT_ADMIN_FAIL, LOGOUT_ADMIN_REQUEST, LOGOUT_ADMIN_SUCCESS } from "../Constants/Admin.constants"
import axios from 'axios'

export const loginAdmin = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_ADMIN_REQUEST });
    const config = {
      header: {
        "Content-Type": "application/json"
      }
    }
    const { data } = await axios.post('/api/v1/admin/login-admin', formdata, config);
    dispatch({
      type: LOGIN_ADMIN_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: LOGIN_ADMIN_FAIL,
      payload: error.response?.data?.message || error.message
    })
  }
}

export const addDoctor = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: ADD_DOCTORS_REQUEST });
    const config = {
      header: {
        "Content-Type": "application/json"
      }
    }
    const { data } = await axios.post('/api/v1/admin/add-doctor', formdata, config);
    dispatch({
      type: ADD_DOCTORS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ADD_DOCTORS_FAIL,
      payload: error.response?.data?.message || error.message
    })
  }
}

export const logoutAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_ADMIN_REQUEST });
    const { data } = await axios.get('/api/v1/admin/logout-admin');
    dispatch({
      type: LOGOUT_ADMIN_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: LOGOUT_ADMIN_FAIL,
      payload: error.response?.data?.message || error.message
    })
  }
}
export const getAllDoctors = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_DOCTORS_REQUEST });
    const { data } = await axios.get('/api/v1/admin/all-doctor');
    dispatch({
      type: GET_ALL_DOCTORS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GET_ALL_DOCTORS_FAIL,
      payload: error.response?.data?.message || error.message
    })
  }
}

export const getAllPatients = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PATIENTS_REQUEST });
    const { data } = await axios.get('/api/v1/users/all-users');
    dispatch({
      type: GET_ALL_PATIENTS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GET_ALL_PATIENTS_FAIL,
      payload: error.response?.data?.message || error.message
    })
  }
}

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};


export const clearMessages = () => (dispatch) => {
  dispatch({ type: CLEAR_MESSAGES });
};