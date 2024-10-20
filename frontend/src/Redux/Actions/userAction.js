import axios from "axios";
import { BOOK_APPOINTMENT_FAIL, BOOK_APPOINTMENT_REQUEST, BOOK_APPOINTMENT_SUCCESS, CANCEL_APPOINTMENT_FAIL, CANCEL_APPOINTMENT_REQUEST, CANCEL_APPOINTMENT_SUCCESS, CLEAR_ERRORS, CLEAR_MESSAGES, GET_LOGIN_USER_DETAIL_FAIL, GET_LOGIN_USER_DETAIL_REQUEST, GET_LOGIN_USER_DETAIL_SUCCESS, GET_MY_APPOINTMENT_FAIL, GET_MY_APPOINTMENT_REQUEST, GET_MY_APPOINTMENT_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER_FAIL, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "../Constants/userConstant";


export const loginUser = (formdata) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_USER_REQUEST,
    })
    const config = {
      header: {
        "Content-Type": "application/json"
      }
    }
    const { data } = await axios.post("/api/v1/users/login-user", formdata, config);
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response?.data?.message || error.message
    })
  }
}

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT_USER_REQUEST,
    })
    const { data } = await axios.get("/api/v1/users/logout-user");
    dispatch({
      type: LOGOUT_USER_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAIL,
      payload: error.response?.data?.message || error.message
    })
  }
}

export const getloginUserDetail = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_LOGIN_USER_DETAIL_REQUEST,
    })
    const { data } = await axios.get("/api/v1/users/loginuser-detail");
    console.log("Login User", data);
    dispatch({
      type: GET_LOGIN_USER_DETAIL_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GET_LOGIN_USER_DETAIL_FAIL,
      payload: error.response?.data?.message || error.message
    })
  }
}

export const registerUser = (formdata) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST,
    })
    const config = {
      header: {
        "Content-Type": "application/json"
      }
    }
    const { data } = await axios.post("/api/v1/users/register-user", formdata, config);
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response?.data?.message || error.message
    })
  }
}

export const updateUser = (formdata) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_USER_REQUEST,
    })
    const config = {
      header: {
        "Content-Type": "multi-part/formdata"
      }
    }
    const { data } = await axios.patch("/api/v1/users/update-user", formdata, config);
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response?.data?.message || error.message
    })
  }
}

// Appointment 

export const makeAppointment = (formdata) => async (dispatch) => {
  try {
    dispatch({
      type: BOOK_APPOINTMENT_REQUEST,
    })
    const config = {
      header: {
        "Content-Type": "application/json"
      }
    }
    const { data } = await axios.post("/api/v1/appointment/book-appointment", formdata, config);
    dispatch({
      type: BOOK_APPOINTMENT_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: BOOK_APPOINTMENT_FAIL,
      payload: error.response?.data?.message || error.message
    })
  }
}

export const cancelAppointment = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CANCEL_APPOINTMENT_REQUEST,
    })
    const { data } = await axios.patch(`/api/v1/appointment/cancel-appointment/${id}`);
    dispatch({
      type: CANCEL_APPOINTMENT_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: CANCEL_APPOINTMENT_FAIL,
      payload: error.response?.data?.message || error.message
    })
  }
}

export const getMyAppointments = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_MY_APPOINTMENT_REQUEST,
    })
    const { data } = await axios.get("/api/v1/appointment/my-appointments");
    dispatch({
      type: GET_MY_APPOINTMENT_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GET_MY_APPOINTMENT_FAIL,
      payload: error.response?.data?.message || error.message
    })
  }
}





// Clear Errors Messages etc
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearMessages = () => (dispatch) => {
  dispatch({ type: CLEAR_MESSAGES });
};